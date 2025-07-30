package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
@SpringBootApplication(scanBasePackages = {"com.example.demo", "com.example.demo.users"})
public class UserManagementBackendApplication {

	private static final Logger logger = LogManager.getLogger(UserManagementBackendApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(UserManagementBackendApplication.class, args);
		logger.info("UserManagementBackendApplication started successfully.");
	}

	

}
