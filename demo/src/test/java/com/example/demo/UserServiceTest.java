package com.example.demo;

import static org.junit.jupiter.api.Assertions.assertEquals;
 
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.mockito.Mockito.*;
import java.util.*;
import com.example.demo.users.Param;
import com.example.demo.users.User;
import com.example.demo.users.UserServices;
@ExtendWith(MockitoExtension.class)

public class UserServiceTest {

    @Mock
    private com.example.demo.users.UsersRepo userRepo;
    
    @Mock
    private com.example.demo.users.ParamRepo paramRepo;

    @InjectMocks
    private UserServices userService;


    @Test
    void createUserTest(){

        User user = new User("Lera", "lera@gmail.com", "user");
        when(userRepo.save(user)).thenReturn(user);

        User result = userService.createUser(user);

        assertEquals(user, result);

    }

    @Test
    void getParamTest(){
        Long id = 4L;
        User user = new User("Lera", "lera@gmail.com", "user");
        user.setId(id);

        Param parameter1 = new Param("First parameter", "123");
        Param parameter2 = new Param("Second parameter", "456");

        parameter1.setUser(user);
        parameter2.setUser(user);

        List<Param> expectedParam = List.of(parameter1,parameter2);

        when(paramRepo.findAllByUserId(id)).thenReturn(expectedParam);

        List<Param> result = userService.getParam(id);

        assertEquals(expectedParam, result);

    }
    @Test
    void updateParamTest(){
    User user = new User("Lera", "lera@gmail.com", "user");
    Long id = 6L;

    user.setId(id);

    Param expectedParam = new Param("First parameter", "123");
    expectedParam.setUser(user);

    when(paramRepo.findByUserIdAndParamName(id,expectedParam.getParamName())).thenReturn(expectedParam);
    when(paramRepo.save(expectedParam)).thenReturn(expectedParam);

    Param result = userService.updateParam(id, expectedParam);

    assertEquals(expectedParam, result);
    }



 
    
   }
