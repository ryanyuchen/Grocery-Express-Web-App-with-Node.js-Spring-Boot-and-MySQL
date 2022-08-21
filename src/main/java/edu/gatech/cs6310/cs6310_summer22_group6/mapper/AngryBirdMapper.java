package edu.gatech.cs6310.cs6310_summer22_group6.mapper;

import edu.gatech.cs6310.cs6310_summer22_group6.entity.AngryBird;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface AngryBirdMapper {
    @Select("SELECT * FROM angrybird")
    List<AngryBird> getAngryBirdParameters();

    @Update("UPDATE angrybird SET total_birds = #{totalBirds}, probability = #{probability}")
    int updateAngryBirdParameters(AngryBird angryBird);

    @Insert("INSERT into angrybirds(total_birds, probability) VALUES (#{totalBirds}, #{probability})")
    int addAngryBirdParameters(AngryBird angryBird);
}
