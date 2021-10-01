package com.jiaopi404.sb_demo_001.pojo.bo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;
import org.hibernate.validator.constraints.Range;

import javax.validation.constraints.NotNull;
import java.lang.String;
import java.lang.Integer;

/**
 * TestTable 的 业务对象；
 * <p>1. 类似 DTO 的功能，一般接收参数使用业务层对象，与数据库无关</p>
 * 常用验证规则
 * <p>NotNull</p>
 * <p>Range</p>
 * <p>NotEmpty</p>
 * <p>Email</p>
 * <p></p>
 * <p></p>
 */
@Data
@AllArgsConstructor
@ToString
public class TestTableBO {
    private String id;

    @NotNull(message = "传了个啥玩意")
    private String name;

    @Range(min = 18, max = 120, message = "宁年龄有问题吧？？？")
    private Integer age;
}
