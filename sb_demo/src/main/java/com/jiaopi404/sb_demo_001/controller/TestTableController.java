package com.jiaopi404.sb_demo_001.controller;
import com.github.pagehelper.PageInfo;
import com.jiaopi404.sb_demo_001.pojo.TestTable;
import com.jiaopi404.sb_demo_001.pojo.bo.TestTableBO;
import com.jiaopi404.sb_demo_001.service.TestTableService;
import com.jiaopi404.sb_demo_001.utils.BindingResultValidator;
import com.jiaopi404.sb_demo_001.utils.ResultV0;

import com.jiaopi404.sb_demo_001.utils.UUIDGetter;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.persistence.FieldResult;
import javax.validation.Valid;
import java.util.List;

/****
 * @Author:jiaopi404
 * @Description:
 * @Date 2021 /1/4 14:30
 */
@RestController
@RequestMapping("/testTable")
@CrossOrigin
public class TestTableController {

    @Autowired
    private TestTableService testTableService;

    /***
     * 根据ID查询TestTable数据
     * @param id the id
     * @return result v 0
     */
    @GetMapping("/{id}")
    public ResultV0 findById(@PathVariable String id){
        //调用TestTableService实现根据主键查询TestTable
        TestTable testTable = testTableService.findById(id);
        return ResultV0.OK(testTable);
    }

    /***
     * 根据ID查询TestTable数据
     * @return result v 0
     */
    @GetMapping("/list")
    public ResultV0 findList(){
        //调用TestTableService实现根据主键查询TestTable
        List<TestTable> testTableList = testTableService.findAll();
        return ResultV0.OK(testTableList);
    }

    /**
     * Save result v 0.
     *
     * @param testTable the test table
     * @return the result v 0
     */
    @PostMapping("/save")
    public ResultV0 save (@RequestBody TestTable testTable) {
        if (testTable.getId() == null) {
            testTable.setId(UUIDGetter.getAsString());
        }
        testTableService.add(testTable);
        return ResultV0.OK(null, "add success");
    }

    /**
     * 保存业务对象
     *
     * @param testTableBO the test table bo
     * @param bindingResult 验证结果
     * @return the result v 0
     */
    @PostMapping("/save-bo")
    public ResultV0 save (@Valid @RequestBody TestTableBO testTableBO, BindingResult bindingResult) {
        BindingResultValidator.validate(bindingResult);
        TestTable testTable = new TestTable();
        BeanUtils.copyProperties(testTableBO, testTable); // 拷贝属性
        testTableService.add(testTable);
        return ResultV0.OK(null, "add bo success");
    }
}
