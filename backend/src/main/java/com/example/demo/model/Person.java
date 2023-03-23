package com.example.demo.model;

import com.example.demo.constraints.Rol;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class Person {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Type(type = "uuid-binary")
    private UUID id;
    @Column
    private String name;
    @Column
    private String password;

    private Rol rol;
    //@OneToMany(fetch=FetchType.EAGER)
   // private List<Device> devices;

    public Person(String name, String password, Rol rol) {
        this.name = name;
        this.password = password;
        this.rol = rol;
    }

    public Person(String name, String password) {
        this.name = name;
        this.password = password;
    }
}
