package com.example.demo.services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.demo.constraints.Rol;
import com.example.demo.dtos.LoginDTO;
import com.example.demo.dtos.MessageDTO;
import com.example.demo.model.Device;
import com.example.demo.model.Person;
import com.example.demo.repositories.DeviceRepository;
import com.example.demo.repositories.PersonRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@Service
public class PersonService implements UserDetailsService {
    private final PersonRepository personRepository;
    private final DeviceRepository deviceRepository;
    private final SimpMessagingTemplate template;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public PersonService(PersonRepository personRepository, DeviceRepository deviceRepository, SimpMessagingTemplate template, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.personRepository = personRepository;
        this.deviceRepository = deviceRepository;
        this.template = template;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Person person = personRepository.findByName(username);
        if(person == null) {
            throw new UsernameNotFoundException("User not found");
        }
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority( person.getRol().name()));
        return new org.springframework.security.core.userdetails.User(person.getName(), person.getPassword(),authorities);
    }
    public Optional<Person> authentification(LoginDTO personCredentials) {
        //System.out.println(personRepository.findFirstByPasswordAndName(personCredentials.getPassword(), personCredentials.getName()).get().getName());
        return personRepository.findFirstByPasswordAndName(personCredentials.getPassword(), personCredentials.getName());

    }
    public Person findByName(String s)
    {
        return personRepository.findByName(s);
    }
    public Person insert(LoginDTO loginDTO) {
        // LocalDateTime time= LocalDateTime.now();
        // System.out.println(time);
        Person person = new Person(loginDTO.getName(), bCryptPasswordEncoder.encode(loginDTO.getPassword()), loginDTO.getRol());
        personRepository.save(person);
        return person;

    }

    public Person changeRole(LoginDTO loginDTO) {
        Person person = personRepository.findFirstByNameAndPassword(loginDTO.getName(), loginDTO.getPassword());
        person.setRol(Rol.ADMIN);
        personRepository.save(person);
        return person;
    }

    public void deletePerson(UUID clientId) {
        Person person=personRepository.findById(clientId).get();
        System.out.println(person.getName());
       List<Device> device= deviceRepository.findByUser(person);
       for(int i=0;i<device.size();i++)
       {
           device.get(i).setUser(null);
       }
       deviceRepository.saveAll(device);
       personRepository.deleteById(clientId);

    }

    public void updatePerson(Person person)
    {
        personRepository.save(person);
    }

    public Person findById(UUID id) {
        return personRepository.findById(id).get();
    }
    public List<Person> findAllUsers()
    {
        return personRepository.findAll();
    }

    public List<Person> findAll()
    {
        return personRepository.findAllByRol(Rol.USER);
    }

    public MessageDTO redirectMessage(MessageDTO messageDTO)
    {
        System.out.println(messageDTO.getMessage());
        template.convertAndSendToUser(messageDTO.getReceiver(), "/receiver", messageDTO);
        return messageDTO;
    }


}
