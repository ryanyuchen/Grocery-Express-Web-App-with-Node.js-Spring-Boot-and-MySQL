package edu.gatech.cs6310.cs6310_summer22_group6.serviceImpl;

import edu.gatech.cs6310.cs6310_summer22_group6.exception.Code;
import edu.gatech.cs6310.cs6310_summer22_group6.common.Result;
import edu.gatech.cs6310.cs6310_summer22_group6.entity.User;
import edu.gatech.cs6310.cs6310_summer22_group6.mapper.UserMapper;
import edu.gatech.cs6310.cs6310_summer22_group6.service.UserService;
import edu.gatech.cs6310.cs6310_summer22_group6.utils.TokenUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    /*@Override
    public String addUser(User user){
        //System.out.println(user.getUsername());

        if(userMapper.findUserByUsername(user).size() != 0){
            //System.out.println(userMapper.findUserByUsername(user));
            return "User already exists";
        }
        else{
            userMapper.addUser(user);
            System.out.println(userMapper.findUserByUsername(user));
            return "Success";
        }
    }*/

    @Override
    public Result logIn(User user) {
        if(userMapper.findUserByUsername(user.getUsername()).size() == 0){
            return Result.error(Code.CODE_301, "User does not exist");
        }
        User storedUser = userMapper.findUserByUsername(user.getUsername()).get(0);
        String enteredPassword = user.getPassword();
        String storedPassword = storedUser.getPassword();
        if(enteredPassword.equals(storedPassword)){
            String token = TokenUtils.genToken(storedUser.getUserId().toString(), storedUser.getPassword());
            storedUser.setToken(token);
            return Result.success(storedUser);
        }
        else{
            return Result.error(Code.CODE_302, "Invalid password");
        }
    }

    @Override
    public Result register(User user) {
        if(userMapper.findUserByUsername(user.getUsername()).size() != 0){
            return Result.error(Code.CODE_303, "User already exists");
        }
        else{
            userMapper.addUser(user);
            return Result.success("Registration successful");
        }
    }

    @Override
    public Result displayUsers() {
        return Result.success(userMapper.findAllUsers());
    }

    @Override
    public Result deleteUser(String userId) {
        if(userMapper.findUserById(Integer.parseInt(userId)).size() != 0) {
            userMapper.deleteUserById(Integer.parseInt(userId));
            return Result.success("Registration successful");
        } else {
            return Result.error(Code.CODE_303, "User doesn't exists");
        }
    }
}
