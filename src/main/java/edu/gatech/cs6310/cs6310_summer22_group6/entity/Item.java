package edu.gatech.cs6310.cs6310_summer22_group6.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class Item {
    private Integer itemId;
    private Integer storeId;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @TableField(exist = false)
    private String storeName;

    private String itemName;
    private Integer unitWeight;
    private Integer unitPrice;

}
