package edu.gatech.cs6310.cs6310_summer22_group6.mapper;

import edu.gatech.cs6310.cs6310_summer22_group6.entity.Customer;
import edu.gatech.cs6310.cs6310_summer22_group6.entity.Pilot;
import edu.gatech.cs6310.cs6310_summer22_group6.entity.Store;
import edu.gatech.cs6310.cs6310_summer22_group6.entity.User;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface PilotMapper {
    @Insert("INSERT into pilot(account, first_name, last_name, phone_number, tax_id, license_id, experience)"
            + "VALUES (#{account}, #{firstName}, #{lastName}, #{phoneNumber}, #{taxId}, #{licenseId}, #{experience})")
    @Options(useGeneratedKeys=true, keyProperty="pilotId", keyColumn="pilot_id")
    int addPilot(Pilot pilot);

    @Select("SELECT * FROM pilot WHERE pilot_id = #{pilotId}")
    List<Pilot> getPilotById(Integer pilotId);

    @Select("SELECT * FROM pilot WHERE account = #{account}")
    List<Pilot> getPilotByAccount(String account);

    @Select("SELECT * FROM pilot WHERE tax_id = #{taxId}")
    List<Pilot> getPilotByTaxId(String taxId);

    @Select("SELECT * FROM pilot WHERE license_id = #{licenseId}")
    List<Pilot> getPilotByLicenseId(String licenseId);

    @Select("SELECT * FROM pilot ORDER BY account ASC")
    List<Pilot> getAllPilots();

    @Update("UPDATE pilot SET experience = #{experience}  WHERE pilot_id = #{pilotId}")
    int updatePilot(Pilot pilot);





}
