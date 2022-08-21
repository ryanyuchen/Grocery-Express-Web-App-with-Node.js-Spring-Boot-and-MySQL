package edu.gatech.cs6310.cs6310_summer22_group6.serviceImpl;

import edu.gatech.cs6310.cs6310_summer22_group6.common.Result;
import edu.gatech.cs6310.cs6310_summer22_group6.entity.Pilot;
import edu.gatech.cs6310.cs6310_summer22_group6.exception.Code;
import edu.gatech.cs6310.cs6310_summer22_group6.mapper.PilotMapper;
import edu.gatech.cs6310.cs6310_summer22_group6.service.PilotService;
import edu.gatech.cs6310.cs6310_summer22_group6.utils.CommonUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PilotServiceImpl implements PilotService {

    @Autowired
    private PilotMapper pilotMapper;

    @Override
    public Result addPilot(Pilot pilot) {
        try {
            if (pilotMapper.getPilotByAccount(pilot.getAccount()).size() != 0) {
                return Result.error(Code.CODE_501, "Pilot account already exists");
            }
            if (pilotMapper.getPilotByTaxId(pilot.getTaxId()).size() != 0) {
                return Result.error(Code.CODE_502, "Pilot identifier already exists");
            }
            if (pilotMapper.getPilotByLicenseId(pilot.getLicenseId()).size() != 0) {
                return Result.error(Code.CODE_503, "Pilot license already exists");
            }

            pilot.setAccount(CommonUtils.encrypt(pilot.getAccount()));
            pilot.setFirstName(CommonUtils.encrypt(pilot.getFirstName()));
            pilot.setLastName(CommonUtils.encrypt(pilot.getLastName()));
            pilot.setPhoneNumber(CommonUtils.encrypt(pilot.getPhoneNumber()));
            pilot.setTaxId(CommonUtils.encrypt(pilot.getTaxId()));
            pilot.setLicenseId(CommonUtils.encrypt(pilot.getLicenseId()));
            pilotMapper.addPilot(pilot);

            return Result.success("Pilot added successfully");
        } catch (DataAccessException e) {
            return Result.error(Code.CODE_100, e.getMessage());
        }

    }

    @Override
    public Result displayPilots() {
        List<Pilot> pilots = pilotMapper.getAllPilots();

        for (int i = 0; i < pilots.size(); i++) {
            Pilot pilot = pilots.get(i);
            pilot.setAccount(CommonUtils.decrypt(pilot.getAccount()));
            pilot.setFirstName(CommonUtils.decrypt(pilot.getFirstName()));
            pilot.setLastName(CommonUtils.decrypt(pilot.getLastName()));
            pilot.setPhoneNumber(CommonUtils.decrypt(pilot.getPhoneNumber()));
            pilot.setTaxId(CommonUtils.decrypt(pilot.getTaxId()));
            pilot.setLicenseId(CommonUtils.decrypt(pilot.getLicenseId()));
        }

        return Result.success(pilots);
    }
}
