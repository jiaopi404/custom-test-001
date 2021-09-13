package com.jiaopi404.sb_demo_001.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/")
public class HelloController {
    @PostMapping(path = "/saveFile")
    public String saveFile(HttpServletRequest httpServletRequest) {
        try {
            System.out.println("hello");
            return "{'error':'no' }";
        } catch (Exception e) {
            return "error";
        }
    }
}
