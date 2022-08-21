package edu.gatech.cs6310.cs6310_summer22_group6.mapper;

import edu.gatech.cs6310.cs6310_summer22_group6.entity.Item;
import edu.gatech.cs6310.cs6310_summer22_group6.entity.Pilot;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface ItemMapper {

    @Insert("INSERT into item(store_id, item_name, unit_weight, unit_price)"
            + "VALUES (#{storeId}, #{itemName}, #{unitWeight},#{unitPrice})")
    @Options(useGeneratedKeys=true, keyProperty="itemId", keyColumn="item_id")
    int addItem(Item item);

    @Select("SELECT * FROM item WHERE item_name = #{itemName} AND store_id = #{storeId}")
    List<Item> getItemByNameAndStore(String itemName, Integer storeId);

    @Select("SELECT * FROM item WHERE store_id = #{storeId}")
    List<Item> getAllItemsByStoreId(Integer storeId);
}
