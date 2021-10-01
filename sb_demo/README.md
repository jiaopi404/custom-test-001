# readme

## 1. 整合 DataSource

### 1. 整合数据源 `HikariCP` ，似乎就是 JDBC

1. 持久层框架
- Hibernate
- JPA
- MyBatis

2. 数据源
- C3P0
- dbcp
- druid 1.x 时代
- BoneCP

`HikariCP` 日语光速
- SpringBoot 官方首推默认
- 性能高效，速度快
- 代码精简优化

3. 两个依赖
`spring-boot-starter-jdbc` and `mysql-connector-java`
   
其中 `mysql-connector-java` 可用于 mysql 和 MariaDB (原作者开发的另一个数据库，可从 mysql 平滑迁移；
mysql 已经被收购，以后可能会闭源)

4. 安装 mysql docker 8.0.26

`docker run -p 3307:3306 --name mysql8 -v $PWD/conf:/etc/mysql/conf.d -v $PWD/logs:/var/log/mysql -v $PWD/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 -d mysql:8.0.26`

```bash
docker run -p 3307:3306 --name mysql8 \
 -v $PWD/conf:/etc/mysql/conf.d \
 -v $PWD/logs:/var/log/mysql \
 -v $PWD/data:/var/lib/mysql \
 -e MYSQL_ROOT_PASSWORD=123456 \
 -d mysql:8.0.26
```

### 2. 整合 HikariCP 数据源，yml 设置

```yaml
  datasource:                                   # 数据源相关的配置节点
    type: com.zaxxer.hikari.HikariDataSource    # 指定数据源的类型 HikariDataSource
    # Loading class `com.mysql.jdbc.Driver'. This is deprecated. The new driver class is `com.mysql.cj.jdbc.Driver'. The driver is automatically registered via the SPI and manual loading of the driver class is generally unnecessary.
    driver-class-name: com.mysql.cj.jdbc.Driver    # mysql / MariaDB driver，被禁用了
    url: jdbc:mysql://47.108.156.216:3307/sb_demo_001?useUnicode=true&characterEncoding=UTF-8&autoReconnect=true
    username: root
    password: 123456
    hikari:
      connection-timeout: 30000       # 等待连接池分配连接的最大时长（毫秒），超过这个时长还没可用的连接则发生 SQLException, 默认30分钟
      minimum-idle: 5                 # 最小连接数
      maximum-pool-size: 20           # 最大连接数
      auto-commit: true               # 自动提交
      idle-timeout: 600000            # 连接超时的最大时长（毫秒），超时则被释放（retired），默认 10 分钟
      pool-name: DataSourceHikariCP   # 连接池名字
      max-lifetime: 1800000           # 连接的生命时长（毫秒），超时而且没被使用则释放（retired)，默认 30 分钟
      connection-test-query: SELECT 1
```

### 3. 整合 MyBatis (tk.mybatis)

1. 引入依赖:
- `mybatis starter` 主依赖
  
```xml
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>2.1.0</version>
</dependency>
```

yml配置：
```yaml
#========================================================
#整合mybatis,设置别名，识别mapper文件
mybatis:
  type-aliases-package: com.jiaopi404.sb_demo_001.pojo # 所有数据库表逆向后所一一映射的实体类 Entity/Bean/POJO
  mapper-locations: classpath:mybatis/mapper/*.xml     # 所有 mapper 映射的文件所在目录位置
```

- `mapper starter` mapper 工具，可以使 pojo 与 数据库表进行关联，省去很多工作

```xml
<dependency>
    <groupId>tk.mybatis</groupId>
    <artifactId>mapper-spring-boot-starter</artifactId>
    <version>2.1.5</version>
</dependency>
```

<div style="color: red;">注意：</div>
主类添加 `@MapperScan(basePackages = "com.jiaopi404.sb_demo_001.mapper")`
注解来自于 `tk.mybatis.spring.annotation.MapperScan;` 注意不要混淆

yml 配置

```yaml
# ========================================================
# 通用的 mapper 配置
mapper:
  mappers: com.jiaopi404.sb_demo_001.my.mapper.MyMapper # 所有 mapper 都需要实现的接口
  not-empty: false # 在进行数据库操作的时候，判断一个属性是否为空的时候，是否需要自动追加不为空字符串的判断；
                   # 如：username != null 后面不需要 username != ''
  identity: MYSQL  # mapper 的标识符，类似语言

```

### 4. PageHelper 分页助手

- `pagehelper-spring-boot-starter` 分页助手

```xml
<dependency>
    <groupId>com.github.pagehelper</groupId>
    <artifactId>pagehelper-spring-boot-starter</artifactId>
    <version>1.2.12</version>
</dependency>
```

yaml 配置

```yaml
# ========================================================
# 分页插件助手的配置 PageHelper
pagehelper:
  helper-dialect: mysql           # 语言，类似上面 mapper.identity
  support-methods-arguments: true # 支持方法的参数，个人理解为 某个Bean 的方法需要 PageHelper 的参数时可以获取的到
```


## 2. MyBatis 代码自动成成

### 1. code-template-master, 还有改动的余地；

### 2. mybatis-generator 工具 （暂未实验）

### 3. IDEA mybatis 插件，可生成代码

## 3. 使用 Hibernate 的验证框架对参数进行验证

### 1. 引入包 `spring-boot-starter-validate`

### 2. BO 加入相应的注解 NotNull or NotEmpty and so on

### 3. controller 在接收参数时添加验证 @valid, 之后添加额外参数 BindingResult bindingResult

- 解析 bindingResult
- 使用异常处理的方式处理 bindingResult 的错误

```java
public static void validate (BindingResult bindingResult) throws ValidationException {
    Map<String, String> map = new HashMap<>();
    List<FieldError> fieldErrors = bindingResult.getFieldErrors();
    for (FieldError fieldError : fieldErrors) {
        map.put(fieldError.getField(), fieldError.getDefaultMessage());
    }
    if (!map.isEmpty()) {
        throw GraceException.validationError(map, "表单验证错误");
    }
}
```

### 4. 输出错误信息，返回 ResultV0.error(map)

## 4. 根据 Example 或根据 对象 查询

1. 根据条件查询: 两种方式

1.1 使用 Example 和 selectByExample

1.2 使用 对象 和 select(Obj obj)

## 5. 根据 Example 或 根据 主键 进行更新

```java
testTableMapper.updateByPrimaryKey() // 根据主键进行更新
testTableMapper.updateByPrimaryKeySelective() // 更新，自动选择，根据主键更新属性不为null的值
testTableMapper.updateByExample()
testTableMapper.updateByExampleSelective()
```

## 6. 删除操作，三种方式

```java
testTableMapper.delete(testTable)
testTableMapper.deleteByExample(example)
testTableMapper.deleteByPrimaryKey(id)
```

## 7. 事务操作

事务的类型:

- `REQUIRED(TransactionDefinition.PROPAGATION_REQUIRED)`
  - 默认值，有事务的话加入事务，没有事务的话新建事务
- `SUPPORTS(TransactionDefinition.PROPAGATION_SUPPORTS)`
  - 当前存在事务，则加入事务，如果没有事务，则以没有事务的方式执行，某些查询以这种方式进行
- `MANDATORY(TransactionDefinition.PROPAGATION_MANDATORY)`
  - 当前存在事务，加入；如果没有事务，则抛出异常；必须以事务方式进行
- `REQUIRES_NEW(TransactionDefinition.PROPAGATION_REQUIRES_NEW)`
  - 当前存在事务，则挂起，起一个新的事务进行
- `NOT_SUPPORTED(TransactionDefinition.PROPAGATION_NOT_SUPPORTED)`
  - 非事务方式运行，存在事务则挂起
- `NEVER(TransactionDefinition.PROPAGATION_NEVER)`
  - 非事务方式运行，存在事务则抛出异常
- `NESTED(TransactionDefinition.PROPAGATION_NESTED)`
  - 如果有事务，则子事务方式运行；没有事务，类似 required

## 8. 使用自定义 sql 进行查询

1. 工具生成的 xml 和 mapper 一般是使用逆向工具自动生成的，因此不建议直接在文件上修改，因此在同目录下（为了 mapper 和 mybatis 能够扫描到）创建
自定义的 xml 和 mapper 仓库
   
2. 写 sql 注意格式；

3. 具体写法参考如下

```xml
  <select id="getTestTableByNameLike" parameterType="java.lang.String" resultType="com.jiaopi404.sb_demo_001.pojo.TestTable">
    select
        *
    from test_table
    where
          `name`
    like concat('%',#{myName},'%')
  </select>
```

以上，如果使用 `resultMap` 属性，可以定义如下的 resultMap 结点

```xml
<resultMap id="BaseResultMap" type="com.jiaopi404.sb_demo_001.pojo.TestTable">
    <id column="id" jdbcType="VARCHAR" property="id" />
    <result column="name" jdbcType="VARCHAR" property="name" />
    <result column="age" jdbcType="INTEGER" property="age" />
    <result column="update_time" jdbcType="TIME_WITH_TIMEZONE" property="updateTime" />
</resultMap>
<!--    这个相当于要查询的列的，做一个集合, 之后语句就可以 include[refid="定义的名字"]-->
<sql id="Base_Column_List">
    id, `name`, age, update_time
</sql>
<select id="getTestTableByNameLike" parameterType="java.lang.String" resultMap="BaseResultMap">
  select
  <include refid="Base_Column_List" />
  from test_table
  where
  `name`
  like concat('%',#{name,jdbcType=VARCHAR},'%')
</select>
```

或者使用 `@Select` 注解

```java
@Select("select * from test_table where `name` like concat('%',#{myName},'%')")
List<TestTable> testGetTestTableByNameLike(String myName);
```

注意：
1. like 的写法，需要使用 concat，原因暂且未知