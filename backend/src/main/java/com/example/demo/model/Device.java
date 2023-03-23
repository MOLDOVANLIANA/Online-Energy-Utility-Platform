package com.example.demo.model;

import lombok.*;
import org.apache.catalina.User;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.OnDelete;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Device {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Type(type = "uuid-binary")
    private UUID id;
    private String address;
    private String description;
    private Integer maxConsumtion;

    @ManyToOne()

    private Person user;

    public Device(String address, String description, Integer maxConsumtion) {
        this.address = address;
        this.description = description;
        this.maxConsumtion = maxConsumtion;
    }
}
