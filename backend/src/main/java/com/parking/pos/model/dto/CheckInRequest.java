package com.parking.pos.model.dto;

import lombok.Data;

@Data
public class CheckInRequest {
    private String plateNumber;

    private String vehicleType;
}
