package com.jiaopi404.sb_demo_001.config.exception;

/**
 * 优雅的异常类；GraceException
 * <p>1. 创建此类的目的：使用方法进行异常的调用，而不是创建新的 异常类，更加优雅</p>
 * <p>2. 注意 display 方法 要抛出错误，这样才能被上层捕获到</p>
 */
public class GraceException {

    /**
     * Display custom exception.
     *
     * @param errorMsg the error msg
     * @return the custom exception
     */
    public static CustomException display (String errorMsg) {
        throw new  CustomException(errorMsg);
    }
}
