package com.parking.pos.model.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TicketOutRequest implements Response {
    private String parkingId;
}
