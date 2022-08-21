package edu.gatech.cs6310.cs6310_summer22_group6.controller;

import edu.gatech.cs6310.cs6310_summer22_group6.common.Result;
import edu.gatech.cs6310.cs6310_summer22_group6.entity.Drone;
import edu.gatech.cs6310.cs6310_summer22_group6.service.DroneService;
import edu.gatech.cs6310.cs6310_summer22_group6.utils.TokenUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class DroneController {

    @Autowired
    private DroneService droneService;

    @PostMapping("/drone/add")
    public Result addDrone(@RequestBody Drone drone){
        TokenUtils.checkAuthorization(1);
        return droneService.addDrone(drone);
    }

    @GetMapping("/{storeName}/drone")
    public Result displayDrones(@PathVariable String storeName){
        TokenUtils.checkAuthorization(2);
        return droneService.displayDrone(storeName);
    }

    @PostMapping("/drone/assign")
    public Result flyDrone(@RequestParam String storeName, @RequestParam String droneIdentifier,  @RequestParam String account){
        return droneService.assignDrone(storeName, droneIdentifier, account);
    }
}
