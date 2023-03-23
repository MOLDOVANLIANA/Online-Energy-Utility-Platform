package com.example.demo.controller;

import com.example.demo.dtos.AssignDTO;
import com.example.demo.dtos.DeviceDTO;
import com.example.demo.model.Device;
import com.example.demo.model.Person;
import com.example.demo.services.ConsumptionService;
import com.example.demo.services.DeviceService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping("/device")
public class DeviceController {
    private final DeviceService deviceService;
    private final ConsumptionService consumptionService;

    public DeviceController(DeviceService deviceService, ConsumptionService consumptionService) {
        this.deviceService = deviceService;
        this.consumptionService = consumptionService;
    }
    @GetMapping (value = "/{id}")
    public ResponseEntity<List<Device>> getUsersDevices(@PathVariable("id")UUID id)
    {
        return new ResponseEntity<>(deviceService.findUsersDevices(id), HttpStatus.OK);
    }
    @GetMapping("/all")
    public ResponseEntity<List<Device>> getAllDevices()
    {
        return new ResponseEntity<>(deviceService.findAllDevices(), HttpStatus.OK);
    }
    @PostMapping("/asign")
   public ResponseEntity<Device> asignDeviceToUser(@RequestBody AssignDTO assignDTO)
    {
             return new ResponseEntity<>(deviceService.asignDeviceToUser(assignDTO), HttpStatus.OK);
    }

    @PostMapping("/insertDevice")
    public ResponseEntity<Device> insertDevice(@RequestBody DeviceDTO deviceDTO)
    {
        return new ResponseEntity<>(deviceService.insertDevice(deviceDTO), HttpStatus.OK);
    }
    @PostMapping(value = "/{id}")
    public ResponseEntity<UUID> deleteDevice(@PathVariable("id") UUID id)
    {
        deviceService.deleteDevice(id);
        return new ResponseEntity<>(id, HttpStatus.OK);
    }
    @PostMapping("/update")
    public ResponseEntity<?> updateDevice(@RequestBody Device device)
    {
        deviceService.updateDevice(device);
        return new ResponseEntity<>( HttpStatus.OK);
    }
    @GetMapping("/unassigned")
    public ResponseEntity<List<Device>> getAllUnassignedDevices()
    {
        return new ResponseEntity<>(deviceService.getUnassignedDevices(), HttpStatus.OK);
    }





}
