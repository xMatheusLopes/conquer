package com.matheus.backend.resource;

import com.matheus.backend.domain.Person;
import com.matheus.backend.service.PersonService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value="/people")
public class PersonResource {

    @Autowired
    private PersonService _personService;

    @GetMapping()
    public ResponseEntity<Iterable<Person>> list() {
        Iterable<Person> list = _personService.list();
        return ResponseEntity.ok().body(list);
    }

    @GetMapping("students")
    public ResponseEntity<Iterable<Person>> students() {
        Iterable<Person> list = _personService.students();
        return ResponseEntity.ok().body(list);
    }

    @PostMapping()
    public ResponseEntity<Person> create(@RequestBody Person person) {
        return ResponseEntity.ok().body(_personService.create(person));
    }
}