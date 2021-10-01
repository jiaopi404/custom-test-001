package com.jiaopi404.sb_demo_001.service;
import com.jiaopi404.sb_demo_001.pojo.TestTable;
import com.github.pagehelper.PageInfo;
import org.springframework.stereotype.Service;

import java.util.List;
/****
 * @Author:jiaopi404
 * @Description:TestTable业务层接口
 * @Date 2021/1/4 14:30
 *****/
public interface TestTableService {

    /***
     * TestTable多条件分页查询
     * @param testTable
     * @param page
     * @param size
     * @return
     */
    PageInfo<TestTable> findPage(TestTable testTable, int page, int size);

    /***
     * TestTable分页查询
     * @param page
     * @param size
     * @return
     */
    PageInfo<TestTable> findPage(int page, int size);

    /***
     * TestTable多条件搜索方法
     * @param testTable
     * @return
     */
    List<TestTable> findList(TestTable testTable);

    /***
     * 删除TestTable
     * @param id
     */
    void delete(String id);

    /***
     * 修改TestTable数据
     * @param testTable
     */
    void update(TestTable testTable);

    /***
     * 新增TestTable
     * @param testTable
     */
    void add(TestTable testTable);

    /**
     * 根据ID查询TestTable
     * @param id
     * @return
     */
     TestTable findById(String id);

    /***
     * 查询所有TestTable
     * @return
     */
    List<TestTable> findAll();
}
