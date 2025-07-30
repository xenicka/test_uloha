package com.example.demo.users;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class EventController {

    private final SimpMessagingTemplate messagingTemplate;

    public EventController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

     public void notifyEvent(Long userId, String eventType) {
        String message = "user_" + eventType + ":" + userId;
        messagingTemplate.convertAndSend("/topic/users", message);
    }

}
