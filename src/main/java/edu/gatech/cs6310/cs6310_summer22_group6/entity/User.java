package edu.gatech.cs6310.cs6310_summer22_group6.entity;

import lombok.Data;

import javax.persistence.Transient;


@Data
public class User {
    private Integer userId;
    private String username;
    private String password;
    private Integer role;
    @Transient
    private String token;
}
