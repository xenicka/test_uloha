package com.example.demo.users;

import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@RestController
@RequestMapping(path= "/api/users")

public class UsersController {

    private final  UserServices userServices;
    
    @Autowired
    public UsersController(UserServices userServices) {
        this.userServices = userServices;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userServices.getAllUsers();
    }
}
