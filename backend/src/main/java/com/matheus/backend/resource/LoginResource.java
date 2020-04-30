package com.matheus.backend.resource;

import com.matheus.backend.domain.User;
import com.matheus.backend.models.LoginModel;
import com.matheus.backend.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value="/login")
public class LoginResource {

    @Autowired
    private UserService _userService;

    @PostMapping()
    public ResponseEntity<User> create(@RequestBody LoginModel login) throws Exception {
        User user = _userService.login(login);
        return ResponseEntity.ok().body(user);
    }
}