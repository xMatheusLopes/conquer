package com.matheus.backend.service;

import com.matheus.backend.domain.Profile;
import com.matheus.backend.repository.ProfileRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProfileService {

    @Autowired
    private ProfileRepository _profileRepository;

    public Iterable<Profile> list() {
        return _profileRepository.findAll();
    }
}