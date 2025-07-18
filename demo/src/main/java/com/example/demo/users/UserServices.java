package com.example.demo.users;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


@Service
public class UserServices {

    private final UsersRepo usersRepo;
    private final ParamRepo paramRepo;
    
    @Autowired
    public UserServices(UsersRepo usersRepo,ParamRepo paramRepo) {
        this.usersRepo = usersRepo;
        this.paramRepo = paramRepo;
    }

    public Page<User> getAllUsers(Pageable pageable) {
        return usersRepo.findAll(pageable);
    }
    
    public User createUser(User user) {
        
        return usersRepo.save(user);
    }

    public void deleteUser(Long id) {
        usersRepo.deleteById(id);
    }
    public User getUser(Long id) {
        return usersRepo.findById(id).orElse(null);
    }
    public User editUser(User user){
        return usersRepo.save(user);
    }
    public Param addParam(Long user_id,Param parameter){
        User user = usersRepo.findById(user_id)
        .orElseThrow(() -> new RuntimeException("User not found"));

        parameter.setUser(user);
        return paramRepo.save(parameter);
    }
    public List<Param> getParam(Long id) {
        return paramRepo.findAllByUserId(id);
    }

}