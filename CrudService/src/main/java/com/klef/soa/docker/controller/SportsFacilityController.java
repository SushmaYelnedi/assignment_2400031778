package com.klef.soa.docker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.klef.soa.docker.dto.SportsFacilityRequest;
import com.klef.soa.docker.dto.SportsFacilityResponse;
import com.klef.soa.docker.service.SportsFacilityService;

import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/SportsFacility")
public class SportsFacilityController {

    @Autowired
    private SportsFacilityService service;

    @GetMapping("/")
    public String demo() {
        return "SportsFacility Service is running";
    }

    @PostMapping("/add")
    public ResponseEntity<SportsFacilityResponse> addSportsFacility(
            @Valid @RequestBody SportsFacilityRequest request) {
        SportsFacilityResponse response = service.addSportsFacility(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/displayall")
    public ResponseEntity<List<SportsFacilityResponse>> displayAllSportsFacilities() {
        List<SportsFacilityResponse> facilities = service.displayAllSportsFacilities();
        return ResponseEntity.ok(facilities);
    }

    @GetMapping("/display/{id}")
    public ResponseEntity<SportsFacilityResponse> displayById(@PathVariable Long id) {
        SportsFacilityResponse response = service.displayById(id);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<SportsFacilityResponse> updateSportsFacility(
            @PathVariable Long id,
            @Valid @RequestBody SportsFacilityRequest request) {
        SportsFacilityResponse response = service.updateSportsFacility(id, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteSportsFacility(@PathVariable Long id) {
        service.deleteSportsFacility(id);
        return ResponseEntity.ok("Sports facility deleted successfully");
    }
}