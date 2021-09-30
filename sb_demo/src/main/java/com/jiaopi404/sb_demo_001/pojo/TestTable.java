package com.jiaopi404.sb_demo_001.pojo;

import java.io.Serializable;
import lombok.Data;

/**
 * test_table
 * @author 
 */
@Data
public class TestTable implements Serializable {
    /**
     * 主键，使用 varchar，防止以后做分布式，分库分表出问题
     */
    private String id;

    /**
     * 姓名备注
     */
    private String name;

    /**
     * age 备注
     */
    private Integer age;

    private static final long serialVersionUID = 1L;
}