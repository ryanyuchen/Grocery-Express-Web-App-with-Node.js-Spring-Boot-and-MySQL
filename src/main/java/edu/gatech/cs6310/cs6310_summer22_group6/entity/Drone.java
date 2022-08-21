package edu.gatech.cs6310.cs6310_summer22_group6.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.persistence.Transient;

@Data
public class Drone {
    @JsonIgnore
    private Integer droneId;
    private String droneIdentifier;

    @JsonIgnore
    private Integer storeId;

    @Transient
    private String storeName;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Integer maxTrip;

    private Integer maxCapacity;

    @JsonIgnore
    private Integer pilotId;

    private Integer droneStatus;
    private Integer remainingTrip;
    private Integer remainingCapacity;
    private Integer numOfOrders;

    @Transient
    private Integer repairCost;

}
