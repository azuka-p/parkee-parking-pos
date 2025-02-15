DROP DATABASE IF EXISTS parkee_pos_db;

CREATE DATABASE parkee_pos_db;

\c parkee_pos_db

DROP TABLE IF EXISTS
    tickets,
    members,
    parking_lots;

CREATE TABLE members (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR NOT NULL,
    plate_number VARCHAR NOT NULL,
    vehicle_type VARCHAR NOT NULL,
    expired_date TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP
);

CREATE TABLE parking_lots (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR NOT NULL,
    capacity INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP
);

CREATE TABLE tickets (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    member_id VARCHAR NOT NULL,
    parking_lot_id VARCHAR NOT NULL,
    discount DECIMAL NOT NULL DEFAULT 0,
    price DECIMAL NOT NULL DEFAULT 0,
    final_price DECIMAL NOT NULL DEFAULT 0,
    exit_time TIMESTAMP,
    FOREIGN KEY (member_id) REFERENCES members(id),
    FOREIGN KEY (parking_lot_id) REFERENCES parking_lots(id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP
);

INSERT INTO members(id, name, plate_number, vehicle_type, expired_date) VALUES
    ('be9a19a9-fc8c-46d8-aab3-442181ec0184', 'Adam', 'B 1234 ABC', 'MOBIL', '2025-08-01 00:00:00'),
    ('76657110-494f-434b-8e25-22d4a9a73674', 'Alice', 'B 1234 DEF', 'MOBIL', '2025-09-01 00:00:00'),
    ('22630765-b7d1-435f-a13b-7423d2e1c11d', 'Ben', 'B 1234 GHI', 'MOBIL', '2025-10-01 00:00:00'),
    ('61a13b5e-c50a-4e61-9e76-dad962db47d1', 'Charles', 'B 1234 JKL', 'MOTOR', '2025-11-01 00:00:00'),
    ('6f036d2a-bd38-49c5-8061-468fa6232685', 'Daniel', 'B 1234 MNO', 'MOTOR', '2025-12-01 00:00:00');

INSERT INTO parking_lots(id, name, capacity) VALUES
    ('13310f62-fa0f-4c11-b377-7f24361ab1ea', 'Parking Lot 1', 50);

INSERT INTO tickets(id, member_id, parking_lot_id, created_at, updated_at) VALUES
    ('ccb40e5e-0d73-4b42-8599-6af29c525cb4', 'be9a19a9-fc8c-46d8-aab3-442181ec0184', '13310f62-fa0f-4c11-b377-7f24361ab1ea', '2025-02-13 00:00:00', '2025-02-13 00:00:00'),
    ('332b5a27-b7ba-423e-869b-ef9189fc5bcd', '61a13b5e-c50a-4e61-9e76-dad962db47d1', '13310f62-fa0f-4c11-b377-7f24361ab1ea', '2025-02-14 00:00:00', '2025-02-14 00:00:00');
