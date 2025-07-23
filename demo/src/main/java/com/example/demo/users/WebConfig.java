package com.example.demo.users;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins("http://localhost:4200")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
            }
            @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/sk/").setViewName("forward:/sk/index.html");
        registry.addViewController("/en-US/").setViewName("forward:/en-US/index.html");
        registry.addViewController("/").setViewName("redirect:/sk/");
    }   
        };
    }}

    
    

