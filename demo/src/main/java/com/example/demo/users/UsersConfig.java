package com.example.demo.users;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration

public class UsersConfig {

    @Bean
    CommandLineRunner commandLineRunner(UsersRepo usersRepo){
        return args -> {
           User doe = new User ("John Doe", "john.doe@example.com",true,123L,+12313131L, "2023-01-01", "2023-12-31");   
           User smith =new User("Jane Smith", "jane.smith@example.com",false,456L,+12313132L, "2023-01-01", "2023-12-31");
                usersRepo.saveAll(List.of(doe,smith));
  };
        }

}
