package com.example.demo.users;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@Service
public class UserServices {

    private final UsersRepo usersRepo;
    private final ParamRepo paramRepo;
    private static final Logger logger = LogManager.getLogger(UserServices.class);

    @Autowired
    public UserServices(UsersRepo usersRepo,ParamRepo paramRepo) {
        this.usersRepo = usersRepo;
        this.paramRepo = paramRepo;
    }

    public Page<User> getAllUsers(Pageable pageable) {
        logger.info("The whole users are get");
        return usersRepo.findAll(pageable);
    }
    
    public User createUser(User user) {
        User savedUser = usersRepo.save(user);
        logger.info("User with id {} was created", savedUser.getId());
        return savedUser;
    }

    public void deleteUser(Long id) {
        logger.info("User with id {} was deleted", id);
        usersRepo.deleteById(id);
    }
    public User getUser(Long id) {
        logger.info("User with id {} was retrieved", id);
        return usersRepo.findById(id).orElse(null);
    }
    public User editUser(User user){
        User editedUser = usersRepo.save(user);
        logger.info("User {} was edited", editedUser.getId());
        return editedUser;
    }
    public Param addParam(Long user_id,Param parameter){
        logger.info("Adding parameter {} for user {}", parameter.getParamName(), user_id);
        User user = usersRepo.findById(user_id)
        .orElseThrow(() -> new RuntimeException("User not found"));
        parameter.setUser(user);
        return paramRepo.save(parameter);
    }
    public List<Param> getParam(Long id) {
        logger.info("Retrieving parameters for user {}", id);
        return paramRepo.findAllByUserId(id);
    }
    public Param updateParam(Long user_id,Param parameter){
        // User user = usersRepo.findById(user_id)
        // .orElseThrow(() -> new RuntimeException("User not found"));
        logger.info("Updating parameter {} for user {}", parameter.getParamName(), user_id);
    Param existingParam = paramRepo.findByUserIdAndParamName(user_id, parameter.getParamName());

    if (existingParam == null) {
        throw new RuntimeException("Parameter not found for update");
           
    }

        existingParam.setParamValue(parameter.getParamValue());

    return paramRepo.save(existingParam);
    }
}