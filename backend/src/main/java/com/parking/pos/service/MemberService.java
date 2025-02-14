package com.parking.pos.service;

import com.parking.pos.model.entity.Member;
import com.parking.pos.model.entity.Ticket;

public interface MemberService {
    Member checkIn(String plateNumber, String vehicleType);
    Ticket ticketIn(String plateNumber, String vehicleType);
}
