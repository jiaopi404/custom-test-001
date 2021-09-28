package com.jiaopi404.sb_demo_001;

import com.jiaopi404.sb_demo_001.pojo.Stu;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration // 标识此类为 配置类，会被容器扫描到
// SpringBoot 会扫描 启动类当前包，和子包，所有加了 注解的
/**
 * @Bean
 * @Service
 * @Controller
 * @Component
 * @Repository
 * 以上都可使用，根据场景 或 业务，进行选择；
 */
public class SpringBootConfig {
    @Bean
    public Stu stu () {
        return new Stu("jiaopi", 33);
    }
}
