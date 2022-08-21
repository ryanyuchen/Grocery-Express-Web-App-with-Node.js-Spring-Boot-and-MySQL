package edu.gatech.cs6310.cs6310_summer22_group6.service;

import edu.gatech.cs6310.cs6310_summer22_group6.common.Result;
import edu.gatech.cs6310.cs6310_summer22_group6.entity.User;

public interface UserService {
    //String addUser(User user);

    Result logIn(User user);

    Result register(User user);

    Result displayUsers();

    Result deleteUser(String userId);
}
