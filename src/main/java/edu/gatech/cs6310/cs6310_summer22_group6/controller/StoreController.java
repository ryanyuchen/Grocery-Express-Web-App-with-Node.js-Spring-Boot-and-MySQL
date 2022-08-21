package edu.gatech.cs6310.cs6310_summer22_group6.controller;

import edu.gatech.cs6310.cs6310_summer22_group6.common.Result;
import edu.gatech.cs6310.cs6310_summer22_group6.entity.Store;
import edu.gatech.cs6310.cs6310_summer22_group6.service.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StoreController {

    @Autowired
    private StoreService storeService;

    @PostMapping("/store/add")
    public Result addStore(@RequestBody Store store){
        return storeService.addStore(store);
    }

    @GetMapping("/store/display")
    public Result displayStores(){
        return storeService.displayStores();
    }
}
