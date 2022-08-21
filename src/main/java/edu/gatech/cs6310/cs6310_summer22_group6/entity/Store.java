package edu.gatech.cs6310.cs6310_summer22_group6.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

@Data
public class Store {
    private Integer storeId;
    private String storeName;
    private Integer revenue;

    @JsonIgnore
    @TableField(exist = false)
    private int location;
}
