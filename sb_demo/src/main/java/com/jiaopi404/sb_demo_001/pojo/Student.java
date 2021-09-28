package com.jiaopi404.sb_demo_001.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data // 默认创建 getter setter，无参的构造函数
@AllArgsConstructor // 加上之后，不会再创建 无参构造函数
@NoArgsConstructor
public class Student {
    String name;
    String code;
    Integer age;
}
