package com.klef.soa.docker.dto;

import com.klef.soa.docker.entity.SportsFacility;

public class SportsFacilityResponse {

    private Long id;
    private String facilityName;
    private String sportType;
    private Boolean indoor;
    private Double hourlyFee;

    public SportsFacilityResponse(SportsFacility facility) {
        this.id = facility.getId();
        this.facilityName = facility.getFacilityName();
        this.sportType = facility.getSportType();
        this.indoor = facility.getIndoor();
        this.hourlyFee = facility.getHourlyFee();
    }

    public Long getId() {
        return id;
    }

    public String getFacilityName() {
        return facilityName;
    }

    public String getSportType() {
        return sportType;
    }

    public Boolean getIndoor() {
        return indoor;
    }

    public Double getHourlyFee() {
        return hourlyFee;
    }
}