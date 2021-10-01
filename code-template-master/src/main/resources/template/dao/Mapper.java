package ${package_mapper};
import ${package_pojo}.${Table};
//import tk.mybatis.mapper.common.Mapper;
import ${package_my_mapper}.MyMapper;

/****
 * @Author:jiaopi404
 * @Description:${Table}的Dao
 * @Date 2021/1/4 14:30
 *****/
@Repository
//public interface ${Table}Mapper extends Mapper<${Table}> {
public interface ${Table}Mapper extends MyMapper<${Table}> {
}
