# readme

## 部分文档

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
