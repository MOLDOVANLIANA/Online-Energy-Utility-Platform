package com.example.demo.repositories;

import com.example.demo.model.Consumption;
import com.example.demo.model.Device;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

public interface ConsumptionRepository  extends JpaRepository<Consumption, UUID> {

   List<Consumption> findConsumptionByDeviceAndDate(Device device, LocalDate date);
   List<Consumption> findConsumptionByDeviceAndDateAndTimeBetween(Device device, LocalDate date, LocalTime min, LocalTime max);
}
