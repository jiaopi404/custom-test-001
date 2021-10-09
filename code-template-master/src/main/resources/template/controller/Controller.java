package ${package_controller};
import ${package_pojo}.${Table};
import ${package_service}.${Table}Service;
import com.github.pagehelper.PageInfo;
//import entity.Result;
//import entity.StatusCode;
import com.jiaopi404.utils.ResultV0;
<#if swagger==true>import io.swagger.annotations.*;</#if>
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/****
 * @Author:jiaopi404
 * @Description:
 * @Date 2021/1/4 14:30
 *****/
<#if swagger==true>@Api(value = "${Table}Controller")</#if>
@RestController
@RequestMapping("/${table}")
@CrossOrigin
public class ${Table}Controller {

    @Autowired
    private ${Table}Service ${table}Service;

    /***
     * ${Table}分页条件搜索实现
     * @param ${table}
     * @param page
     * @param size
     * @return
     */
    <#if swagger==true>
    @ApiOperation(value = "${Table}条件分页查询",notes = "分页条件查询${Table}方法详情",tags = {"${Table}Controller"})
    @ApiImplicitParams({
            @ApiImplicitParam(paramType = "path", name = "page", value = "当前页", required = true, dataType = "Integer"),
            @ApiImplicitParam(paramType = "path", name = "size", value = "每页显示条数", required = true, dataType = "Integer")
    })
    </#if>
    @PostMapping(value = "/search/{page}/{size}" )
    public ResultV0<PageInfo<${Table}>> findPage(@RequestBody(required = false) <#if swagger==true>@ApiParam(name = "${Table}对象",value = "传入JSON数据",required = false)</#if> ${Table} ${table}, @PathVariable  int page, @PathVariable  int size){
        //调用${Table}Service实现分页条件查询${Table}
        PageInfo<${Table}> pageInfo = ${table}Service.findPage(${table}, page, size);
        return ResultV0.OK(pageInfo, "查询成功");
    }

    /***
     * ${Table}分页搜索实现
     * @param page:当前页
     * @param size:每页显示多少条
     * @return
     */
    <#if swagger==true>
    @ApiOperation(value = "${Table}分页查询",notes = "分页查询${Table}方法详情",tags = {"${Table}Controller"})
    @ApiImplicitParams({
            @ApiImplicitParam(paramType = "path", name = "page", value = "当前页", required = true, dataType = "Integer"),
            @ApiImplicitParam(paramType = "path", name = "size", value = "每页显示条数", required = true, dataType = "Integer")
    })
    </#if>
    @GetMapping(value = "/search/{page}/{size}" )
    public ResultV0<PageInfo<${Table}>> findPage(@PathVariable  int page, @PathVariable  int size){
        //调用${Table}Service实现分页查询${Table}
        PageInfo<${Table}> pageInfo = ${table}Service.findPage(page, size);
        return ResultV0.OK(pageInfo, "查询成功");
    }

    /***
     * 多条件搜索品牌数据
     * @param ${table}
     * @return
     */
    <#if swagger==true>
    @ApiOperation(value = "${Table}条件查询",notes = "条件查询${Table}方法详情",tags = {"${Table}Controller"})
    </#if>
    @PostMapping(value = "/search" )
    public ResultV0<List<${Table}>> findList(@RequestBody(required = false) <#if swagger==true>@ApiParam(name = "${Table}对象",value = "传入JSON数据",required = false)</#if> ${Table} ${table}){
        //调用${Table}Service实现条件查询${Table}
        List<${Table}> list = ${table}Service.findList(${table});
//        return new Result<List<${Table}>>(true,StatusCode.OK,"查询成功",list);
        return ResultV0.OK(list, "查询成功");
    }

    /***
     * 根据ID删除品牌数据
     * @param id
     * @return
     */
    <#if swagger==true>
    @ApiOperation(value = "${Table}根据ID删除",notes = "根据ID删除${Table}方法详情",tags = {"${Table}Controller"})
    @ApiImplicitParam(paramType = "path", name = "id", value = "主键ID", required = true, dataType = "${keyType}")
    </#if>
    @DeleteMapping(value = "/{id}" )
    public ResultV0<Object> delete(@PathVariable ${keyType} id){
        //调用${Table}Service实现根据主键删除
        ${table}Service.delete(id);
        return ResultV0.OK("删除成功");
    }

    /***
     * 修改${Table}数据
     * @param ${table}
     * @param id
     * @return
     */
    <#if swagger==true>
    @ApiOperation(value = "${Table}根据ID修改",notes = "根据ID修改${Table}方法详情",tags = {"${Table}Controller"})
    @ApiImplicitParam(paramType = "path", name = "id", value = "主键ID", required = true, dataType = "${keyType}")
    </#if>
    @PutMapping(value="/{id}")
    public ResultV0<Object> update(@RequestBody <#if swagger==true>@ApiParam(name = "${Table}对象",value = "传入JSON数据",required = false)</#if> ${Table} ${table},@PathVariable ${keyType} id){
        //设置主键值
        ${table}.${keySetMethod}(id);
        //调用${Table}Service实现修改${Table}
        ${table}Service.update(${table});
        return ResultV0.OK("修改成功");
    }

    /***
     * 新增${Table}数据
     * @param ${table}
     * @return
     */
    <#if swagger==true>
    @ApiOperation(value = "${Table}添加",notes = "添加${Table}方法详情",tags = {"${Table}Controller"})
    </#if>
    @PostMapping
    public ResultV0<Object> add(@RequestBody  <#if swagger==true>@ApiParam(name = "${Table}对象",value = "传入JSON数据",required = true)</#if> ${Table} ${table}){
        //调用${Table}Service实现添加${Table}
        ${table}Service.add(${table});
        return ResultV0.OK("添加成功");
    }

    /***
     * 根据ID查询${Table}数据
     * @param id
     * @return
     */
    <#if swagger==true>
    @ApiOperation(value = "${Table}根据ID查询",notes = "根据ID查询${Table}方法详情",tags = {"${Table}Controller"})
    @ApiImplicitParam(paramType = "path", name = "id", value = "主键ID", required = true, dataType = "${keyType}")
    </#if>
    @GetMapping("/{id}")
    public ResultV0<${Table}> findById(@PathVariable ${keyType} id){
        //调用${Table}Service实现根据主键查询${Table}
        ${Table} ${table} = ${table}Service.findById(id);
        return ResultV0.OK(${table}, "查询成功");
    }

    /***
     * 查询${Table}全部数据
     * @return
     */
    <#if swagger==true>
    @ApiOperation(value = "查询所有${Table}",notes = "查询所${Table}有方法详情",tags = {"${Table}Controller"})
    </#if>
    @GetMapping
    public ResultV0<List<${Table}>> findAll(){
        //调用${Table}Service实现查询所有${Table}
        List<${Table}> list = ${table}Service.findAll();
        return ResultV0.OK(list, "查询成功");
    }
}
