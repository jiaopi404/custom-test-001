package com.jiaopi404.sb_demo_001.pojo;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.lang.String;
import java.lang.Integer;
/****
 * @Author:jiaopi404
 * @Description:TestTable构建
 * @Date 2021/1/4 14:30
 *****/
@Table(name="test_table")
@Data
public class TestTable implements Serializable{

	@Id
    @Column(name = "id")
	private String id; // 主键，使用 varchar，防止以后做分布式，分库分表出问题

    @Column(name = "name")
	private String name; // 姓名备注

    @Column(name = "age")
	private Integer age; // age 备注

}
