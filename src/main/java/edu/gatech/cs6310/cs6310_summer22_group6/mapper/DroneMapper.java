package edu.gatech.cs6310.cs6310_summer22_group6.mapper;

import edu.gatech.cs6310.cs6310_summer22_group6.entity.Drone;
import org.apache.ibatis.annotations.*;

import java.util.List;
import java.util.Map;

@Mapper
public interface DroneMapper {

    @Insert("INSERT into drone(store_id, drone_identifier, max_capacity, max_trip, remaining_capacity, remaining_trip)"
            + "VALUES (#{storeId}, #{droneIdentifier}, #{maxCapacity}, #{maxTrip}, #{maxCapacity}, #{maxTrip})")
    @Options(useGeneratedKeys=true, keyProperty="droneId", keyColumn="drone_id")
    int addDrone(Drone drone);

    @Select("SELECT * FROM drone WHERE drone_identifier = #{droneIdentifier} AND store_id = #{storeId}")
    List<Drone> getDroneByIdentifierAndStore(String droneIdentifier, Integer storeId);


    @Select("SELECT * FROM drone WHERE store_id = #{storeId}")
    List<Map<String, Object>> getAllDronesByStoreId(Integer storeId);


    @Select("SELECT * FROM drone WHERE pilot_id = #{pilotId}")
    List<Drone> getDroneByPilotId(Integer pilotId);

    @Select("SELECT * FROM drone WHERE drone_id = #{droneId}")
    List<Drone> getDroneByDroneId(Integer droneId);

    @Update("UPDATE drone set pilot_id = NULL WHERE drone_id = #{droneId}")
    int removePilotFromDrone(Integer droneId);

    @Update("UPDATE drone set pilot_id = #{pilotId} WHERE drone_id = #{droneId}")
    int updatePilotOnDrone(Integer pilotId, Integer droneId);

    @Update("UPDATE drone set remaining_capacity = #{remainingCapacity}, remaining_trip = #{remainingTrip},"
            + "num_of_orders = #{numOfOrders} WHERE drone_id = #{droneId}")
    int updateDrone(Drone drone);
}
