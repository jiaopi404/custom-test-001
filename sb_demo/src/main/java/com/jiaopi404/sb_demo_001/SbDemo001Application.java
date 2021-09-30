package com.jiaopi404.sb_demo_001;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import tk.mybatis.spring.annotation.MapperScan;

@SpringBootApplication
@MapperScan(basePackages = "com.jiaopi404.sb_demo_001.mapper")
public class SbDemo001Application {

    public static void main(String[] args) {
        SpringApplication.run(SbDemo001Application.class, args);
        System.out.println("=============================== [启动成功] =================================");
    }

}
