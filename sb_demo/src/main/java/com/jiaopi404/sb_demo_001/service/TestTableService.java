package com.jiaopi404.sb_demo_001.service;
import com.jiaopi404.sb_demo_001.pojo.TestTable;
import com.github.pagehelper.PageInfo;
import tk.mybatis.mapper.entity.Example;

import java.util.List;

/****
 * @Author:jiaopi404
 * @Description:TestTable业务层接口
 * @Date 2021 /1/4 14:30
 */
public interface TestTableService {

    /***
     * TestTable多条件分页查询
     * @param testTable the test table
     * @param page the page
     * @param size the size
     * @return page info
     */
    PageInfo<TestTable> findPage(TestTable testTable, int page, int size);

    /***
     * TestTable分页查询
     * @param page the page
     * @param size the size
     * @return page info
     */
    PageInfo<TestTable> findPage(int page, int size);

    /***
     * TestTable多条件搜索方法
     * @param testTable the test table
     * @return list list
     */
    List<TestTable> findList(TestTable testTable);

    /***
     * 删除TestTable
     * @param id the id
     */
    void delete(String id);

    /***
     * 修改TestTable数据
     * @param testTable the test table
     */
    void update(TestTable testTable);

    /***
     * 新增TestTable
     * @param testTable the test table
     */
    void add(TestTable testTable);

    /**
     * 根据ID查询TestTable
     *
     * @param id the id
     * @return test table
     */
    TestTable findById(String id);

    /***
     * 查询所有TestTable
     * @return list list
     */
    List<TestTable> findAll();

    /**
     * 根据条件进行查询
     *
     * @param example the example
     * @return the list
     */
    List<TestTable> findByExample(Example example);


    /**
     * 根据实体条件查询 entity condition list.
     *
     * @param testTable the test table
     * @return the list
     */
    List<TestTable> findByEntityCondition(TestTable testTable);
}
