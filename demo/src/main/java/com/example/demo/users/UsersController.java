package com.example.demo.users;

import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;


@RestController
@RequestMapping(path= "/api/users")
@CrossOrigin(origins = "http://localhost:4200")

public class UsersController {

    private final UserServices userServices;

    @Autowired
    public UsersController(UserServices userServices) {
        this.userServices = userServices;
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userServices.createUser(user);
    }
    @GetMapping
    public List<User> getAllUsers() {
        return userServices.getAllUsers();
    }

}
