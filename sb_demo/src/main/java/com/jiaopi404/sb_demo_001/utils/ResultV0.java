package com.jiaopi404.sb_demo_001.utils;

public class ResultV0 {
    Integer code; // 状态码
    Object data; // 数据
    String msg; // 消息

    public ResultV0 () {
        this.code = RespTplConstant.OK.getCode();
        this.data = null;
        this.msg = RespTplConstant.OK.getMsg();
    }

    public static ResultV0 ok (Object data) {
        return new ResultV0();
    }
}
