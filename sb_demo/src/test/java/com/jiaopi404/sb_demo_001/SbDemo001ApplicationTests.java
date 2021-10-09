package com.jiaopi404.sb_demo_001;

import com.jiaopi404.sb_demo_001.pojo.TestTable;
import com.jiaopi404.sb_demo_001.service.TestTableService;
import com.jiaopi404.sb_demo_001.utils.UUIDGetter;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class SbDemo001ApplicationTests {

    @Autowired
    private TestTableService testTableService;

    @Test
    void contextLoads() {
    }

    @Test
    void testTableAdd () {
        TestTable testTable = new TestTable();
        testTable.setId(UUIDGetter.getAsString());
        testTable.setName("自动测试 + " + System.currentTimeMillis());
        testTable.setAge(11);
        testTableService.add(testTable);
        int a = 100 / 0;
    }

}
