package com.jiaopi404.sb_demo_001.pojo;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

@Component
/**
 * NOTE：
 * 1. Dependency: spring-boot-configuration-processor
 * 2. Canonical names (sysConfig) is not allowed. Should be kebab-case(sys-config)
 */
@ConfigurationProperties(prefix = "sys-config")
/**
 * NOTE:
 * 1. resources 文件打包后会在 classpath, 所以路径加 classpath
 * 2. `encoding` is REQUIRED!!
 */
@PropertySource(value="classpath:MyConfig.properties", encoding = "UTF-8")
public class SysConfig {
    String proName;
    String version;
    String author;
    Integer authorAge;

    public String getProName() {
        return proName;
    }

    public void setProName(String proName) {
        this.proName = proName;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public Integer getAuthorAge() {
        return authorAge;
    }

    public void setAuthorAge(Integer authorAge) {
        this.authorAge = authorAge;
    }
}
