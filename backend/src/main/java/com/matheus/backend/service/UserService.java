package com.matheus.backend.service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import javax.xml.bind.DatatypeConverter;

import com.matheus.backend.domain.User;
import com.matheus.backend.models.LoginModel;
import com.matheus.backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository _userRepository;

    public User login(final LoginModel login) throws Exception {
        MessageDigest md;
        try {
            md = MessageDigest.getInstance("MD5");
            md.update(login.getPassword().getBytes());
            byte[] digest = md.digest();
            String password = DatatypeConverter.printHexBinary(digest).toUpperCase();
            
            return _userRepository.findByUsernameAndPassword(login.getUsername(), password);
        } catch (final NoSuchAlgorithmException e) {
            throw new Exception(e.getMessage());
        }
    }
}