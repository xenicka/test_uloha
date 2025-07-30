package com.example.demo.users;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

import jakarta.annotation.PostConstruct;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {


    @PostConstruct
   public void init() {
        System.out.println(">>>> WebSocketConfig LOADED");
    }
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic"); // брокер сообщений
        config.setApplicationDestinationPrefixes("/app"); // префикс для отправки сообщений клиентом
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
                System.out.println(">>>> Registering /ws endpoint...");

registry.addEndpoint("/ws")
        .setAllowedOriginPatterns("http://localhost:*")
        .withSockJS();
    }
}