package com.example.demo.repositories;

import com.example.demo.constraints.Rol;
import com.example.demo.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface PersonRepository extends JpaRepository<Person, UUID> {

    Optional<Person> findFirstByPasswordAndName(String password, String name);
    Person findFirstByNameAndPassword(String name,String password);
    Person findAllById(UUID id);
    Person findByName(String s);
    List<Person> findAllByRol(Rol rol);
    void deleteById(UUID personID);



}
