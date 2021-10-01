package com.jiaopi404.sb_demo_001.mapper;

import com.jiaopi404.sb_demo_001.my.mapper.MyMapper;
import com.jiaopi404.sb_demo_001.pojo.TestTable;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

/****
 * 自定义 mapper，自己写 sql
 * 不需要继承 MyMapper
 * @Author: jiaopi404
 * @Description: TestTable的Dao
 * @Date 2021 /1/4 14:30
 */
@Repository
public interface TestTableMapperCus {

    List<TestTable> getTestTableByNameLike(String name);

    @Select("select * from test_table where `name` like concat('%',#{myName},'%')")
    List<TestTable> testGetTestTableByNameLike(String myName);
}
