package edu.gatech.cs6310.cs6310_summer22_group6.controller;

import edu.gatech.cs6310.cs6310_summer22_group6.common.Result;
import edu.gatech.cs6310.cs6310_summer22_group6.entity.User;
import edu.gatech.cs6310.cs6310_summer22_group6.mapper.UserMapper;
import edu.gatech.cs6310.cs6310_summer22_group6.service.UserService;
import edu.gatech.cs6310.cs6310_summer22_group6.utils.TokenUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserMapper usermapper;

    @Autowired
    private UserService userService;

    @GetMapping("/user/display")
    @CrossOrigin(origins = "http://localhost:3000")
    public Result displayUsers(){
        return userService.displayUsers();
    }

    /*@PostMapping("/user/add")
    public String addUser(@RequestBody User user){
        return userService.addUser(user);
    }*/

    @PostMapping("/user/login")
    @CrossOrigin(origins = "http://localhost:3000")
    public Result logIn(@RequestBody User user){
        return userService.logIn(user);
    }

    @PostMapping("/user/register")
    @CrossOrigin(origins = "http://localhost:3000")
    public Result register(@RequestBody User user){
        return userService.register(user);
    }

    //@GetMapping("/user/test")
    //public String test(){ return TokenUtils.getCurrentUser().getUsername();}
    @DeleteMapping("/user/delete/{userId}")
    @CrossOrigin(origins = "http://localhost:3000")
    public void delete(@RequestParam String userId){
        userService.deleteUser(userId);
    }

}
