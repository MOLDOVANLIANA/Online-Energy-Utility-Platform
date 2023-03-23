package com.example.demo.dtos;

import lombok.Getter;
import lombok.Setter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;

import java.util.UUID;

@Getter
@Setter
public class AssignDTO {
    private UUID idUser;
    private UUID idDevice;



}
