package edu.gatech.cs6310.cs6310_summer22_group6.controller;

import edu.gatech.cs6310.cs6310_summer22_group6.common.Result;
import edu.gatech.cs6310.cs6310_summer22_group6.entity.Item;
import edu.gatech.cs6310.cs6310_summer22_group6.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class ItemController {

    @Autowired
    private ItemService itemService;

    @PostMapping("/item/add")
    public Result addItem(@RequestBody Item item){
        return itemService.addItem(item);
    }

    //display items
    @GetMapping("/store/{storeName}")
    public Result displayItems(@PathVariable String storeName){
        return itemService.displayItems(storeName);
    }
}
