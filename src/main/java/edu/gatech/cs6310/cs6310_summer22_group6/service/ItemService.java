package edu.gatech.cs6310.cs6310_summer22_group6.service;

import edu.gatech.cs6310.cs6310_summer22_group6.common.Result;
import edu.gatech.cs6310.cs6310_summer22_group6.entity.Item;

public interface ItemService {
    Result addItem(Item item);
    Result displayItems(String storeName);
}
