package com.parking.pos.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "parking_lots")
@Data
public class ParkingLot extends Base {

    @Column(name = "name")
    private String name;

    @Column(name = "capacity")
    private int capacity;
}
