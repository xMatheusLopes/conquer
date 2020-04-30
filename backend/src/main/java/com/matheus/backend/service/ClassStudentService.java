package com.matheus.backend.service;

import com.matheus.backend.domain.ClassStudent;
import com.matheus.backend.repository.ClassStudentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClassStudentService {

    @Autowired
    private ClassStudentRepository _classStudentRepository;

    public ClassStudent create(ClassStudent classStudent) throws Exception {
        int countAlreadyExists = _classStudentRepository.countClassesStudents(classStudent.getClassID(), classStudent.getStudentID());
        if (countAlreadyExists > 0) {
            throw new Exception("Student already subscribed in this class");
        }

        int studentsClass = _classStudentRepository.countByClas(classStudent.getClassID());
        if (studentsClass >= 5) {
            throw new Exception("Limit of students already achieved");
        }
        return _classStudentRepository.save(classStudent);
    }
}