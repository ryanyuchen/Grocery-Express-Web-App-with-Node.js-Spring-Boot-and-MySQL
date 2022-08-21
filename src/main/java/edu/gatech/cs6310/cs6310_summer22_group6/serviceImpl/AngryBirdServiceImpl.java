package edu.gatech.cs6310.cs6310_summer22_group6.serviceImpl;

import edu.gatech.cs6310.cs6310_summer22_group6.common.Result;
import edu.gatech.cs6310.cs6310_summer22_group6.entity.AngryBird;
import edu.gatech.cs6310.cs6310_summer22_group6.exception.Code;
import edu.gatech.cs6310.cs6310_summer22_group6.mapper.AngryBirdMapper;
import edu.gatech.cs6310.cs6310_summer22_group6.service.AngryBirdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AngryBirdServiceImpl implements AngryBirdService {

    @Autowired
    private AngryBirdMapper angryBirdMapper;

    @Override
    public Result addAngryBird(AngryBird angryBird) {
        if(angryBird.getProbability() > 1){
            return Result.error(Code.CODE_1001, "Probability should be < 1");
        }
        if(angryBird.getTotalBirds() < 0){
            return Result.error(Code.CODE_1001, "Total birds should be > 0");
        }
        if(angryBirdMapper.getAngryBirdParameters().size() != 0){
            angryBirdMapper.updateAngryBirdParameters(angryBird);
        }
        else{
            angryBirdMapper.addAngryBirdParameters(angryBird);
        }
        return Result.success("Angry bird parameters updated successfully");
    }
}
