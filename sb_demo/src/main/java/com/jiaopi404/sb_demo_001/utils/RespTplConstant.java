package com.jiaopi404.sb_demo_001.utils;

public enum RespTplConstant {
    OK(),
    OK_POST(200, "添加成功"),
    OK_GET(200, "查询成功"),
    OK_PUT(200, "修改成功"),
    OK_DEL(200, "删除成功");

    private final Integer code;
    private final String msg;

    private RespTplConstant () {
        this.code = 200;
        this.msg = "请求成功";
    }

    private RespTplConstant (Integer code, String msg) {
        this.code = 200;
        this.msg = "请求成功";
    }

    public Integer getCode () {
        return this.code;
    }

    public String getMsg () {
        return this.msg;
    }

}
