package com.jiaopi404.sb_demo_001.mapper;

import com.jiaopi404.sb_demo_001.my.mapper.MyMapper;
import com.jiaopi404.sb_demo_001.pojo.TestTable;
import org.springframework.stereotype.Repository;

/****
 * @Author: jiaopi404
 * @Description: TestTable的Dao
 * @Date 2021 /1/4 14:30
 */
@Repository
public interface TestTableMapper extends MyMapper<TestTable> {

    /**
     * 自定义方法，与 Mapper 关联了;
     *
     * @param id the id
     * @return the instance v 0
     */
    public TestTable getInstanceV0(String id);
}
