package edu.gatech.cs6310.cs6310_summer22_group6.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;


@Data
public class Customer extends User {
    private Integer customerId;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private Integer credit;
    private Double rating;
    private Integer pendingOrderCost;

    @JsonIgnore
    @TableField(exist = false)
    private int location;

}
