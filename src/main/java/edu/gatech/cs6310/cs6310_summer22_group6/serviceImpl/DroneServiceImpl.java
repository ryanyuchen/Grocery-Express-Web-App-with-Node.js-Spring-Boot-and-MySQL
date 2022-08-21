package edu.gatech.cs6310.cs6310_summer22_group6.serviceImpl;

import edu.gatech.cs6310.cs6310_summer22_group6.common.Result;
import edu.gatech.cs6310.cs6310_summer22_group6.entity.Drone;
import edu.gatech.cs6310.cs6310_summer22_group6.entity.Pilot;
import edu.gatech.cs6310.cs6310_summer22_group6.exception.Code;
import edu.gatech.cs6310.cs6310_summer22_group6.mapper.DroneMapper;
import edu.gatech.cs6310.cs6310_summer22_group6.mapper.PilotMapper;
import edu.gatech.cs6310.cs6310_summer22_group6.service.DroneService;
import edu.gatech.cs6310.cs6310_summer22_group6.utils.CommonUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class DroneServiceImpl implements DroneService {

    @Autowired
    private DroneMapper droneMapper;

    @Autowired
    private PilotMapper pilotMapper;

    @Override
    public Result addDrone(Drone drone) {
        try {
            drone.setRemainingCapacity(drone.getMaxCapacity());
            drone.setRemainingTrip(drone.getMaxTrip());
            Integer storeId = CommonUtils.getStoreIdByName(drone.getStoreName());
            drone.setStoreId(storeId);
            if (droneMapper.getDroneByIdentifierAndStore(drone.getDroneIdentifier(), storeId).size() != 0) {
                return Result.error(Code.CODE_701, "Drone already exists");
            }
            droneMapper.addDrone(drone);
            return Result.success("Drone added successfully");
        } catch (DataAccessException e) {
            return Result.error(Code.CODE_100, e.getMessage());
        }
    }

    @Override
    public Result displayDrone(String storeName) {
        try {
            Integer storeId = CommonUtils.getStoreIdByName(storeName);
            List<Map<String, Object>> res = droneMapper.getAllDronesByStoreId(storeId);
            for (Map<String, Object> droneInfo : res) {
                Integer pilotId = (Integer) droneInfo.get("pilot_id");
                if (pilotId != null) {
                    Pilot pilot = pilotMapper.getPilotById(pilotId).get(0);
                    String pFirstName = CommonUtils.decrypt(pilot.getFirstName());
                    String pLastName = CommonUtils.decrypt(pilot.getLastName());
                    droneInfo.put("flown_by", pFirstName + " " + pLastName);
                }
            }
            return Result.success(res);
        } catch (DataAccessException e) {
            return Result.error(Code.CODE_100, e.getMessage());
        }

    }

    @Override
    public Result assignDrone(String storeName, String droneIdentifier, String account) {
        try {
            Integer storeId = CommonUtils.getStoreIdByName(storeName);
            if (droneMapper.getDroneByIdentifierAndStore(droneIdentifier, storeId).size() == 0) {
                return Result.error(Code.CODE_702, "Drone does not exist");
            }
            Drone drone = droneMapper.getDroneByIdentifierAndStore(droneIdentifier, storeId).get(0);

            String accountEncrypt = CommonUtils.encrypt(account);
            if (pilotMapper.getPilotByAccount(accountEncrypt).size() == 0) {
                return Result.error(Code.CODE_504, "Pilot does not exist");
            }
            Pilot pilot = pilotMapper.getPilotByAccount(accountEncrypt).get(0);
            Integer pilotId = pilot.getPilotId();
            if (droneMapper.getDroneByPilotId(pilotId).size() != 0) {
                Drone previousDrone = droneMapper.getDroneByPilotId(pilotId).get(0);
                droneMapper.removePilotFromDrone(previousDrone.getDroneId());
            }
            droneMapper.updatePilotOnDrone(pilotId, drone.getDroneId());
            return Result.success("Pilot assigned to drone successfully");
        } catch (DataAccessException e) {
            return Result.error(Code.CODE_100, e.getMessage());
        }

    }


}
