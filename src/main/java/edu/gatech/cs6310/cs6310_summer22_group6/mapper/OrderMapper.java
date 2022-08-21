package edu.gatech.cs6310.cs6310_summer22_group6.mapper;

import edu.gatech.cs6310.cs6310_summer22_group6.entity.Order;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
public interface OrderMapper {
    @Select("SELECT * FROM `order` WHERE order_identifier = #{orderIdentifier} AND store_id = #{storeId}")
    List<Order> getOrderByIdentifierAndStoreId(String orderIdentifier, Integer storeId);

    @Insert("INSERT into `order`(store_id, customer_id, drone_id, order_identifier)"
            + "VALUES (#{storeId}, #{customerId}, #{droneId}, #{orderIdentifier})")
    @Options(useGeneratedKeys=true, keyProperty="orderId", keyColumn="order_id")
    int startOrder(Order order);


    @Update("UPDATE `order` SET total_cost = #{totalCost}, total_weight = #{totalWeight}, status = #{status} WHERE order_id = #{orderId}")
    int updateOrder(Order order);

    @Select("SELECT * FROM `order` WHERE status = 'Pending' AND store_id = #{storeId} ORDER BY order_identifier ASC")
    List<Order> getAllPendingOrders(Integer storeId);

    @Select("SELECT * FROM `order` WHERE customer_id = #{customerId}" )
    List<Order> getMyOrders(Integer customerId);
}
