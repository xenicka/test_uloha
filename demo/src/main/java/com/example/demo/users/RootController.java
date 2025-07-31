package com.example.demo.users;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class RootController {

    @GetMapping("/")
    public String redirectToDefault() {
        return "redirect:/sk/";
    }

    @GetMapping({"/sk", "/sk/", "/en-US", "/en-US/"})
    public String indexRedirects() {
        return "forward:/sk/index.html"; 
    }
        @GetMapping("/sk/user-table")
    public String skUserTable() {
        return "forward:/sk/index.html";
    }

    @GetMapping("/en-US/user-table")
    public String enUserTable() {
        return "forward:/en-US/index.html";
    }
    @GetMapping("/en-US/user-detail")
    public String enUserDetail() {
        return "forward:/en-US/index.html";
    }
         @GetMapping("/sk/user-detail")
    public String skUserDetail() {
        return "forward:/sk/index.html";
    }

  
}