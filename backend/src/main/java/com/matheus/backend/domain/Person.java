package com.matheus.backend.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.TableGenerator;

@Entity
@Table(name = "people")
public class Person {

    @TableGenerator(name = "People_Gen", initialValue = 1)
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "People_Gen")
    private int id;

    private String name;

    @OneToOne
    @JoinColumn(name = "profileID", insertable = false, updatable = false)
    private Profile profile;

    private int profileID;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getProfileID() {
        return profileID;
    }

    public void setProfileID(int profileID) {
        this.profileID = profileID;
    }

    public String getName() {
        return name;
    }       
    
    public void setName(String name) {
        this.name = name;
    }

    public Profile getProfile() {
        return profile;
    }

    public void setProfile(Profile profile) {
        this.profile = profile;
    }
}