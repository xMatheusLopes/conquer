package com.matheus.backend.repository;

import com.matheus.backend.domain.Class;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClassRepository extends CrudRepository<Class, Integer> {

}