package com.parking.pos.service;

import com.parking.pos.model.entity.Member;
import com.parking.pos.model.entity.ParkingLot;
import com.parking.pos.model.entity.Ticket;
import com.parking.pos.repository.MemberRepo;
import com.parking.pos.repository.ParkingLotRepo;
import com.parking.pos.repository.TicketRepo;
import io.micrometer.common.util.StringUtils;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Objects;

@Service
public class MemberServiceImpl implements MemberService {
    @Autowired
    private MemberRepo memberRepo;

    @Autowired
    private TicketRepo ticketRepo;

    @Autowired
    private ParkingLotRepo parkingLotRepo;

    private final String defaultParkingLot = "13310f62-fa0f-4c11-b377-7f24361ab1ea";

    @Override
    public Member checkIn(String plateNumber, String vehicleType) {
        if (StringUtils.isBlank(plateNumber)) {
            throw new RuntimeException("plate number is blank");
        }
        Member member = memberRepo.findByPlateNumberAndDeletedAtIsNull(plateNumber);

        if (Objects.isNull(member)) {
            throw new RuntimeException("member is not found");
        }
        return member;
    }

    @Transactional
    public Ticket ticketCreation(Member member, ParkingLot parkingLot) {
        // check if active ticket with said member exist
        boolean exist = ticketRepo.existsByMemberIdAndDeletedAtIsNull(member.getId());
        if (exist) {
            throw new RuntimeException("vehicle with the same plate is parked");
        }

        // check if parking lot has available space
        boolean available = parkingLotRepo.existsByCapacityGreaterThan(0);
        if (!available) {
            throw new RuntimeException("parking lot is full");
        }

        // create ticket
        Ticket ticket = new Ticket();
        ticket.setMember(member);
        ticket.setParkingLot(parkingLot);
        ticketRepo.save(ticket);

        // decrement parking lot capacity by one
        parkingLotRepo.decrementCapacity(parkingLot.getId());

        return ticket;
    }

    @Override
    @Transactional
    public Ticket ticketIn(String plateNumber, String vehicleType) {
        if (StringUtils.isBlank(plateNumber)) {
            throw new RuntimeException("plate number is blank");
        }

        Member member = memberRepo.findByPlateNumberAndDeletedAtIsNull(plateNumber);
        if (Objects.isNull(member)) {
            throw new RuntimeException("member is not found");
        }

        ParkingLot parkingLot = parkingLotRepo.findByIdAndDeletedAtIsNull(defaultParkingLot);
        if (Objects.isNull(parkingLot)) {
            throw new RuntimeException("parking lot is not found");
        }

        return ticketCreation(member, parkingLot);
    }
}
