package com.jiaopi404.sb_demo_001.service.impl;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.jiaopi404.sb_demo_001.mapper.TestTableMapper;
import com.jiaopi404.sb_demo_001.pojo.TestTable;
import com.jiaopi404.sb_demo_001.service.TestTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import tk.mybatis.mapper.entity.Example;
import java.util.List;

/****
 * @Author:jiaopi404
 * @Description:TestTable业务层接口实现类
 * @Date 2021 /1/4 14:30
 */
@Service
public class TestTableServiceImpl implements TestTableService {

    @Autowired
    private TestTableMapper testTableMapper;


    /**
     * TestTable条件+分页查询
     * @param testTable 查询条件
     * @param page 页码
     * @param size 页大小
     * @return 分页结果
     */
    @Override
    public PageInfo<TestTable> findPage(TestTable testTable, int page, int size){
        //分页
        PageHelper.startPage(page,size);
        //搜索条件构建
        Example example = createExample(testTable);
        //执行搜索
        return new PageInfo<TestTable>(testTableMapper.selectByExample(example));
    }

    /**
     * TestTable分页查询
     * @param page
     * @param size
     * @return
     */
    @Override
    public PageInfo<TestTable> findPage(int page, int size){
        //静态分页
        PageHelper.startPage(page,size);
        //分页查询
        return new PageInfo<TestTable>(testTableMapper.selectAll());
    }

    /**
     * TestTable条件查询
     * @param testTable
     * @return
     */
    @Override
    public List<TestTable> findList(TestTable testTable){
        //构建查询条件
        Example example = createExample(testTable);
        //根据构建的条件查询数据
        return testTableMapper.selectByExample(example);
    }


    /**
     * TestTable构建查询对象
     *
     * @param testTable the test table
     * @return example
     */
    public Example createExample(TestTable testTable){
        Example example=new Example(TestTable.class);
        Example.Criteria criteria = example.createCriteria();
        if(testTable!=null){
            // 主键，使用 varchar，防止以后做分布式，分库分表出问题
            if(!StringUtils.isEmpty(testTable.getId())){
                    criteria.andEqualTo("id",testTable.getId());
            }
            // 姓名备注
            if(!StringUtils.isEmpty(testTable.getName())){
                    criteria.andLike("name","%"+testTable.getName()+"%");
            }
            // age 备注
            if(!StringUtils.isEmpty(testTable.getAge())){
                    criteria.andEqualTo("age",testTable.getAge());
            }
        }
        return example;
    }

    /**
     * 删除
     * @param id
     */
    @Override
    public void delete(String id){
        testTableMapper.deleteByPrimaryKey(id);
    }

    /**
     * 修改TestTable
     * @param testTable
     */
    @Override
    public Integer update(TestTable testTable){
        return testTableMapper.updateByPrimaryKey(testTable);
    }

    /**
     * 增加TestTable
     * @param testTable
     */
    @Override
    public void add(TestTable testTable){
        testTableMapper.insert(testTable);
    }

    /**
     * 根据ID查询TestTable
     * @param id
     * @return
     */
    @Override
    public TestTable findById(String id){
//        return  testTableMapper.selectByPrimaryKey(id);
        return  testTableMapper.getInstanceV0(id);
    }

    /**
     * 查询TestTable全部数据
     * @return
     */
    @Override
    public List<TestTable> findAll() {
        return testTableMapper.selectAll();
    }

    @Override
    public List<TestTable> findByExample(Example example) {
        return testTableMapper.selectByExample(example);
    }

    /**
     * 根据实体条件查询 entity condition list.
     *
     * @param testTable the test table
     * @return the list
     */
    @Override
    public List<TestTable> findByEntityCondition(TestTable testTable) {
        return testTableMapper.select(testTable);
    }
}
