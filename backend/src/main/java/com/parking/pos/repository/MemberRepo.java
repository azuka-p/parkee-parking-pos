package com.parking.pos.repository;

import com.parking.pos.model.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepo extends JpaRepository<Member, String> {
    Member findByPlateNumberAndDeletedAtIsNull(String plateNumber);
}
