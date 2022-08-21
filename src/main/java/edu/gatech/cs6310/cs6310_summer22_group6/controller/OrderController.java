package edu.gatech.cs6310.cs6310_summer22_group6.controller;

import edu.gatech.cs6310.cs6310_summer22_group6.common.Result;
import edu.gatech.cs6310.cs6310_summer22_group6.entity.Line;
import edu.gatech.cs6310.cs6310_summer22_group6.entity.Order;
import edu.gatech.cs6310.cs6310_summer22_group6.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/order/start")
    @CrossOrigin(origins = "http://localhost:3000")
    public Result startOrder(@RequestBody Order order){
        return orderService.startOrder(order);
    }

    @PostMapping("/item/request")
    @CrossOrigin(origins = "http://localhost:3000")
    public Result requestItem(@RequestBody Line line){
        return orderService.requestItem(line);
    }

    @PostMapping("/order/purchase")
    @CrossOrigin(origins = "http://localhost:3000")
    public Result purchaseOrder(@RequestBody Order order){
        return orderService.purchaseOrder(order);
    }

    @GetMapping("/{storeName}/order")
    @CrossOrigin(origins = "http://localhost:3000")
    public Result displayOrders(@PathVariable String storeName){
        return orderService.displayAllOrders(storeName);
    }

    @GetMapping("/order/inquiry")
    @CrossOrigin(origins = "http://localhost:3000")
    public Result inquiryOrder(){
        return orderService.showMyOrders();
    }

    @PostMapping("/order/cancel")
    @CrossOrigin(origins = "http://localhost:3000")
    public Result cancelOrder(@RequestBody Order order){
        return orderService.cancelOrder(order);
    }
}
