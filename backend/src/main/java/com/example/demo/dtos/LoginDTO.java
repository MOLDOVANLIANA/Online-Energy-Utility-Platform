package com.example.demo.dtos;

import com.example.demo.constraints.Rol;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginDTO {
    private String name;
    private String password;
    private Rol rol;
}
