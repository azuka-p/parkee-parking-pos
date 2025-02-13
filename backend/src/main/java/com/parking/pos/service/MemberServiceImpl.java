package com.parking.pos.service;

import com.parking.pos.model.entity.Member;
import com.parking.pos.repository.MemberRepo;
import io.micrometer.common.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class MemberServiceImpl implements MemberService {
    @Autowired
    private MemberRepo memberRepo;

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
}
