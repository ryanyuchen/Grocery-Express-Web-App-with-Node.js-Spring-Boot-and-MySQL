package edu.gatech.cs6310.cs6310_summer22_group6.controller;

import edu.gatech.cs6310.cs6310_summer22_group6.common.Result;
import edu.gatech.cs6310.cs6310_summer22_group6.entity.Customer;
import edu.gatech.cs6310.cs6310_summer22_group6.service.CustomerService;
import edu.gatech.cs6310.cs6310_summer22_group6.utils.TokenUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @PostMapping("/customer/add")
    public Result addCustomer(@RequestBody Customer customer){
        TokenUtils.checkAuthorization(0);
        return customerService.addCustomer(customer);
    }

    @GetMapping("/customer/display")
    public Result displayCustomer(){
        TokenUtils.checkAuthorization(1);
        return customerService.displayCustomer();
    }
}
