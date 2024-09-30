INSERT INTO CertificateTypes (CertificateTypeName, CreatedAt, DeletedAt, UpdatedAt)
VALUES 
('Permission of Printing', '2024-09-19 16:03:05', NULL, '2024-09-19 16:03:05'),
('OHSAS 18001', '2024-09-19 16:03:05', NULL, '2024-09-19 16:03:05');


INSERT INTO Departments (CreatedAt, DeletedAt, DepartmentName, UpdatedAt)
VALUES 
('2024-09-19 16:03:05', NULL, 'HR', '2024-09-19 16:03:05'),
('2024-09-19 16:03:05', NULL, 'IT', '2024-09-19 16:03:05');


INSERT INTO Suppliers (City, CreatedAt, DeletedAt, Name, SupplierIndex, UpdatedAt)
VALUES 
('City A', '2024-09-19 16:03:05', NULL, 'Supplier One', 1001, '2024-09-19 16:03:05'),
('City B', '2024-09-19 16:03:05', NULL, 'Supplier Two', 1002, '2024-09-19 16:03:05');


INSERT INTO Users (CreatedAt, DeletedAt, Email, FirstName, LastName, UpdatedAt, Username)
VALUES 
('2024-09-19 16:03:05', NULL, 'jackmangosa@example.com', 'Jack', 'Mangosa', '2024-09-19 16:03:05', 'jackmangosa'),
('2024-09-19 16:03:05', NULL, 'danmangosa@example.com', 'Dan', 'Mangosa', '2024-09-19 16:03:05', 'danmangosa'),
('2024-09-19 16:03:05', NULL, 'cedmangosa@example.com', 'Ced', 'Mangosa', '2024-09-19 16:03:05', 'cedmangosa');


INSERT INTO Participants (CreatedAt, DeletedAt, DepartmentID, FirstName, Name, Email, Plant, UpdatedAt)
VALUES 
('2024-09-19 16:03:05', NULL, 1, 'John', 'Doe', 'johndoe@gmail.com', 'Plant A', '2024-09-19 16:03:05'),
('2024-09-19 16:03:05', NULL, 2, 'Jane', 'Smith', 'janesmith@gmail.com', 'Plant B', '2024-09-19 16:03:05');
