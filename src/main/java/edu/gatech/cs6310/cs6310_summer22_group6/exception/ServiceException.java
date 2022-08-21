package edu.gatech.cs6310.cs6310_summer22_group6.exception;

import lombok.Getter;

@Getter
public class ServiceException extends RuntimeException{
    private String code;
    public ServiceException(String code, String msg){
        super(msg);
        this.code = code;
    }
}
