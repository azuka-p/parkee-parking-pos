package com.parking.pos.controller;

import com.parking.pos.model.dto.CheckInRequest;
import com.parking.pos.model.dto.CheckInResponse;
import com.parking.pos.model.dto.ErrorResponse;
import com.parking.pos.model.dto.Response;
import com.parking.pos.model.entity.Member;
import com.parking.pos.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE)
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
}
