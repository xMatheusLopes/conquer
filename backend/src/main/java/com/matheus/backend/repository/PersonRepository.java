package com.matheus.backend.repository;

import com.matheus.backend.domain.Person;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonRepository extends CrudRepository<Person, Integer> {

	Iterable<Person> findAllByProfileId(int i);

}