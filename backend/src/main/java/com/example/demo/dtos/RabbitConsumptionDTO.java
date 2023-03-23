package com.example.demo.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;


@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class RabbitConsumptionDTO {
    @JsonProperty("measurement_value")
    private String measurement_value;
    @JsonProperty("device_id")
    private String device_id;
    @JsonProperty("timestamp")
    private String timestamp;



}
