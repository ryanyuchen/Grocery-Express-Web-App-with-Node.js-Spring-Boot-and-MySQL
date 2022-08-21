package edu.gatech.cs6310.cs6310_summer22_group6.entity;

import lombok.Data;

@Data
public class Pilot {
    private Integer pilotId;
    private String account;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String taxId;
    private String licenseId;
    private Integer experience;
}
