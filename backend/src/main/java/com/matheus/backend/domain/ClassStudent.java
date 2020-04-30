package com.matheus.backend.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "classes_students")
public class ClassStudent {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @OneToOne
    @JoinColumn(name = "studentID", insertable = false, updatable = false)
    private Person student;
    private int studentID;

    @OneToOne
    @JoinColumn(name = "classID", insertable = false, updatable = false)
    private Class clas;
    private int classID;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getStudentID() {
        return studentID;
    }

    public void setStudentID(int studentID) {
        this.studentID = studentID;
    }

    public int getClassID() {
        return classID;
    }

    public void setClassID(int classID) {
        this.classID = classID;
    }

    public Person getStudent() {
        return student;
    }

    public void setStudent(Person student) {
        this.student = student;
    }

    public Class getClas() {
        return clas;
    }

    public void setClas(Class clas) {
        this.clas = clas;
    }
}