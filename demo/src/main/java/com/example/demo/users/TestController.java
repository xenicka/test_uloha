package com.example.demo.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class TestController {
     @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @GetMapping("/send")
    public String sendMessage() {
        messagingTemplate.convertAndSend("/topic/users", "Test message from server");
        return "Message sent";
    }

}
