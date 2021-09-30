package com.jiaopi404.sb_demo_001.controller;

import com.jiaopi404.sb_demo_001.mapper.TestTableDao;
import com.jiaopi404.sb_demo_001.pojo.TestTable;
import com.jiaopi404.sb_demo_001.utils.ResultV0;
import com.jiaopi404.sb_demo_001.utils.UUIDGetter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * The type Test table controller.
 */
@RestController
@RequestMapping("test-table")
@Slf4j
public class TestTableController {

    @Autowired
    private TestTableDao testTableDao;

    /**
     * Gets by id.
     *
     * @param id the id
     * @return the by id
     */
    @GetMapping("/get/{id}")
    public ResultV0 getById (@PathVariable("id") String id) {
        log.info("id is: " + id);
        TestTable table = testTableDao.selectByPrimaryKey(id);
        return ResultV0.OK(table);
    }

    /**
     * Gets list.
     *
     * @return the list
     */
    @GetMapping("/get-list")
    public ResultV0 getList () {
        List<TestTable> tableList = testTableDao.selectAll();
        return ResultV0.OK(tableList);
    }

    /**
     * 测试 insert
     *
     * @param testTable the test table
     * @return the result v 0
     */
    @PostMapping("/save")
    public ResultV0 save (@RequestBody TestTable testTable) {
        if (testTable.getId() == null) { // 新增
            System.out.println("新增");
            testTable.setId(UUIDGetter.getAsString()); // 设置 id
        }
        int table = testTableDao.insert(testTable);
        return ResultV0.OK(table);
    }
}
