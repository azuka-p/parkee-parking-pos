package com.parking.pos.repository;

import com.parking.pos.model.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface TicketRepo extends JpaRepository<Ticket, String> {
    boolean existsByMemberIdAndDeletedAtIsNull(String memberId);
    Ticket findByMemberIdAndParkingLotIdAndDeletedAtIsNull(String memberId, String parkingLotId);
    @Modifying
    @Query("UPDATE Ticket e SET e.price = :price, e.discount = :discount, e.finalPrice = :finalPrice, e.exitTime = :exitTime, e.updatedAt = CURRENT_TIMESTAMP WHERE e.id = :id AND e.deletedAt IS NULL")
    void updatePayTicket(@Param("id") String id, @Param("price") double price, @Param("discount") double discount, @Param("finalPrice") double finalPrice, @Param("exitTime") LocalDateTime exitTime);
    @Modifying
    @Query("UPDATE Ticket e SET e.updatedAt = CURRENT_TIMESTAMP, e.deletedAt = CURRENT_TIMESTAMP WHERE e.id = :id AND e.deletedAt IS NULL")
    void updateNonActive(@Param("id") String id);
}
