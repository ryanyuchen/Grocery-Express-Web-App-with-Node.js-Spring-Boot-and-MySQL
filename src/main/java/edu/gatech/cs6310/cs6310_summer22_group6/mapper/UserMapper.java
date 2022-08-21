package edu.gatech.cs6310.cs6310_summer22_group6.mapper;

import edu.gatech.cs6310.cs6310_summer22_group6.entity.User;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface UserMapper {

    @Select("SELECT * FROM user")
    List<User> findAllUsers();

    @Insert("INSERT into user(username, password, role) VALUES (#{username}, #{password}, #{role})")
    @Options(useGeneratedKeys=true, keyProperty="userId", keyColumn="user_id")
    int addUser(User user);

    @Select("SELECT * FROM user WHERE username = #{username}")
    List<User> findUserByUsername(String userName);

    @Select("SELECT * FROM user WHERE user_id = #{userId}")
    List<User> findUserById(Integer userId);

    @Delete("DELETE FROM user WHERE user_id = #{userId}")
    List<User> deleteUserById(Integer userId);
}
