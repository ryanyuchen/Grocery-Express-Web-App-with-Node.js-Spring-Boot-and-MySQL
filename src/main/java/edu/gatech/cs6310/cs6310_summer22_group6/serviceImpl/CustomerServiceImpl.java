package edu.gatech.cs6310.cs6310_summer22_group6.serviceImpl;

import edu.gatech.cs6310.cs6310_summer22_group6.common.Result;
import edu.gatech.cs6310.cs6310_summer22_group6.entity.Customer;
import edu.gatech.cs6310.cs6310_summer22_group6.entity.User;
import edu.gatech.cs6310.cs6310_summer22_group6.exception.Code;
import edu.gatech.cs6310.cs6310_summer22_group6.mapper.CustomerMapper;
import edu.gatech.cs6310.cs6310_summer22_group6.service.CustomerService;
import edu.gatech.cs6310.cs6310_summer22_group6.utils.CommonUtils;
import edu.gatech.cs6310.cs6310_summer22_group6.utils.TokenUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerMapper customerMapper;

    @Override
    public Result addCustomer(Customer customer) {
        try {
            User currentUser = TokenUtils.getCurrentUser();
            Integer userId = currentUser.getUserId();
            if (customerMapper.getCustomerByUserId(userId).size() != 0) {
                return Result.error(Code.CODE_401, "Customer already exists");
            } else {
                customer.setUserId(userId);
                customer.setUsername(currentUser.getUsername());
                customer.setFirstName(CommonUtils.encrypt(customer.getFirstName()));
                customer.setLastName(CommonUtils.encrypt(customer.getLastName()));
                customer.setPhoneNumber(CommonUtils.encrypt(customer.getPhoneNumber()));
                customerMapper.addCustomer(customer);
                return Result.success("Customer added successfully");
            }
        } catch (DataAccessException e) {
            return Result.error(Code.CODE_100, e.getMessage());
        }
    }

    @Override
    public Result displayCustomer() {
        List<Customer> customers = customerMapper.getAllCustomers();

        for (int i = 0; i < customers.size(); i++) {
            Customer curr = customers.get(i);
            curr.setFirstName(CommonUtils.decrypt(curr.getFirstName()));
            curr.setLastName(CommonUtils.decrypt(curr.getLastName()));
            curr.setPhoneNumber(CommonUtils.decrypt(curr.getPhoneNumber()));
        }

        return Result.success(customers);
    }
}
