package com.klef.soa.docker.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.soa.docker.dto.SportsFacilityRequest;
import com.klef.soa.docker.dto.SportsFacilityResponse;
import com.klef.soa.docker.entity.SportsFacility;
import com.klef.soa.docker.exception.ResourceNotFoundException;
import com.klef.soa.docker.repository.SportsFacilityRepository;

@Service
public class SportsFacilityServiceImpl implements SportsFacilityService {

    @Autowired
    private SportsFacilityRepository repo;

    @Override
    public SportsFacilityResponse addSportsFacility(SportsFacilityRequest request) {
        SportsFacility facility = new SportsFacility();

        facility.setFacilityName(request.getFacilityName());
        facility.setSportType(request.getSportType());
        facility.setIndoor(request.getIndoor());
        facility.setHourlyFee(request.getHourlyFee());

        SportsFacility saved = repo.save(facility);

        return new SportsFacilityResponse(saved);
    }

    @Override
    public SportsFacilityResponse updateSportsFacility(Long id, SportsFacilityRequest request) {
        SportsFacility facility = repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Sports Facility ID not found: " + id));

        facility.setFacilityName(request.getFacilityName());
        facility.setSportType(request.getSportType());
        facility.setIndoor(request.getIndoor());
        facility.setHourlyFee(request.getHourlyFee());

        SportsFacility saved = repo.save(facility);

        return new SportsFacilityResponse(saved);
    }

    @Override
    public void deleteSportsFacility(Long id) {
        SportsFacility facility = repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Sports Facility ID not found: " + id));

        repo.delete(facility);
    }

    @Override
    public SportsFacilityResponse displayById(Long id) {
        SportsFacility facility = repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Sports Facility ID not found: " + id));

        return new SportsFacilityResponse(facility);
    }

    @Override
    public List<SportsFacilityResponse> displayAllSportsFacilities() {
        return repo.findAll()
                .stream()
                .map(SportsFacilityResponse::new)
                .toList();
    }
}