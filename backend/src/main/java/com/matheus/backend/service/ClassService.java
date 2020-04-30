package com.matheus.backend.service;

import com.matheus.backend.domain.Class;
import com.matheus.backend.repository.ClassRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClassService {

    @Autowired
    private ClassRepository _classRepository;

    public Iterable<Class> list() {
        return _classRepository.findAll();
    }

    public Class create(Class clas) {
        return _classRepository.save(clas);
    }
}