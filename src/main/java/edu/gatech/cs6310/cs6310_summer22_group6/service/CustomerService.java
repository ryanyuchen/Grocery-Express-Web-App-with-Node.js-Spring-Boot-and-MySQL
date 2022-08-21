package edu.gatech.cs6310.cs6310_summer22_group6.service;

import edu.gatech.cs6310.cs6310_summer22_group6.common.Result;
import edu.gatech.cs6310.cs6310_summer22_group6.entity.Customer;

public interface CustomerService {
    Result addCustomer(Customer customer);

    Result displayCustomer();
}
