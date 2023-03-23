package com.example.demo.controller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.demo.constraints.Rol;
import com.example.demo.dtos.AssignDTO;
import com.example.demo.dtos.DeviceDTO;
import com.example.demo.dtos.LoginDTO;
import com.example.demo.dtos.MessageDTO;
import com.example.demo.model.Device;
import com.example.demo.model.Person;
import com.example.demo.services.PersonService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.util.*;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@CrossOrigin
@RequestMapping("/person")
public class PersonController {

    private final PersonService personService;

    @Autowired
    public PersonController(PersonService personService) {
        this.personService = personService;
    }
    @GetMapping("/token/refresh")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String authorizationHeader = request.getHeader(AUTHORIZATION);

        if(authorizationHeader != null && authorizationHeader.startsWith("Bearer ")){
            try{
                String refreshToken = authorizationHeader.substring("Bearer ".length());
                Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());

                JWTVerifier verifier = JWT.require(algorithm).build();
                DecodedJWT decodedJWT = verifier.verify(refreshToken);

                String username = decodedJWT.getSubject();
                Person user = personService.findByName(username);


                String accessToken = JWT.create()
                        .withSubject(user.getName())
                        .withExpiresAt(new Date(System.currentTimeMillis() + 10 * 60 * 1000))
                        .withIssuer(request.getRequestURL().toString())
                        .withClaim("roles", user.getRol().name())
                        .sign(algorithm);

                Map<String, String> tokens = new HashMap<>();
                tokens.put("access_token", accessToken);
                tokens.put("refresh_token", refreshToken);

                response.setContentType(APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), tokens);
            }catch(Exception exception){
                response.setHeader("error", exception.getMessage());
                response.setStatus(FORBIDDEN.value());

                Map<String, String> error = new HashMap<>();
                error.put("error_message", exception.getMessage());

                response.setContentType(APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), error);
            }
        }
        else{
            throw new RuntimeException("Refreh token is missing");
        }
    }
   // @PostMapping("/login")
    public ResponseEntity<Person> login(@RequestBody LoginDTO loginDTO)
    {

        if(personService.authentification(loginDTO).isPresent())
        {
            return new ResponseEntity<>(personService.authentification(loginDTO).get(),HttpStatus.OK);
        }
        else
        {
            return new ResponseEntity<>(new Person("",""),  HttpStatus.OK);
        }

    }
    @PostMapping()
    public ResponseEntity<Person> register(@Valid @RequestBody LoginDTO loginDTO)
    {

        return new ResponseEntity<>(personService.insert(loginDTO), HttpStatus.CREATED);
    }
    @PatchMapping()
    public ResponseEntity<Person> changeRole(@RequestBody LoginDTO loginDTO)
    {
        System.out.println(loginDTO.getName());
        return new ResponseEntity<>(personService.changeRole(loginDTO), HttpStatus.OK);
    }
    @PostMapping(value = "/{id}")
    public ResponseEntity<UUID> deletePerson(@PathVariable("id") UUID personId)
    {
        personService.deletePerson(personId);
        return new ResponseEntity<>(personId, HttpStatus.OK);
    }

    @GetMapping("/allUsers")
    public ResponseEntity<List<Person>> getAllUsers()
    {
        return new ResponseEntity<>(personService.findAllUsers(), HttpStatus.OK);
    }

    @PostMapping("/update")
    public ResponseEntity<?> updatePerson(@RequestBody Person person)
    {
        personService.updatePerson(person);
        return new ResponseEntity<>( HttpStatus.OK);
    }
    @GetMapping("/all")
    public ResponseEntity<List<Person>> getAll()
    {
        return new ResponseEntity<>(personService.findAll(), HttpStatus.OK);
    }

    @PostMapping("/redirect")
    public ResponseEntity<MessageDTO> redirect(@RequestBody MessageDTO messageDTO)
    {
        return new ResponseEntity<>(personService.redirectMessage(messageDTO), HttpStatus.OK);
    }



}
