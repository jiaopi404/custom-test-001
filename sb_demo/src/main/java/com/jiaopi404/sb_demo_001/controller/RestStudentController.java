package com.jiaopi404.sb_demo_001.controller;

import com.jiaopi404.sb_demo_001.pojo.Student;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.websocket.server.PathParam;
import java.util.Map;

/**
 * 测试 rest 风格的 controller
 * get
 * post
 * put
 * delete
 *
 * 参数注解:
 * 1. RequestParam
 * 2. PathVariable
 * 3. RequestBody
 * 4. RequestHeader 加密信息
 * 5. CookieValue Cookie中保存的值
 */
@RestController
@RequestMapping("/student")
@Slf4j
public class RestStudentController {

    private Student student;

    public RestStudentController() {
        Student student = new Student();
        student.setName("jiaopi");
        student.setCode("2131202010");
        student.setAge(22);
        this.student = student;
    }

    /**
     * 测试 PathVariable PathParam
     * PathParam: 获取 url 中的参数；
     *      如 name 参数，如果 url中 name=jiaopi，该注解可以省略；
     * @param id [Integer]
     * @return Object
     */
    @GetMapping("{stuId}/get")
    public Object getStudent (@PathVariable("stuId") String studentId, @PathParam("id") Integer id, String name, Integer age) {
        return this.student.toString() + ";" + studentId + ";" + id + ";" + name;
    }

    /**
     * 测试 RequestBody
     * @param student JSON
     * @return Student
     */
    @PostMapping("/add")
    public Object addStudent (@RequestBody Student student) {
        return this.student;
    }

    /**
     * 测试 RequestHeader
     *      value: 绑定的 header
     *      如果用 Map 接收，则获取所有header
     * @param Authorization string
     * @return Object
     */
    @PutMapping("/update")
    public Object updateStudent (@RequestHeader("Authorization") String Authorization, HttpServletRequest request) {
        log.info("Authorization: " + Authorization);
        log.info("request.getHeader: " + request.getHeader("Authorization"));
        return "update student";
    }

    @DeleteMapping("/del")
    public Object delStudent (@RequestHeader Map<String, String> map) {
        return map.toString();
    }
}
