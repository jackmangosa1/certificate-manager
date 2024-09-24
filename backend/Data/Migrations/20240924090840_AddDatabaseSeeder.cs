using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CertificateManagerAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddDatabaseSeeder : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "CertificateTypes",
                columns: new[] { "CertificateTypeID", "CertificateTypeName", "CreatedAt", "DeletedAt", "UpdatedAt" },
                values: new object[,]
                {
                    { 1, "Permission of Printing", new DateTime(2024, 9, 24, 11, 8, 39, 567, DateTimeKind.Local).AddTicks(1539), null, new DateTime(2024, 9, 24, 11, 8, 39, 567, DateTimeKind.Local).AddTicks(1540) },
                    { 2, "OHSAS 18001", new DateTime(2024, 9, 24, 11, 8, 39, 567, DateTimeKind.Local).AddTicks(1542), null, new DateTime(2024, 9, 24, 11, 8, 39, 567, DateTimeKind.Local).AddTicks(1543) }
                });

            migrationBuilder.InsertData(
                table: "Departments",
                columns: new[] { "DepartmentID", "CreatedAt", "DeletedAt", "DepartmentName", "UpdatedAt" },
                values: new object[,]
                {
                    { 1, new DateTime(2024, 9, 24, 11, 8, 39, 567, DateTimeKind.Local).AddTicks(1089), null, "HR", new DateTime(2024, 9, 24, 11, 8, 39, 567, DateTimeKind.Local).AddTicks(1103) },
                    { 2, new DateTime(2024, 9, 24, 11, 8, 39, 567, DateTimeKind.Local).AddTicks(1106), null, "IT", new DateTime(2024, 9, 24, 11, 8, 39, 567, DateTimeKind.Local).AddTicks(1106) }
                });

            migrationBuilder.InsertData(
                table: "Suppliers",
                columns: new[] { "SupplierID", "City", "CreatedAt", "DeletedAt", "Name", "SupplierIndex", "UpdatedAt" },
                values: new object[,]
                {
                    { 1, "City A", new DateTime(2024, 9, 24, 11, 8, 39, 567, DateTimeKind.Local).AddTicks(1432), null, "Supplier One", 1001, new DateTime(2024, 9, 24, 11, 8, 39, 567, DateTimeKind.Local).AddTicks(1434) },
                    { 2, "City B", new DateTime(2024, 9, 24, 11, 8, 39, 567, DateTimeKind.Local).AddTicks(1436), null, "Supplier Two", 1002, new DateTime(2024, 9, 24, 11, 8, 39, 567, DateTimeKind.Local).AddTicks(1437) }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserID", "CreatedAt", "DeletedAt", "Email", "FirstName", "LastName", "UpdatedAt", "Username" },
                values: new object[,]
                {
                    { 1, new DateTime(2024, 9, 24, 11, 8, 39, 567, DateTimeKind.Local).AddTicks(1483), null, "jackmangosa@example.com", "Jack", "Mangosa", new DateTime(2024, 9, 24, 11, 8, 39, 567, DateTimeKind.Local).AddTicks(1484), "jackmangosa" },
                    { 2, new DateTime(2024, 9, 24, 11, 8, 39, 567, DateTimeKind.Local).AddTicks(1487), null, "danmangosa@example.com", "Dan", "Mangosa", new DateTime(2024, 9, 24, 11, 8, 39, 567, DateTimeKind.Local).AddTicks(1488), "danmangosa" },
                    { 3, new DateTime(2024, 9, 24, 11, 8, 39, 567, DateTimeKind.Local).AddTicks(1490), null, "cedmangosa@example.com", "Ced", "Mangosa", new DateTime(2024, 9, 24, 11, 8, 39, 567, DateTimeKind.Local).AddTicks(1491), "cedmangosa" }
                });

            migrationBuilder.InsertData(
                table: "Participants",
                columns: new[] { "ParticipantID", "CreatedAt", "DeletedAt", "DepartmentID", "FirstName", "LastName", "Plant", "UpdatedAt" },
                values: new object[,]
                {
                    { 1, new DateTime(2024, 9, 24, 11, 8, 39, 567, DateTimeKind.Local).AddTicks(1375), null, 1, "John", "Doe", "Plant A", new DateTime(2024, 9, 24, 11, 8, 39, 567, DateTimeKind.Local).AddTicks(1377) },
                    { 2, new DateTime(2024, 9, 24, 11, 8, 39, 567, DateTimeKind.Local).AddTicks(1382), null, 2, "Jane", "Smith", "Plant B", new DateTime(2024, 9, 24, 11, 8, 39, 567, DateTimeKind.Local).AddTicks(1382) }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "CertificateTypes",
                keyColumn: "CertificateTypeID",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "CertificateTypes",
                keyColumn: "CertificateTypeID",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Participants",
                keyColumn: "ParticipantID",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Participants",
                keyColumn: "ParticipantID",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Suppliers",
                keyColumn: "SupplierID",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Suppliers",
                keyColumn: "SupplierID",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "UserID",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "UserID",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "UserID",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Departments",
                keyColumn: "DepartmentID",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Departments",
                keyColumn: "DepartmentID",
                keyValue: 2);
        }
    }
}
