package com.jiaopi404.sb_demo_001.pojo;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

/**
 * SysConfig pojo
 *
 * 1. Component 注解，会被 SpringBootApplication 扫描到，同一个路径以及子路径
 * 2. ConfigurationProperties 注解，引入自定义属性配置，封装成 Bean 容器
 */
@Component
/**
 * NOTE：
 * 1. Dependency: spring-boot-configuration-processor
 * 2. Canonical names (sysConfig) is not allowed. Should be kebab-case(sys-config)
 * 3. PropertySource 规定自定义属性文件的 路径 以及 编码方式
 */
@ConfigurationProperties(prefix = "sys-config")
/**
 * NOTE:
 * 1. resources 文件打包后会在 classpath, 所以路径加 classpath
 * 2. `encoding` is REQUIRED!!
 */
@PropertySource(value="classpath:MyConfig.properties", encoding = "UTF-8")
public class SysConfig {
    /**
     * The Pro name.
     */
    String proName;
    /**
     * The Version.
     */
    String version;
    /**
     * The Author.
     */
    String author;
    /**
     * The Author age.
     */
    Integer authorAge;

    /**
     * Gets pro name.
     *
     * @return the pro name
     */
    public String getProName() {
        return proName;
    }

    /**
     * Sets pro name.
     *
     * @param proName the pro name
     */
    public void setProName(String proName) {
        this.proName = proName;
    }

    /**
     * Gets version.
     *
     * @return the version
     */
    public String getVersion() {
        return version;
    }

    /**
     * Sets version.
     *
     * @param version the version
     */
    public void setVersion(String version) {
        this.version = version;
    }

    /**
     * Gets author.
     *
     * @return the author
     */
    public String getAuthor() {
        return author;
    }

    /**
     * Sets author.
     *
     * @param author the author
     */
    public void setAuthor(String author) {
        this.author = author;
    }

    /**
     * Gets author age.
     *
     * @return the author age
     */
    public Integer getAuthorAge() {
        return authorAge;
    }

    /**
     * Sets author age.
     *
     * @param authorAge the author age
     */
    public void setAuthorAge(Integer authorAge) {
        this.authorAge = authorAge;
    }
}
