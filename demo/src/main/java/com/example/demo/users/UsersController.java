package com.example.demo.users;

import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;


@RestController
@RequestMapping(path= "/api/users")

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
    public Page<User> getAllUsers(Pageable pageable) {
        if (!pageable.getSort().isSorted()) {
            pageable = PageRequest.of(
                pageable.getPageNumber(),
                pageable.getPageSize(),
                Sort.by("id").ascending()
            );
        }
        return userServices.getAllUsers(pageable);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userServices.deleteUser(id);
    }
    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userServices.getUser(id);
    }
    @PutMapping("/{id}")
    public User editUser(@PathVariable Long id,@RequestBody User user){
        user.setId(id);
        return userServices.editUser(user);
    }
    @PutMapping("/{id}/parametres")
    public Param addParameter(@PathVariable Long id,@RequestBody Param parameter){
        return userServices.addParam(id,parameter);
    }
      @GetMapping("/{id}/parametres")
    public List<Param> getParams(@PathVariable Long id) {
        return userServices.getParam(id);
    }
  @PutMapping("/{id}/parametres/updateparameters")
    public Param updateParameters(@PathVariable Long id,@RequestBody Param parameter){
        return userServices.updateParam(id,parameter);
    }
}
