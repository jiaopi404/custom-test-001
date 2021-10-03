package com.jiaopi404.sb_demo_001.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.servlet.http.HttpServletRequest;
import java.io.FileWriter;
import java.io.Writer;
import java.util.*;

/**
 * 测试 Thymeleaf 的 controller
 * <p>1. Controller 注解</p>
 */
@Controller
@RequestMapping("/th")
public class ThymeleafController {

    @Autowired
    private TemplateEngine templateEngine;

    /**
     * 返回字符串，实际上是 spring.thymeleaf.prefix 下的 .html 的文件名
     *
     * @param model the model
     * @return the string
     */
    @GetMapping("/test001")
    public String test001(Model model,
                          HttpServletRequest req) {
        // 添加属性 文本
        model.addAttribute("someText", "服务器的返回");
        // 添加属性 日期
        model.addAttribute("someDate", new Date());
        // 添加属性 列表
        List<String> strList = new ArrayList<>();
        strList.add("111");
        strList.add("222");
        strList.add("333");
        model.addAttribute("strList", strList);
        // 添加属性 Map
        Map<String, String> someMap = new HashMap<>();
        someMap.put("attr1", "value1");
        someMap.put("attr2", "value2");
        someMap.put("attr3", "value3");
        model.addAttribute("someMap", someMap);
        // 操作 request 和 session
        req.setAttribute("reqAttr", "reqValue");
        req.getSession().setAttribute("sessionAttr", "sessionValue");
        return "test001";
    }

    @GetMapping("/test002")
    @ResponseBody
    public String test002 (Model model) throws Throwable {
        String template = "test002";
        Context context = new Context();
        context.setVariable("content", "这是用 thymeleaf 整出来的");
        String path = "/Users/jiaopi404/Desktop/github_demos/custom-test-001/sb_demo/src/main/resources/templates/out/";
        Writer out = new FileWriter(path + template + ".html");
        templateEngine.process(template, context, out);
        out.close();
        return "成功";
    }
}
