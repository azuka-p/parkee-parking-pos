package com.parking.pos.model.entity;

import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import java.time.LocalDateTime;

@Data
@MappedSuperclass
public class Base {

    @Id
    @GeneratedValue(generator = "uuid-sequence")
    @GenericGenerator(name = "uuid-sequence", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id", updatable = false, nullable = false)
    protected String id;

    @Column(name = "created_at", insertable = false, updatable = false)
    protected LocalDateTime createdAt;

    @Column(name = "updated_at", insertable = false)
    protected LocalDateTime updatedAt;

    @Column(name = "deleted_at")
    protected LocalDateTime deletedAt;
}
