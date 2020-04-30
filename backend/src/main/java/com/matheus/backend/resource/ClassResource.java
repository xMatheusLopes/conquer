package com.matheus.backend.resource;

import com.matheus.backend.service.ClassService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value="/classes")
public class ClassResource {

    @Autowired
    private ClassService _classService;

    @GetMapping()
    public ResponseEntity<Iterable<com.matheus.backend.domain.Class>> list() {
        Iterable<com.matheus.backend.domain.Class> list = _classService.list();
        return ResponseEntity.ok().body(list);
    }

    @PostMapping()
    public ResponseEntity<com.matheus.backend.domain.Class> create(@RequestBody com.matheus.backend.domain.Class clas) {
        return ResponseEntity.ok().body(_classService.create(clas));
    }
}