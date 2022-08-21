package edu.gatech.cs6310.cs6310_summer22_group6.entity;


import lombok.Data;

import javax.persistence.Transient;

@Data
public class Order {
    private Integer orderId;
    private String orderIdentifier;
    private Integer storeId;
    private Integer customerId;
    private Integer droneId;
    private Integer totalCost;
    private Integer totalWeight;
    private String status;

    @Transient
    private String storeName;

    @Transient
    private String droneIdentifier;

    @Transient
    private String userName;
}
