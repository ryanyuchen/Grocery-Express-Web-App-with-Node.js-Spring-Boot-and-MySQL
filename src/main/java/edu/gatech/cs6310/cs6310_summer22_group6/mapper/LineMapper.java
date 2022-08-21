package edu.gatech.cs6310.cs6310_summer22_group6.mapper;

import edu.gatech.cs6310.cs6310_summer22_group6.entity.Drone;
import edu.gatech.cs6310.cs6310_summer22_group6.entity.Item;
import edu.gatech.cs6310.cs6310_summer22_group6.entity.Line;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Map;

@Mapper
public interface LineMapper {

    @Select("SELECT * FROM line WHERE item_id = #{itemId} AND order_id = #{orderId}")
    List<Item> findItemByNameAndOrderId(Integer itemId, Integer orderId);

    @Insert("INSERT into line(item_id, item_name, quantity, total_cost, total_weight, order_id, order_identifier)"
            + "VALUES (#{itemId}, #{itemName}, #{quantity}, #{totalCost}, #{totalWeight}, #{orderId} , #{orderIdentifier})")
    @Options(useGeneratedKeys=true, keyProperty="lineId", keyColumn="line_id")
    int addLine(Line line);


    @Select("SELECT * FROM line WHERE order_id = #{orderId}")
    List<Line> getAllLines(Integer orderId);
}
