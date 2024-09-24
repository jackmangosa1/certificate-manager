INSERT INTO CertificateTypes (CertificateTypeID, CertificateTypeName, CreatedAt, DeletedAt, UpdatedAt)
VALUES 
(1, 'Permission of Printing', '2024-09-19 16:03:05', NULL, '2024-09-19 16:03:05'),
(2, 'OHSAS 18001', '2024-09-19 16:03:05', NULL, '2024-09-19 16:03:05');


INSERT INTO Departments (DepartmentID, CreatedAt, DeletedAt, DepartmentName, UpdatedAt)
VALUES 
(1, '2024-09-19 16:03:05', NULL, 'HR', '2024-09-19 16:03:05'),
(2, '2024-09-19 16:03:05', NULL, 'IT', '2024-09-19 16:03:05');


INSERT INTO Suppliers (SupplierID, City, CreatedAt, DeletedAt, Name, SupplierIndex, UpdatedAt)
VALUES 
(1, 'City A', '2024-09-19 16:03:05', NULL, 'Supplier One', 1001, '2024-09-19 16:03:05'),
(2, 'City B', '2024-09-19 16:03:05', NULL, 'Supplier Two', 1002, '2024-09-19 16:03:05');


INSERT INTO Users (UserID, CreatedAt, DeletedAt, Email, FirstName, LastName, UpdatedAt, Username)
VALUES 
(1, '2024-09-19 16:03:05', NULL, 'jackmangosa@example.com', 'Jack', 'Mangosa', '2024-09-19 16:03:05', 'jackmangosa'),
(2, '2024-09-19 16:03:05', NULL, 'danmangosa@example.com', 'Dan', 'Mangosa', '2024-09-19 16:03:05', 'danmangosa'),
(3, '2024-09-19 16:03:05', NULL, 'cedmangosa@example.com', 'Ced', 'Mangosa', '2024-09-19 16:03:05', 'cedmangosa');


INSERT INTO Participants (ParticipantID, CreatedAt, DeletedAt, DepartmentID, FirstName, LastName, Plant, UpdatedAt)
VALUES 
(1, '2024-09-19 16:03:05', NULL, 1, 'John', 'Doe', 'Plant A', '2024-09-19 16:03:05'),
(2, '2024-09-19 16:03:05', NULL, 2, 'Jane', 'Smith', 'Plant B', '2024-09-19 16:03:05');
