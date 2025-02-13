package com.parking.pos.model.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ErrorResponse implements Response {
    private String error;
}
