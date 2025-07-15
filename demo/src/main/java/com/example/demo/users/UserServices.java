package com.example.demo.users;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class UserServices {

    private final UsersRepo usersRepo;
    
    @Autowired
    public UserServices(UsersRepo usersRepo) {
        this.usersRepo = usersRepo;
    }

    public List<User> getAllUsers() {
            List<User> users = usersRepo.findAll();
                System.out.println("Fetched users from DB: " + users);

        return users;
    }
    
    public User createUser(User user) {
        
        return usersRepo.save(user);
    }
  
}