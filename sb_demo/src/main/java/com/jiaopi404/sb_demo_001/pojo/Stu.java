package com.jiaopi404.sb_demo_001.pojo;

/**
 * pojo stu
 * 1. 可以作为普通的类，也可以作为 Bean，之后自动注入到程序中；
 */
public class Stu {
    /**
     * The Name.
     */
    String name;
    /**
     * The Age.
     */
    Integer age;

    /**
     * Instantiates a new Stu.
     *
     * @param name the name
     * @param age  the age
     */
    public Stu(String name, Integer age) {
        this.name = name;
        this.age = age;
    }

    /**
     * Gets age.
     *
     * @return the age
     */
    public Integer getAge() {
        return age;
    }

    /**
     * Sets age.
     *
     * @param age the age
     */
    public void setAge(Integer age) {
        this.age = age;
    }

    /**
     * Gets name.
     *
     * @return the name
     */
    public String getName() {
        return name;
    }

    /**
     * Sets name.
     *
     * @param name the name
     */
    public void setName(String name) {
        this.name = name;
    }
}
