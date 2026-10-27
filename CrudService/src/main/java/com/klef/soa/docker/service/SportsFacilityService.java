package com.klef.soa.docker.service;

import java.util.List;

import com.klef.soa.docker.dto.SportsFacilityRequest;
import com.klef.soa.docker.dto.SportsFacilityResponse;

public interface SportsFacilityService {

    SportsFacilityResponse addSportsFacility(SportsFacilityRequest request);

    SportsFacilityResponse updateSportsFacility(Long id, SportsFacilityRequest request);

    void deleteSportsFacility(Long id);

    SportsFacilityResponse displayById(Long id);

    List<SportsFacilityResponse> displayAllSportsFacilities();
}