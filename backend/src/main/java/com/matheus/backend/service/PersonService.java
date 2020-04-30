package com.matheus.backend.service;

import com.matheus.backend.domain.Person;
import com.matheus.backend.repository.PersonRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PersonService {

    @Autowired
    private PersonRepository _personRepository;

    public Iterable<Person> list() {
        return _personRepository.findAll();
    }

    public Iterable<Person> students() {
        return _personRepository.findAllByProfileId(2);
    }

    public Person create(Person person) {
        return _personRepository.save(person);
    }
}