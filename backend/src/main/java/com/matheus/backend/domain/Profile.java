package com.matheus.backend.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "profiles")
public class Profile {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private int id;

    private String name;

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }        
}