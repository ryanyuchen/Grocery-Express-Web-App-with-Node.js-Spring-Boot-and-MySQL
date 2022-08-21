package edu.gatech.cs6310.cs6310_summer22_group6.service;

import edu.gatech.cs6310.cs6310_summer22_group6.common.Result;
import edu.gatech.cs6310.cs6310_summer22_group6.entity.Line;
import edu.gatech.cs6310.cs6310_summer22_group6.entity.Order;

public interface OrderService {
    Result startOrder(Order order);

    Result requestItem(Line line);

    Result purchaseOrder(Order order);

    Result displayAllOrders(String storeName);

    Result showMyOrders();

    Result cancelOrder(Order order);
}
