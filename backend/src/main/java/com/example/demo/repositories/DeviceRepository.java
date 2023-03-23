package com.example.demo.repositories;

import com.example.demo.model.Device;
import com.example.demo.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

    public interface DeviceRepository extends JpaRepository<Device, UUID> {
        Device findFirstByAddressAndDescriptionAndMaxConsumtion(String address, String description, int MaxConsumption);
        List<Device> findByUser(Person person);
        Device findDeviceByUser(Person person);
        Device findAllById(UUID id);



    }
