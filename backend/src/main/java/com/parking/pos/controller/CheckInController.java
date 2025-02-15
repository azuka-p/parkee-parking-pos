package com.parking.pos.controller;

import com.parking.pos.model.dto.*;
import com.parking.pos.model.entity.Member;
import com.parking.pos.model.entity.Ticket;
import com.parking.pos.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.temporal.ChronoUnit;

@RestController
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin(origins = "*")
public class CheckInController {

    @Autowired
    private MemberService memberService;

    @PostMapping("/check-in")
    public ResponseEntity<Response> checkIn(@RequestBody CheckInRequest request) {
        try {
            Member member = memberService.checkIn(request.getPlateNumber(), request.getVehicleType());
            CheckInResponse response = CheckInResponse.builder()
                    .vehicleType(member.getVehicleType())
                    .name(member.getName())
                    .expiredDate(member.getExpiredDate())
                    .build();

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(ErrorResponse.builder().error(e.getMessage()).build(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/ticket-in")
    public ResponseEntity<Response> ticketIn(@RequestBody TicketInRequest request) {
        try {
            Ticket ticket = memberService.ticketIn(request.getPlateNumber(), request.getVehicleType());
            System.out.printf("Print ticket %s for member %s", ticket.getId(), ticket.getMember().getId());

            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(ErrorResponse.builder().error(e.getMessage()).build(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/check-out")
    public ResponseEntity<Response> checkOut(@RequestBody CheckOutRequest request) {
        try {
            Ticket ticket = memberService.checkOut(request.getPlateNumber(), request.getParkingId(), request.getVoucherCode());
            CheckOutResponse response = CheckOutResponse.builder()
                    .name(ticket.getMember().getName())
                    .vehicleType(ticket.getMember().getVehicleType())
                    .expiredDate(ticket.getMember().getExpiredDate())
                    .entryTime(ticket.getCreatedAt())
                    .exitTime(ticket.getExitTime())
                    .duration(ticket.getCreatedAt().until(ticket.getExitTime(), ChronoUnit.MINUTES))
                    .price(String.valueOf(ticket.getPrice()))
                    .discount(String.valueOf(ticket.getDiscount()))
                    .finalPrice(String.valueOf(ticket.getFinalPrice()))
                    .build();

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(ErrorResponse.builder().error(e.getMessage()).build(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/ticket-out")
    public ResponseEntity<Response> ticketOut(@RequestBody TicketOutRequest request) {
        try {
            Ticket ticket = memberService.ticketOut(request.getParkingId());
            System.out.printf("Print ticket %s for member %s", ticket.getId(), ticket.getMember().getId());

            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(ErrorResponse.builder().error(e.getMessage()).build(), HttpStatus.BAD_REQUEST);
        }
    }
}
