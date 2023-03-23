package com.example.demo.controller;

import com.example.demo.dtos.ConsumptionDTO;
import com.example.demo.dtos.RabbitConsumptionDTO;
import com.example.demo.model.Consumption;
import com.example.demo.services.ConsumptionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/cons")
public class ConsumptionController {

    private final ConsumptionService consumptionService;

    public ConsumptionController(ConsumptionService consumptionService) {
        this.consumptionService = consumptionService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Consumption>> getAllDevices()
    {
        return new ResponseEntity<>(consumptionService.findAllConsumptions(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<List<Consumption>> getAllConsumptionForADay(@RequestBody ConsumptionDTO consumptionDTO)
    {
        return new ResponseEntity<>(consumptionService.findAllDeviceConsumptions(consumptionDTO), HttpStatus.OK);
    }


}
