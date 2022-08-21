package edu.gatech.cs6310.cs6310_summer22_group6.serviceImpl;

import edu.gatech.cs6310.cs6310_summer22_group6.common.Result;
import edu.gatech.cs6310.cs6310_summer22_group6.entity.Store;
import edu.gatech.cs6310.cs6310_summer22_group6.exception.Code;
import edu.gatech.cs6310.cs6310_summer22_group6.mapper.StoreMapper;
import edu.gatech.cs6310.cs6310_summer22_group6.service.StoreService;
import edu.gatech.cs6310.cs6310_summer22_group6.utils.CommonUtils;
import edu.gatech.cs6310.cs6310_summer22_group6.utils.TokenUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

@Service
public class StoreServiceImpl implements StoreService {

    @Autowired
    private StoreMapper storeMapper;

    @Override
    public Result addStore(Store store) {
        try {
            if (storeMapper.getStoreByName(store.getStoreName()).size() != 0) {
                return Result.error(Code.CODE_601, "Store already exists");
            } else {
                storeMapper.addStore(store);
                return Result.success("Store added successfully");
            }
        } catch (DataAccessException e) {
            return Result.error(Code.CODE_100, e.getMessage());
        }
    }

    public Result displayStores(){
        return Result.success(storeMapper.getAllStores());
    }
}
