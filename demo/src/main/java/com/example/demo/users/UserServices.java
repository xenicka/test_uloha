package com.example.demo.users;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@Service
public class UserServices {

    private final UsersRepo usersRepo;
    private final EventController eventController;
    private final ParamRepo paramRepo;
    private static final Logger logger = LogManager.getLogger(UserServices.class);

    @Autowired
    public UserServices(UsersRepo usersRepo,ParamRepo paramRepo,EventController eventController) {
        this.usersRepo = usersRepo;
        this.paramRepo = paramRepo;
        this.eventController = eventController;
    }
// GET ALL USERS
    public Page<User> getAllUsers(Pageable pageable) {
        logger.info("The whole users are get");
        return usersRepo.findAll(pageable);
    }
// CREATE USER
    @Transactional
    public User createUser(User user) {
        User savedUser = usersRepo.save(user);
        logger.info("User with id {} was created", savedUser.getId());
        eventController.notifyEvent(savedUser.getId(), "user_created");
        return savedUser;
    }
// DELETE USER
    @Transactional
    public void deleteUser(Long id) {
         if (!usersRepo.existsById(id)) {
        throw new RuntimeException("User not found");
    }
        logger.info("User with id {} was deleted", id);
        usersRepo.deleteById(id);
        eventController.notifyEvent( id, "user_deleted");

    }
// GET USER
    public User getUser(Long id) {
        logger.info("User with id {} was retrieved", id);
        return usersRepo.findById(id).orElse(null);
    }

// EDIT USER
    @Transactional
    public User editUser(User user){
        User existingUser = usersRepo.findById(user.getId())
            .orElseThrow(() -> new RuntimeException("User not found"));
        existingUser.setEmail(user.getEmail());
        existingUser.setName(user.getName());
        existingUser.setIsAdmin(user.getIsAdmin());
        User editedUser = usersRepo.save(existingUser);  
        logger.info("User {} was edited", editedUser.getId());
        eventController.notifyEvent( editedUser.getId(), "user_edited");

        return editedUser;
}

// CREATE PARAM
    @Transactional
    public Param addParam(Long user_id,Param parameter){
        logger.info("Adding parameter {} for user {}", parameter.getParamName(), user_id);
        User user = usersRepo.findById(user_id)
        .orElseThrow(() -> new RuntimeException("User not found"));
        parameter.setUser(user);
        eventController.notifyEvent( user_id, "param_created");

        return paramRepo.save(parameter);
    }

// GET PARAM
    public List<Param> getParam(Long id) {
        logger.info("Retrieving parameters for user {}", id);
        return paramRepo.findAllByUserId(id);
    }

// EDIT PARAM
    @Transactional
    public Param updateParam(Long user_id,Param parameter){
        
        logger.info("Updating parameter {} for user {}", parameter.getParamName(), user_id);
    Param existingParam = paramRepo.findByUserIdAndParamName(user_id, parameter.getParamName());

    if (existingParam == null) {
        throw new RuntimeException("Parameter not found for update");
           
    }
        eventController.notifyEvent(user_id, "parameter_edited");
        existingParam.setParamValue(parameter.getParamValue());

    return paramRepo.save(existingParam);
    }
}