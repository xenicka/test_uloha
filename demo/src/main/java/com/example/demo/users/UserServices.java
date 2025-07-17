package com.example.demo.users;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


@Service
public class UserServices {

    private final UsersRepo usersRepo;
    
    @Autowired
    public UserServices(UsersRepo usersRepo) {
        this.usersRepo = usersRepo;
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

}