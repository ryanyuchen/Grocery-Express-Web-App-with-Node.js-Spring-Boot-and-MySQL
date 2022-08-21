package edu.gatech.cs6310.cs6310_summer22_group6.controller;

import edu.gatech.cs6310.cs6310_summer22_group6.common.Result;
import edu.gatech.cs6310.cs6310_summer22_group6.entity.Pilot;
import edu.gatech.cs6310.cs6310_summer22_group6.entity.User;
import edu.gatech.cs6310.cs6310_summer22_group6.mapper.PilotMapper;
import edu.gatech.cs6310.cs6310_summer22_group6.service.PilotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PilotController {

    @Autowired
    private PilotService pilotService;

    @PostMapping("/pilot/add")
    public Result addPilot(@RequestBody Pilot pilot){
        return pilotService.addPilot(pilot);
    }

    @GetMapping("/pilot/display")
    public Result displayPilots(){
        return pilotService.displayPilots();
    }
}
