package edu.gatech.cs6310.cs6310_summer22_group6.service;

import edu.gatech.cs6310.cs6310_summer22_group6.common.Result;
import edu.gatech.cs6310.cs6310_summer22_group6.entity.Drone;

public interface DroneService {
    Result addDrone(Drone drone);
    Result displayDrone(String storeName);
    Result assignDrone(String storeName, String droneIdentifier, String account);
}
