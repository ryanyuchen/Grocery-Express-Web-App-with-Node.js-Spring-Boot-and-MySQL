package edu.gatech.cs6310.cs6310_summer22_group6.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.Transient;

@Data
public class Line {


    @Transient
    private String storeName;

    private String orderIdentifier;

    private String itemName;
    @JsonIgnore
    private Integer lineId;
    @JsonIgnore
    private Integer orderId;
    @JsonIgnore
    private Integer itemId;

    private Integer quantity;
    private Integer totalCost;
    private Integer totalWeight;
}
