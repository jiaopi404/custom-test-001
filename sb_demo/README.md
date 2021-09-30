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
