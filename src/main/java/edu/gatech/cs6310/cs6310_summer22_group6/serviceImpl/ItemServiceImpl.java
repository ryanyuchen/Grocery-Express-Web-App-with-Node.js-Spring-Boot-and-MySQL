package edu.gatech.cs6310.cs6310_summer22_group6.serviceImpl;

import edu.gatech.cs6310.cs6310_summer22_group6.common.Result;
import edu.gatech.cs6310.cs6310_summer22_group6.entity.Item;
import edu.gatech.cs6310.cs6310_summer22_group6.exception.Code;
import edu.gatech.cs6310.cs6310_summer22_group6.mapper.ItemMapper;
import edu.gatech.cs6310.cs6310_summer22_group6.service.ItemService;
import edu.gatech.cs6310.cs6310_summer22_group6.utils.CommonUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

@Service
public class ItemServiceImpl implements ItemService {

    @Autowired
    private ItemMapper itemMapper;

    @Override
    public Result addItem(Item item) {
        try{
            Integer storeId = CommonUtils.getStoreIdByName(item.getStoreName());
            item.setStoreId(storeId);
            if(itemMapper.getItemByNameAndStore(item.getItemName(), storeId).size() != 0){
                return Result.error(Code.CODE_901, "Item already exists");
            }
            itemMapper.addItem(item);
            return Result.success("Item added successfully");
        }
        catch (DataAccessException e) {
            return Result.error(Code.CODE_100, e.getMessage());
        }
    }

    @Override
    public Result displayItems(String storeName) {
        try{
            Integer storeId = CommonUtils.getStoreIdByName(storeName);
            return Result.success(itemMapper.getAllItemsByStoreId(storeId));
        }
        catch (DataAccessException e) {
            return Result.error(Code.CODE_100, e.getMessage());
        }

    }
}
