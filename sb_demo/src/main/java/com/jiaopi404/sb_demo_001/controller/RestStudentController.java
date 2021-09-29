package com.jiaopi404.sb_demo_001.controller;

import com.jiaopi404.sb_demo_001.pojo.Student;
import com.jiaopi404.sb_demo_001.utils.ResultV0;
import com.jiaopi404.sb_demo_001.utils.UUIDGetter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.websocket.server.PathParam;
import java.io.File;
import java.io.IOException;
import java.util.Map;

/**
 * 包含以下内容：
 * 1. 不同 rest 风格的 controller: get post put delete
 * 2. 参数注解
 *      RequestParam
 *      PathVariable
 *      RequestBody
 *      RequestHeader
 *      CookieValue
 *    获取Header内容通常 HttpServletRequest req, req.getHeader("xxx")
 * 3. 返回统一的请求体 ResultV0
 * 4. 上传文件 MultipartFile file; file.transferTo(); new File(String path)
 *      4.1 获取文件名后缀
 *      4.2 生成 UUID
 *
 * ****************************************************************************************************************
 *
 * 测试 rest 风格的 controller
 * get
 * post
 * put
 * delete
 * <p>
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

    private final Student student;

    /**
     * Instantiates a new Rest student controller.
     */
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
     * 如 name 参数，如果 url中 name=jiaopi，该注解可以省略；
     *
     * @param studentId the student id
     * @param id        [Integer]
     * @param name      the name
     * @param age       the age
     * @return Object student
     */
    @GetMapping("{stuId}/get")
    public Object getStudent (@PathVariable("stuId") String studentId, @PathParam("id") Integer id, String name, Integer age) {
        return this.student.toString() + ";" + studentId + ";" + id + ";" + name;
    }

    /**
     * 测试 RequestBody
     *
     * @param student JSON
     * @return Student object
     */
    @PostMapping("/add")
    public Object addStudent (@RequestBody Student student) {
        return this.student;
    }

    /**
     * 测试 RequestHeader, CookieValue
     * value: 绑定的 header
     * 如果用 Map 接收，则获取所有header
     * 一般header 值使用 HttpServletRequest 接收, request.getHeader("")
     *
     * @param Authorization string
     * @param request       the request
     * @param someCookie    the some cookie
     * @return Object object
     */
    @PutMapping("/update")
    public Object updateStudent (@RequestHeader("Authorization") String Authorization,
                                 HttpServletRequest request,
                                 @CookieValue("someCookie") String someCookie) {
        log.info("Authorization: " + Authorization);
        log.info("request.getHeader: " + request.getHeader("Authorization"));
        return "update student";
    }

    /**
     * test del
     *
     * @param map map
     * @return map as String
     */
    @DeleteMapping("/del")
    public ResultV0 delStudent (@RequestHeader Map<String, String> map) {
        return ResultV0.OK(map);
    }

    /**
     * Upload result v 0.
     *
     * @param avatar the avatar 前端参数需要与此一致；
     * @return the result v 0
     * @throws Exception the exception
     */
    @PostMapping("/upload")
    public ResultV0 upload (MultipartFile avatar) throws Exception {
        int lastIndexOf = avatar.getOriginalFilename().lastIndexOf("."); // 会抛出 NullPointerException
        //获取文件的后缀名 .jpg
        String suffix = avatar.getOriginalFilename().substring(lastIndexOf); // 获取的 已经有 . 了
        String newFileName = UUIDGetter.getAsString() + suffix;
        log.info("新文件名：" + newFileName);
        File file = new File("E:\\dev\\custom-test-001\\sb_demo\\src\\main\\resources\\static\\upload\\files\\" + newFileName);
        avatar.transferTo(file);
        return ResultV0.OK(null, "上传成功，新文件名: " + file.getName());
    }
}
