package com.jiaopi404.sb_demo_001.controller;

import com.alibaba.druid.support.json.JSONUtils;
import com.jiaopi404.sb_demo_001.pojo.Stu;
import com.jiaopi404.sb_demo_001.pojo.Student;
import com.jiaopi404.sb_demo_001.pojo.SysConfig;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@RestController // 加上之后 返回 JSON, 区别于 @Controller
@RequestMapping("/")
@Slf4j // lombok 提供的日志功能，可以配置日志文件
public class HelloController {
    @Autowired // 控制反转；将 创建 的权利，从 控制层 放到了 容器当中；DI;IOC
    private Stu stu;

    @Autowired
    private SysConfig sysConfig;

    /**
     * 获取自定义配置，@Value 注解；
     */
    @Value("${wechat-config.app-id}")
    private String wechatAppId;
    @Value("${wechat-config.app-secret}")
    private String wechatAppSecret;
    @Value("${wechat-config:port}")
    private String wechatAppPort;

    /**
     * save file test controller
     */
    @PostMapping(path = "/saveFile")
    public String saveFile(HttpServletRequest httpServletRequest) {
        try {
            System.out.println("hello");
            return "{'error':'no' }";
        } catch (Exception e) {
            return "error";
        }
    }

    /**
     * get stu content
     */
    @GetMapping(path = "/get-stu")
    public String getStu() {
        try {
            return "{\"data\": " + stu.getName() + "}";
        } catch (Exception e) {
            e.printStackTrace();
            return "Error";
        }
    }

    /**
     * get stu object
     */
    @GetMapping("/get-stu-obj")
    public Object getStuObj () {
        return stu;
    }

    /**
     * get sys config
     */
    @GetMapping("/get-sys-config")
    public Object getSysConfig () {
        return sysConfig;
    }

    /**
     * 获取 yml 自定义配置
     */
    @GetMapping("/get-yml-wechat-config")
    public Object getYmlWechatConfig () {
        List<String> list = new ArrayList<>();
        list.add(wechatAppId);
        list.add(wechatAppSecret);
        list.add(wechatAppPort); // TODO: 结果是 字符串的 port ???
        return list;
    }

//    /**
//     * 并不能起效果
//     * @return
//     */
//    @GetMapping("/")
//    public String toIndex () {
//        return "redirect:index.html";
//    }

    @GetMapping("/get-student")
    public Object getStudent () {
        Student student = new Student("sd", "sdf", 11);
        Student student1 = new Student();
        student1.setName("stu2");
        student1.setCode("stu1");
        student1.setAge(111);
        List<Student> studentList = new ArrayList<>();
        studentList.add(student);
        studentList.add(student1);
        /**
         * 总共四种类型
         * log.info
         * log.debug
         * log.warn
         * log.error
         */
        log.warn("打印 student: " + student1.toString());
        return studentList;
    }
}
