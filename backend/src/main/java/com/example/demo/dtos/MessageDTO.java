package com.example.demo.dtos;


import com.example.demo.constraints.Status;
import lombok.Data;

@Data
public class MessageDTO {
    private String sender;
    private String receiver;
    private String message;
    private Status status;
}
