﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using CertificateManagerAPI.Data;

#nullable disable

namespace CertificateManagerAPI.Migrations
{
    [DbContext(typeof(CertificateManagerDbContext))]
    partial class CertificateManagerDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("backend.Models.Certificate", b =>
                {
                    b.Property<int>("CertificateId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("CertificateID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("CertificateId"));

                    b.Property<int>("CertificateTypeId")
                        .HasColumnType("int")
                        .HasColumnName("CertificateTypeID");

                    b.Property<DateTime>("CreatedAt")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime")
                        .HasDefaultValueSql("(getdate())");

                    b.Property<DateTime?>("DeletedAt")
                        .HasColumnType("datetime");

                    b.Property<string>("PdfDocumentUrl")
                        .IsRequired()
                        .HasMaxLength(2048)
                        .HasColumnType("nvarchar(2048)")
                        .HasColumnName("PdfDocumentURL");

                    b.Property<byte[]>("RowVersion")
                        .IsConcurrencyToken()
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("rowversion");

                    b.Property<int>("SupplierId")
                        .HasColumnType("int")
                        .HasColumnName("SupplierID");

                    b.Property<DateTime>("UpdatedAt")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime")
                        .HasDefaultValueSql("(getdate())");

                    b.Property<DateOnly>("ValidFrom")
                        .HasColumnType("date");

                    b.Property<DateOnly>("ValidTo")
                        .HasColumnType("date");

                    b.HasKey("CertificateId")
                        .HasName("PK__Certific__BBF8A7E193AC33B4");

                    b.HasIndex("CertificateTypeId");

                    b.HasIndex("SupplierId");

                    b.ToTable("Certificates");
                });

            modelBuilder.Entity("backend.Models.CertificateAssignment", b =>
                {
                    b.Property<int>("CertificateAssignmentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("CertificateAssignmentID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("CertificateAssignmentId"));

                    b.Property<int>("CertificateId")
                        .HasColumnType("int")
                        .HasColumnName("CertificateID");

                    b.Property<DateTime>("CreatedAt")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime")
                        .HasDefaultValueSql("(getdate())");

                    b.Property<DateTime?>("DeletedAt")
                        .HasColumnType("datetime");

                    b.Property<int>("ParticipantId")
                        .HasColumnType("int")
                        .HasColumnName("ParticipantID");

                    b.Property<byte[]>("RowVersion")
                        .IsConcurrencyToken()
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("rowversion");

                    b.Property<DateTime>("UpdatedAt")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime")
                        .HasDefaultValueSql("(getdate())");

                    b.HasKey("CertificateAssignmentId")
                        .HasName("PK__Certific__C0E318BD1C73635D");

                    b.HasIndex("CertificateId");

                    b.HasIndex("ParticipantId");

                    b.ToTable("CertificateAssignments");
                });

            modelBuilder.Entity("backend.Models.CertificateType", b =>
                {
                    b.Property<int>("CertificateTypeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("CertificateTypeID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("CertificateTypeId"));

                    b.Property<string>("CertificateTypeName")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<DateTime>("CreatedAt")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime")
                        .HasDefaultValueSql("(getdate())");

                    b.Property<DateTime?>("DeletedAt")
                        .HasColumnType("datetime");

                    b.Property<byte[]>("RowVersion")
                        .IsConcurrencyToken()
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("rowversion");

                    b.Property<DateTime>("UpdatedAt")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime")
                        .HasDefaultValueSql("(getdate())");

                    b.HasKey("CertificateTypeId")
                        .HasName("PK__Certific__78F0E8D98089782E");

                    b.ToTable("CertificateTypes");

                    b.HasData(
                        new
                        {
                            CertificateTypeId = 1,
                            CertificateTypeName = "Permission of Printing",
                            CreatedAt = new DateTime(2024, 9, 24, 11, 8, 39, 567, DateTimeKind.Local).AddTicks(1539),
                            UpdatedAt = new DateTime(2024, 9, 24, 11, 8, 39, 567, DateTimeKind.Local).AddTicks(1540)
                        },
                        new
                        {
                            CertificateTypeId = 2,
                            CertificateTypeName = "OHSAS 18001",
                            CreatedAt = new DateTime(2024, 9, 24, 11, 8, 39, 567, DateTimeKind.Local).AddTicks(1542),
                            UpdatedAt = new DateTime(2024, 9, 24, 11, 8, 39, 567, DateTimeKind.Local).AddTicks(1543)
                        });
                });

            modelBuilder.Entity("backend.Models.Comment", b =>
                {
                    b.Property<int>("CommentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("CommentID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("CommentId"));

                    b.Property<int>("CertificateId")
                        .HasColumnType("int")
                        .HasColumnName("CertificateID");

                    b.Property<string>("CommentText")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("CreatedAt")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime")
                        .HasDefaultValueSql("(getdate())");

                    b.Property<DateTime?>("DeletedAt")
                        .HasColumnType("datetime");

                    b.Property<byte[]>("RowVersion")
                        .IsConcurrencyToken()
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("rowversion");

                    b.Property<DateTime>("UpdatedAt")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime")
                        .HasDefaultValueSql("(getdate())");

                    b.Property<int>("UserId")
                        .HasColumnType("int")
                        .HasColumnName("UserID");

                    b.HasKey("CommentId")
                        .HasName("PK__Comments__C3B4DFAA81EA7E70");

                    b.HasIndex("CertificateId");

                    b.HasIndex("UserId");

                    b.ToTable("Comments");
                });

            modelBuilder.Entity("backend.Models.Department", b =>
                {
                    b.Property<int>("DepartmentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("DepartmentID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("DepartmentId"));

                    b.Property<DateTime>("CreatedAt")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime")
                        .HasDefaultValueSql("(getdate())");

                    b.Property<DateTime?>("DeletedAt")
                        .HasColumnType("datetime");

                    b.Property<string>("DepartmentName")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<byte[]>("RowVersion")
                        .IsConcurrencyToken()
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("rowversion");

                    b.Property<DateTime>("UpdatedAt")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime")
                        .HasDefaultValueSql("(getdate())");

                    b.HasKey("DepartmentId")
                        .HasName("PK__Departme__B2079BCD77726975");

                    b.ToTable("Departments");

                    b.HasData(
                        new
                        {
                            DepartmentId = 1,
                            CreatedAt = new DateTime(2024, 9, 24, 11, 8, 39, 567, DateTimeKind.Local).AddTicks(1089),
                            DepartmentName = "HR",
                            UpdatedAt = new DateTime(2024, 9, 24, 11, 8, 39, 567, DateTimeKind.Local).AddTicks(1103)
                        },
                        new
                        {
                            DepartmentId = 2,
                            CreatedAt = new DateTime(2024, 9, 24, 11, 8, 39, 567, DateTimeKind.Local).AddTicks(1106),
                            DepartmentName = "IT",
                            UpdatedAt = new DateTime(2024, 9, 24, 11, 8, 39, 567, DateTimeKind.Local).AddTicks(1106)
                        });
                });

            modelBuilder.Entity("backend.Models.Participant", b =>
                {
                    b.Property<int>("ParticipantId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ParticipantID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ParticipantId"));

                    b.Property<DateTime>("CreatedAt")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime")
                        .HasDefaultValueSql("(getdate())");

                    b.Property<DateTime?>("DeletedAt")
                        .HasColumnType("datetime");

                    b.Property<int>("DepartmentId")
                        .HasColumnType("int")
                        .HasColumnName("DepartmentID");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("Plant")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<byte[]>("RowVersion")
                        .IsConcurrencyToken()
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("rowversion");

                    b.Property<DateTime>("UpdatedAt")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime")
                        .HasDefaultValueSql("(getdate())");

                    b.HasKey("ParticipantId")
                        .HasName("PK__Particip__7227997E79746700");

                    b.HasIndex("DepartmentId");

                    b.ToTable("Participants");

                    b.HasData(
                        new
                        {
                            ParticipantId = 1,
                            CreatedAt = new DateTime(2024, 9, 24, 11, 8, 39, 567, DateTimeKind.Local).AddTicks(1375),
                            DepartmentId = 1,
                            FirstName = "John",
                            LastName = "Doe",
                            Plant = "Plant A",
                            UpdatedAt = new DateTime(2024, 9, 24, 11, 8, 39, 567, DateTimeKind.Local).AddTicks(1377)
                        },
                        new
                        {
                            ParticipantId = 2,
                            CreatedAt = new DateTime(2024, 9, 24, 11, 8, 39, 567, DateTimeKind.Local).AddTicks(1382),
                            DepartmentId = 2,
                            FirstName = "Jane",
                            LastName = "Smith",
                            Plant = "Plant B",
                            UpdatedAt = new DateTime(2024, 9, 24, 11, 8, 39, 567, DateTimeKind.Local).AddTicks(1382)
                        });
                });

            modelBuilder.Entity("backend.Models.Supplier", b =>
                {
                    b.Property<int>("SupplierId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("SupplierID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("SupplierId"));

                    b.Property<string>("City")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<DateTime>("CreatedAt")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime")
                        .HasDefaultValueSql("(getdate())");

                    b.Property<DateTime?>("DeletedAt")
                        .HasColumnType("datetime");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<byte[]>("RowVersion")
                        .IsConcurrencyToken()
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("rowversion");

                    b.Property<int>("SupplierIndex")
                        .HasColumnType("int");

                    b.Property<DateTime>("UpdatedAt")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime")
                        .HasDefaultValueSql("(getdate())");

                    b.HasKey("SupplierId")
                        .HasName("PK__Supplier__4BE66694E3917704");

                    b.ToTable("Suppliers");

                    b.HasData(
                        new
                        {
                            SupplierId = 1,
                            City = "City A",
                            CreatedAt = new DateTime(2024, 9, 24, 11, 8, 39, 567, DateTimeKind.Local).AddTicks(1432),
                            Name = "Supplier One",
                            SupplierIndex = 1001,
                            UpdatedAt = new DateTime(2024, 9, 24, 11, 8, 39, 567, DateTimeKind.Local).AddTicks(1434)
                        },
                        new
                        {
                            SupplierId = 2,
                            City = "City B",
                            CreatedAt = new DateTime(2024, 9, 24, 11, 8, 39, 567, DateTimeKind.Local).AddTicks(1436),
                            Name = "Supplier Two",
                            SupplierIndex = 1002,
                            UpdatedAt = new DateTime(2024, 9, 24, 11, 8, 39, 567, DateTimeKind.Local).AddTicks(1437)
                        });
                });

            modelBuilder.Entity("backend.Models.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("UserID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("UserId"));

                    b.Property<DateTime>("CreatedAt")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime")
                        .HasDefaultValueSql("(getdate())");

                    b.Property<DateTime?>("DeletedAt")
                        .HasColumnType("datetime");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(225)
                        .HasColumnType("nvarchar(225)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(225)
                        .HasColumnType("nvarchar(225)");

                    b.Property<byte[]>("RowVersion")
                        .IsConcurrencyToken()
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("rowversion");

                    b.Property<DateTime>("UpdatedAt")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime")
                        .HasDefaultValueSql("(getdate())");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.HasKey("UserId")
                        .HasName("PK__Users__1788CCAC5B6B3EA7");

                    b.HasIndex(new[] { "Username" }, "UQ__Users__536C85E4CF2B83DF")
                        .IsUnique();

                    b.HasIndex(new[] { "Email" }, "UQ__Users__A9D10534D8CAB45A")
                        .IsUnique();

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            UserId = 1,
                            CreatedAt = new DateTime(2024, 9, 24, 11, 8, 39, 567, DateTimeKind.Local).AddTicks(1483),
                            Email = "jackmangosa@example.com",
                            FirstName = "Jack",
                            LastName = "Mangosa",
                            UpdatedAt = new DateTime(2024, 9, 24, 11, 8, 39, 567, DateTimeKind.Local).AddTicks(1484),
                            Username = "jackmangosa"
                        },
                        new
                        {
                            UserId = 2,
                            CreatedAt = new DateTime(2024, 9, 24, 11, 8, 39, 567, DateTimeKind.Local).AddTicks(1487),
                            Email = "danmangosa@example.com",
                            FirstName = "Dan",
                            LastName = "Mangosa",
                            UpdatedAt = new DateTime(2024, 9, 24, 11, 8, 39, 567, DateTimeKind.Local).AddTicks(1488),
                            Username = "danmangosa"
                        },
                        new
                        {
                            UserId = 3,
                            CreatedAt = new DateTime(2024, 9, 24, 11, 8, 39, 567, DateTimeKind.Local).AddTicks(1490),
                            Email = "cedmangosa@example.com",
                            FirstName = "Ced",
                            LastName = "Mangosa",
                            UpdatedAt = new DateTime(2024, 9, 24, 11, 8, 39, 567, DateTimeKind.Local).AddTicks(1491),
                            Username = "cedmangosa"
                        });
                });

            modelBuilder.Entity("backend.Models.Certificate", b =>
                {
                    b.HasOne("backend.Models.CertificateType", "CertificateType")
                        .WithMany("Certificates")
                        .HasForeignKey("CertificateTypeId")
                        .IsRequired()
                        .HasConstraintName("FK__Certifica__Certi__44FF419A");

                    b.HasOne("backend.Models.Supplier", "Supplier")
                        .WithMany("Certificates")
                        .HasForeignKey("SupplierId")
                        .IsRequired()
                        .HasConstraintName("FK__Certifica__Suppl__440B1D61");

                    b.Navigation("CertificateType");

                    b.Navigation("Supplier");
                });

            modelBuilder.Entity("backend.Models.CertificateAssignment", b =>
                {
                    b.HasOne("backend.Models.Certificate", "Certificate")
                        .WithMany("CertificateAssignments")
                        .HasForeignKey("CertificateId")
                        .IsRequired()
                        .HasConstraintName("FK__Certifica__Certi__4CA06362");

                    b.HasOne("backend.Models.Participant", "Participant")
                        .WithMany("CertificateAssignments")
                        .HasForeignKey("ParticipantId")
                        .IsRequired()
                        .HasConstraintName("FK__Certifica__Parti__4D94879B");

                    b.Navigation("Certificate");

                    b.Navigation("Participant");
                });

            modelBuilder.Entity("backend.Models.Comment", b =>
                {
                    b.HasOne("backend.Models.Certificate", "Certificate")
                        .WithMany("Comments")
                        .HasForeignKey("CertificateId")
                        .IsRequired()
                        .HasConstraintName("FK__Comments__Certif__47DBAE45");

                    b.HasOne("backend.Models.User", "User")
                        .WithMany("Comments")
                        .HasForeignKey("UserId")
                        .IsRequired()
                        .HasConstraintName("FK__Comments__UserID__48CFD27E");

                    b.Navigation("Certificate");

                    b.Navigation("User");
                });

            modelBuilder.Entity("backend.Models.Participant", b =>
                {
                    b.HasOne("backend.Models.Department", "Department")
                        .WithMany("Participants")
                        .HasForeignKey("DepartmentId")
                        .IsRequired()
                        .HasConstraintName("FK__Participa__Depar__398D8EEE");

                    b.Navigation("Department");
                });

            modelBuilder.Entity("backend.Models.Certificate", b =>
                {
                    b.Navigation("CertificateAssignments");

                    b.Navigation("Comments");
                });

            modelBuilder.Entity("backend.Models.CertificateType", b =>
                {
                    b.Navigation("Certificates");
                });

            modelBuilder.Entity("backend.Models.Department", b =>
                {
                    b.Navigation("Participants");
                });

            modelBuilder.Entity("backend.Models.Participant", b =>
                {
                    b.Navigation("CertificateAssignments");
                });

            modelBuilder.Entity("backend.Models.Supplier", b =>
                {
                    b.Navigation("Certificates");
                });

            modelBuilder.Entity("backend.Models.User", b =>
                {
                    b.Navigation("Comments");
                });
#pragma warning restore 612, 618
        }
    }
}
