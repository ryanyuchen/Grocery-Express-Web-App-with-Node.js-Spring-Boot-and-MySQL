package edu.gatech.cs6310.cs6310_summer22_group6.mapper;

import edu.gatech.cs6310.cs6310_summer22_group6.entity.Customer;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface CustomerMapper {

    @Insert("INSERT into customer(user_id, username, first_name, last_name, phone_number, credit, rating)"
            + "VALUES (#{userId}, #{username}, #{firstName}, #{lastName}, #{phoneNumber}, #{credit}, #{rating})")
    @Options(useGeneratedKeys = true, keyProperty = "customerId", keyColumn = "customer_id")
    int addCustomer(Customer customer);

    @Select("SELECT * FROM customer WHERE user_id = #{userId}")
    List<Customer> getCustomerByUserId(Integer userId);

    @Select("SELECT * FROM customer WHERE customer_id = #{customerId}")
    List<Customer> getCustomerByCustomerId(Integer customerId);

    @Update("UPDATE customer set pending_order_cost = #{pendingOrderCost}, credit = #{credit}, rating = #{rating}"
            + "WHERE customer_id = #{customerId}")
    int updateCustomer(Customer customer);

    @Select("SELECT * FROM customer ORDER BY username ASC")
    List<Customer> getAllCustomers();

}
