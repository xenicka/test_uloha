package com.example.demo.users;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class RootController {

    @GetMapping("/sk")
    public String redirectSk() {
        return "redirect:/sk/";
    }

    @GetMapping("/en")
    public String redirectEn() {
        return "redirect:/en/";
    }
}
