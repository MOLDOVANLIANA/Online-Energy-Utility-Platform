package com.example.demo.dtos;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;
@Getter
@Setter
public class ConsumptionDTO {
    private UUID idDevice;
    private LocalDate time;
}
