-- SQLite
DROP TABLE IF EXISTS Users;

CREATE TABLE Users (
    UserID INTEGER PRIMARY KEY AUTOINCREMENT,
    FirstName TEXT NOT NULL,
    LastName TEXT NOT NULL,
    Username TEXT NOT NULL UNIQUE,
    PasswordHash TEXT NOT NULL,
    Email TEXT NOT NULL UNIQUE,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO Users (Username, PasswordHash, Email, FirstName, LastName, CreatedAt)
VALUES
('john_doe', 'passwordjohndoe', 'john.doe@example.com', 'John', 'Doe', '2024-08-21 10:00:00'),
('jane_smith', 'passwordjanesmith', 'jane.smith@example.com', 'Jane', 'Smith', '2024-08-21 10:05:00'),
('michael_brown', 'passwordmichaelbrown', 'michael.brown@example.com', 'Michael', 'Brown', '2024-08-21 10:10:00'),
('lisa_jones', 'passwordlisajones', 'lisa.jones@example.com', 'Lisa', 'Jones', '2024-08-21 10:15:00'),
('robert_williams', 'passwordrobertwilliams', 'robert.williams@example.com', 'Robert', 'Williams', '2024-08-21 10:20:00');
