
using CertificateManagerAPI.Entities;
using Microsoft.EntityFrameworkCore;

namespace CertificateMangerAPI.Data
{
    public static class DatabaseSeeder
    {
        public static void Seed(ModelBuilder modelBuilder)
        {
            SeedDepartments(modelBuilder);
            SeedParticipants(modelBuilder);
            SeedSuppliers(modelBuilder);
            SeedUsers(modelBuilder);
            SeedCertificateTypes(modelBuilder);
        }

        private static void SeedDepartments(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Department>().HasData(
                new Department { DepartmentId = 1, DepartmentName = "HR", CreatedAt = DateTime.Now, UpdatedAt = DateTime.Now },
                new Department { DepartmentId = 2, DepartmentName = "IT", CreatedAt = DateTime.Now, UpdatedAt = DateTime.Now }
            );
        }

        private static void SeedParticipants(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Participant>().HasData(
                new Participant
                {
                    ParticipantId = 1,
                    FirstName = "John",
                    LastName = "Doe",
                    DepartmentId = 1,
                    Plant = "Plant A",
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                },
                new Participant
                {
                    ParticipantId = 2,
                    FirstName = "Jane",
                    LastName = "Smith",
                    DepartmentId = 2,
                    Plant = "Plant B",
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                }
            );
        }

        private static void SeedSuppliers(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Supplier>().HasData(
                new Supplier
                {
                    SupplierId = 1,
                    Name = "Supplier One",
                    SupplierIndex = 1001,
                    City = "City A",
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                },
                new Supplier
                {
                    SupplierId = 2,
                    Name = "Supplier Two",
                    SupplierIndex = 1002,
                    City = "City B",
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                }
            );
        }

        private static void SeedUsers(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasData(
                new User
                {
                    UserId = 1,
                    Username = "jackmangosa",
                    FirstName = "Jack",
                    LastName = "Mangosa",
                    Email = "jackmangosa@example.com",
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                },
                new User
                {
                    UserId = 2,
                    Username = "danmangosa",
                    FirstName = "Dan",
                    LastName = "Mangosa",
                    Email = "danmangosa@example.com",
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                },
                new User
                {
                    UserId = 3,
                    Username = "cedmangosa",
                    FirstName = "Ced",
                    LastName = "Mangosa",
                    Email = "cedmangosa@example.com",
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                }
            );
        }

        private static void SeedCertificateTypes(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CertificateType>().HasData(
                new CertificateType
                {
                    CertificateTypeId = 1,
                    CertificateTypeName = "Permission of Printing",
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                },
                new CertificateType
                {
                    CertificateTypeId = 2,
                    CertificateTypeName = "OHSAS 18001",
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                }
            );
        }

    }
}