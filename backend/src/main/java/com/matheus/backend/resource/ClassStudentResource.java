package com.matheus.backend.resource;

import com.matheus.backend.domain.ClassStudent;
import com.matheus.backend.service.ClassStudentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value="/classes-students")
public class ClassStudentResource {

    @Autowired
    private ClassStudentService _classStudentService;

    @PostMapping()
    public ResponseEntity<?> create(@RequestBody ClassStudent classStudent) throws Exception {
        try {
            return ResponseEntity.ok().body(_classStudentService.create(classStudent));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}