package com.jiaopi404.sb_demo_001.mapper;

import com.jiaopi404.sb_demo_001.my.mapper.MyMapper;
import com.jiaopi404.sb_demo_001.pojo.TestTable;
import org.springframework.stereotype.Repository;

/**
 * TestTableDao继承基类
 */
@Repository
public interface TestTableDao extends MyMapper<TestTable> {
}