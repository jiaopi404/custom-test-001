package ${package_service};
import ${package_pojo}.${Table};
import com.github.pagehelper.PageInfo;
import java.util.List;
/****
 * @Author:jiaopi404
 * @Description:${Table}业务层接口
 * @Date 2021/1/4 14:30
 *****/
public interface ${Table}Service {

    /***
     * ${Table}多条件分页查询
     * @param ${table}
     * @param page
     * @param size
     * @return
     */
    PageInfo<${Table}> findPage(${Table} ${table}, int page, int size);

    /***
     * ${Table}分页查询
     * @param page
     * @param size
     * @return
     */
    PageInfo<${Table}> findPage(int page, int size);

    /***
     * ${Table}多条件搜索方法
     * @param ${table}
     * @return
     */
    List<${Table}> findList(${Table} ${table});

    /***
     * 删除${Table}
     * @param id
     */
    Integer delete(${keyType} id);

    /***
     * 修改${Table}数据
     * @param ${table}
     */
    Integer update(${Table} ${table});

    /***
     * 新增${Table}
     * @param ${table}
     */
    Integer add(${Table} ${table});

    /**
     * 根据ID查询${Table}
     * @param id
     * @return
     */
     ${Table} findById(${keyType} id);

    /***
     * 查询所有${Table}
     * @return
     */
    List<${Table}> findAll();
}
