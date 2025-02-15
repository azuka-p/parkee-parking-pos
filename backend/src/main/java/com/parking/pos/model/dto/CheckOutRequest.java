package com.parking.pos.model.dto;

import lombok.Data;

@Data
public class CheckOutRequest {
    private String plateNumber;

    private String parkingId;

    private String paymentMethod;

    private String voucherCode;
}
