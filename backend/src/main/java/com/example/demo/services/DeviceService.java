package com.example.demo.services;

import com.example.demo.dtos.AssignDTO;
import com.example.demo.dtos.DeviceDTO;
import com.example.demo.dtos.LoginDTO;
import com.example.demo.model.Device;
import com.example.demo.model.Person;
import com.example.demo.repositories.ConsumptionRepository;
import com.example.demo.repositories.DeviceRepository;
import com.example.demo.repositories.PersonRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class DeviceService {
    private final DeviceRepository deviceRepository;
    private final PersonRepository personRepository;
    private final ConsumptionRepository consumptionRepository;
    private final PersonService personService;

    public DeviceService(DeviceRepository deviceRepository, PersonRepository personRepository, ConsumptionRepository consumptionRepository, PersonService personService) {
        this.deviceRepository = deviceRepository;
        this.personRepository = personRepository;
        this.consumptionRepository = consumptionRepository;
        this.personService = personService;
    }

    public List<Device> findUsersDevices(UUID clientId) {
        System.out.println(clientId);
        return deviceRepository.findByUser(personService.findById(clientId));

    }

    public List<Device> findAllDevices() {
        return deviceRepository.findAll();

    }

    public Device asignDeviceToUser(AssignDTO assignDTO) {
        Person person = personRepository.findAllById(assignDTO.getIdUser());
        System.out.println(person.getName());

        Device device = deviceRepository.findAllById(assignDTO.getIdDevice());
        System.out.println(device.getDescription());
        device.setUser(person);
        deviceRepository.save(device);
        return device;
    }

    public Device insertDevice(DeviceDTO deviceDTO) {
        Device device = new Device(deviceDTO.getAddress(), deviceDTO.getDescription(), deviceDTO.getMaxConsumtion());
        deviceRepository.save(device);
        return device;
    }

    public void deleteDevice(UUID id) {

        deviceRepository.deleteById(id);

    }

    public void updateDevice(Device device) {
        deviceRepository.save(device);
    }

    public List<Device> getUnassignedDevices() {

        List<Device> device = deviceRepository.findAll();

        List<Device> unassigned = new ArrayList<>();

        for (int i = 0; i < device.size(); i++) {
            if (device.get(i).getUser() == null) {
                unassigned.add(device.get(i));
            }
        }
        return unassigned;
    }
}
