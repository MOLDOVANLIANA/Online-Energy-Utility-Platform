package com.example.demo.initDB;

import com.example.demo.constraints.Rol;
import com.example.demo.model.Consumption;
import com.example.demo.model.Device;
import com.example.demo.model.Person;
import com.example.demo.repositories.ConsumptionRepository;
import com.example.demo.repositories.DeviceRepository;
import com.example.demo.repositories.PersonRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class Initialization {

    private final int numberOfDevices = 5;
    private final int numberOfUsers= 2;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private List<String> address= new ArrayList<String>(
            Arrays.asList("Migdalului 20", "Avram Iancu 208J", "Lujerului 108A", "Lusca 163", "Florilor 20"));
    private List<String> description= new ArrayList<String>(
            Arrays.asList("Frigider", "Aspirator", "Router", "TV", "Centrala Termica"));
    private List<Integer> maxConsumtion= new ArrayList<>(Arrays.asList(20, 405,100, 400, 2000));
    private List<String> names= new ArrayList<String>(
            Arrays.asList("liana123", "razvan123", "admin", "TV"));
    private List<String> passwords= List.of("liana1234", "razvan123", "admin");
    private int[] consum={2,2,2,2,2,2,2,4,8,2,3,2,2,2,2,9,8,7,6,7,10,11,7,2};

    private final DeviceRepository deviceRepository;
    private final PersonRepository personRepository;
    private final ConsumptionRepository consumptionRepository;

    public Initialization(BCryptPasswordEncoder bCryptPasswordEncoder, DeviceRepository deviceRepository, PersonRepository personRepository, ConsumptionRepository consumptionRepository) {
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.deviceRepository = deviceRepository;
        this.personRepository = personRepository;
        this.consumptionRepository = consumptionRepository;
    }
    public List<Person> initPeople(List<String> names,List<String> passwords){
        List<Person> usersList = new ArrayList<>();

        for (int i = 0; i < numberOfUsers; i++)
        {
//            List<Device> devices1 =new ArrayList<>();
//            devices1.add(allDevices.get(i));
//            devices1.add(allDevices.get(i+numberOfUsers/2));
            usersList.add(Person.builder().name(names.get(i))
                    .password(bCryptPasswordEncoder.encode(passwords.get(i)))
                    .rol(Rol.USER)

                    .build());
        }
        usersList.add(Person.builder().name(names.get(2)).password(bCryptPasswordEncoder.encode(passwords.get(2))).rol(Rol.ADMIN).build());
        return usersList;
    }
    public List<Device> initDevices(List<String> address,List<String> description, List<Integer> maxConsumtion) {
        List<Device> deviceList = new ArrayList<>();

        for (int i = 0; i < numberOfDevices; i++) {
            deviceList.add(Device.builder().
                    address(address.get(i)).
                    description(description.get(i)).
                    maxConsumtion(maxConsumtion.get(i))

                    .build());

        }
        return deviceList;
    }


    public List<Consumption> initConsumption(Device device, int days)
    {
        List<Consumption> consumptionsList = new ArrayList<>();
        for (int i = 0; i < 24; i++)
        {
            consumptionsList.add(Consumption.builder().date(LocalDate.now().minusDays(days)).time(LocalTime.of(i,0)).energyConsumed(consum[i]).device(device).build());
        }
        return consumptionsList;
    }
    @Bean
    public void saveData()
    {

        List<Person> allUsers=initPeople(names, passwords);
        personRepository.saveAll(allUsers); //2
       // System.out.println(allUsers.get(0).getName());
        int devicesPerUser = numberOfDevices / numberOfUsers;
        int surplusForLast = numberOfDevices % numberOfUsers;

        List<Device> allDevices=new ArrayList<>();
        allDevices=initDevices(address, description,maxConsumtion);
        for(int i=0;i<numberOfDevices;i++)
        {
            int r=i/numberOfUsers;
            if(r>numberOfUsers-1)
            {
                break;
            }
          else
            {
                allDevices.get(i).setUser(allUsers.get(r));
            }
        }
        //System.out.println(allDevices.get(0).getUser().getName());
        deviceRepository.saveAll(allDevices);

        for(int j=1;j<10;j++) {
            for (int i = 0; i < numberOfDevices; i++) {
                consumptionRepository.saveAll(initConsumption(allDevices.get(i),j));
            }
        }
    }

}
