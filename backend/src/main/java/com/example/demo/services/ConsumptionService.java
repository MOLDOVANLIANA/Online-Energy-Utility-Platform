package com.example.demo.services;

import com.example.demo.dtos.ConsumptionDTO;
import com.example.demo.dtos.RabbitConsumptionDTO;
import com.example.demo.model.Consumption;
import com.example.demo.model.Device;
import com.example.demo.repositories.ConsumptionRepository;
import com.example.demo.repositories.DeviceRepository;
import net.minidev.json.JSONObject;
import net.minidev.json.parser.JSONParser;
import net.minidev.json.parser.ParseException;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

@Service

public class ConsumptionService {
    private final ConsumptionRepository consumptionRepository;
    private final DeviceRepository deviceRepository;
    private final SimpMessagingTemplate template;
    private final static String QUEUE_NAME = "sensor";
    public ConsumptionService(ConsumptionRepository consumptionRepository, DeviceRepository deviceRepository, SimpMessagingTemplate template) {
        this.consumptionRepository = consumptionRepository;
        this.deviceRepository = deviceRepository;
        this.template = template;
    }

    public List<Consumption> findAllConsumptions() {
        return consumptionRepository.findAll();
    }

    public List<Consumption> findAllDeviceConsumptions(ConsumptionDTO consumptionDTO)
    {
         Device device=deviceRepository.findAllById(consumptionDTO.getIdDevice());
        return consumptionRepository.findConsumptionByDeviceAndDate(device, consumptionDTO.getTime());
    }

    //@RabbitListener(queues = "sensor")
    public void listener(String input) throws ParseException {
        JSONParser parser = new JSONParser();
        JSONObject json = (JSONObject) parser.parse(input);

        RabbitConsumptionDTO rabbitConsumption= new RabbitConsumptionDTO();
        rabbitConsumption.setMeasurement_value((String) json.get("measurement_value"));
        rabbitConsumption.setTimestamp((String) json.get("timestamp"));
        rabbitConsumption.setDevice_id((String) json.get("device_id"));

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        LocalDateTime dateTime = LocalDateTime.parse(rabbitConsumption.getTimestamp(), formatter);
        LocalDate date = dateTime.toLocalDate();
        LocalTime time = dateTime.toLocalTime();

        Device device=deviceRepository.findAllById(UUID.fromString(rabbitConsumption.getDevice_id()));
        if(device==null)
        {
            return;
        }
        Consumption consumption = Consumption.builder()
                .date(date)
                .time(time)
                .energyConsumed(Double.valueOf(rabbitConsumption.getMeasurement_value()))
                .device(device).build();
        if(insert_ok(consumption))
        {
            consumptionRepository.save(consumption);
            System.out.println(consumption);
        }
        else
        {
            System.out.println("********NU SE POATE INSERA**********");
            template.convertAndSendToUser(consumption.getDevice().getUser().getName(), "/user", "********NU SE POATE INSERA**********" ); // /topic/username/user
        }

    }
    private boolean insert_ok(Consumption consumption)
    {
        LocalTime min = LocalTime.of(consumption.getTime().getHour(), 0,0);
        LocalTime max = LocalTime.of(consumption.getTime().getHour(), 59,59);
        List<Consumption> allCons = consumptionRepository
                .findConsumptionByDeviceAndDateAndTimeBetween
                                (consumption.getDevice(),
                                consumption.getDate(),
                                min,
                                max);
        double sum = 0;
        for(Consumption cons : allCons)
        {
            sum += cons.getEnergyConsumed();
        }
        return !(sum + consumption.getEnergyConsumed() > consumption.getDevice().getMaxConsumtion());
    }
}
