package com.klef.soa.docker.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "SportsFacility_Table")
public class SportsFacility {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sfid")
    private Long id;

    @Column(name = "sfacilityName", length = 100, nullable = false)
    private String facilityName;

    @Column(name = "ssportType", length = 100, nullable = false)
    private String sportType;

    @Column(name = "sindoor", nullable = false)
    private Boolean indoor;

    @Column(name = "shourlyFee", nullable = false)
    private Double hourlyFee;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFacilityName() {
        return facilityName;
    }

    public void setFacilityName(String facilityName) {
        this.facilityName = facilityName;
    }

    public String getSportType() {
        return sportType;
    }

    public void setSportType(String sportType) {
        this.sportType = sportType;
    }

    public Boolean getIndoor() {
        return indoor;
    }

    public void setIndoor(Boolean indoor) {
        this.indoor = indoor;
    }

    public Double getHourlyFee() {
        return hourlyFee;
    }

    public void setHourlyFee(Double hourlyFee) {
        this.hourlyFee = hourlyFee;
    }

    @Override
    public String toString() {
        return "SportsFacility [id=" + id + ", facilityName=" + facilityName
                + ", sportType=" + sportType + ", indoor=" + indoor
                + ", hourlyFee=" + hourlyFee + "]";
    }
}