package com.parking.pos.service;

import com.parking.pos.model.entity.Member;

public interface MemberService {
    Member checkIn(String plateNumber, String vehicleType);
}
