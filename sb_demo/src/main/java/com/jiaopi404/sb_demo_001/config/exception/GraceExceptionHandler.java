package com.jiaopi404.sb_demo_001.config.exception;

import com.jiaopi404.sb_demo_001.utils.ResultV0;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 优雅的异常处理工具
 * <p>1. 异常要优雅得处理</p>
 * <p>2. ControllerAdvice 注解，基于 AOP 原理，会被扫描到 (实现了 Component) </p>
 * <p>3. 并不能拦截未抛出的错误，需要手动得抛出 Exception 才会拦截得到</p>
 * <p>4. 可以通过顶级类 Exception 拦截到抛出的其他衍生异常类，如 IOException</p>
 * <p>5. ExceptionHandler 默认拦截顶级类 Exception</p>
 */
@ControllerAdvice
@Slf4j
public class GraceExceptionHandler {

    /**
     * Default exception handler result v 0.
     *
     * @param e [Exception]
     * @return the result v 0
     */
    @ExceptionHandler // 是否可以省略 Exception.class? 可省略
    @ResponseBody
    public ResultV0 defaultExceptionHandler (Exception e) {
        e.printStackTrace();
        log.error(e.getMessage());
        return ResultV0.ERROR(e.getMessage());
    }
}
