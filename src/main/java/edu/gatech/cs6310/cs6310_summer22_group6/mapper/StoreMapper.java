package edu.gatech.cs6310.cs6310_summer22_group6.mapper;

import edu.gatech.cs6310.cs6310_summer22_group6.entity.Store;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface StoreMapper {
    @Insert("INSERT into store(store_name, revenue)"
            + "VALUES (#{storeName}, #{revenue})")
    @Options(useGeneratedKeys=true, keyProperty="storeId", keyColumn="store_id")
    int addStore(Store store);

    @Select("SELECT * FROM store WHERE store_name = #{storeName}")
    List<Store> getStoreByName(String storeName);

    @Select("SELECT * FROM store ORDER BY store_name ASC")
    List<Store> getAllStores();

    @Update("UPDATE store SET revenue = #{revenue} WHERE store_id = #{storeId}")
    int updateStore(Store store);
}
