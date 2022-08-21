package edu.gatech.cs6310.cs6310_summer22_group6.controller;

import edu.gatech.cs6310.cs6310_summer22_group6.common.Result;
import edu.gatech.cs6310.cs6310_summer22_group6.entity.AngryBird;
import edu.gatech.cs6310.cs6310_summer22_group6.entity.Customer;
import edu.gatech.cs6310.cs6310_summer22_group6.service.AngryBirdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AngryBirdController {

    @Autowired
    private AngryBirdService angryBirdService;

    @PostMapping("/angrybird/input")
    public Result addAngryBird(@RequestBody AngryBird angryBird) {
        return angryBirdService.addAngryBird(angryBird);
    }
}
