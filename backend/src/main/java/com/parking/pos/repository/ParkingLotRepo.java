package com.parking.pos.repository;

import com.parking.pos.model.entity.ParkingLot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ParkingLotRepo extends JpaRepository<ParkingLot, String> {
    ParkingLot findByIdAndDeletedAtIsNull(String id);
    boolean existsByCapacityGreaterThan(int min);
    @Modifying
    @Query("UPDATE ParkingLot e SET e.capacity = e.capacity - 1, e.updatedAt = CURRENT_TIMESTAMP WHERE e.id = :id AND e.capacity > 0 AND e.deletedAt IS NULL")
    void decrementCapacity(@Param("id") String id);
}
