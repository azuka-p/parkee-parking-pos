package com.parking.pos.model.dto;

import lombok.Data;

@Data
public class TicketInRequest {
    private String plateNumber;

    private String vehicleType;
}
