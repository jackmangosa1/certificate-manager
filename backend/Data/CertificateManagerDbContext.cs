﻿using CertificateManagerAPI.Entities;
using Microsoft.EntityFrameworkCore;

namespace CertificateManagerAPI.Data;

public partial class CertificateManagerDbContext : DbContext
{
    public CertificateManagerDbContext()
    {
    }

    public CertificateManagerDbContext(DbContextOptions<CertificateManagerDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Certificate> Certificates { get; set; }

    public virtual DbSet<CertificateAssignment> CertificateAssignments { get; set; }

    public virtual DbSet<CertificateType> CertificateTypes { get; set; }

    public virtual DbSet<Comment> Comments { get; set; }

    public virtual DbSet<Department> Departments { get; set; }

    public virtual DbSet<Participant> Participants { get; set; }

    public virtual DbSet<Supplier> Suppliers { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Certificate>(entity =>
        {
            entity.Property(e => e.CertificateId).HasColumnName("CertificateID");
            entity.Property(e => e.CertificateTypeId).HasColumnName("CertificateTypeID");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.DeletedAt).HasColumnType("datetime");
            entity.Property(e => e.RowVersion)
                .IsRowVersion()
                .IsConcurrencyToken();
            entity.Property(e => e.SupplierId).HasColumnName("SupplierID");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");

            entity.HasOne(d => d.CertificateType).WithMany(p => p.Certificates)
                .HasForeignKey(d => d.CertificateTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Certificates_CertificateTypeID");

            entity.HasOne(d => d.Supplier).WithMany(p => p.Certificates)
                .HasForeignKey(d => d.SupplierId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Certificates_SupplierID");
        });

        modelBuilder.Entity<CertificateAssignment>(entity =>
        {
            entity.HasKey(e => e.CertificateAssignmentId).HasName("PK__CertificateAssignments");

            entity.Property(e => e.CertificateAssignmentId).HasColumnName("CertificateAssignmentID");
            entity.Property(e => e.CertificateId).HasColumnName("CertificateID");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.DeletedAt).HasColumnType("datetime");
            entity.Property(e => e.ParticipantId).HasColumnName("ParticipantID");
            entity.Property(e => e.RowVersion)
                .IsRowVersion()
                .IsConcurrencyToken();
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");

            entity.HasOne(d => d.Certificate).WithMany(p => p.CertificateAssignments)
                .HasForeignKey(d => d.CertificateId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__CertificateAssignments__CertificateID");

            entity.HasOne(d => d.Participant).WithMany(p => p.CertificateAssignments)
                .HasForeignKey(d => d.ParticipantId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__CertificateAssignments__ParticipantID");
        });

        modelBuilder.Entity<CertificateType>(entity =>
        {
            entity.HasKey(e => e.CertificateTypeId).HasName("PK__CertificateTypes");

            entity.Property(e => e.CertificateTypeId).HasColumnName("CertificateTypeID");
            entity.Property(e => e.CertificateTypeName).HasMaxLength(255);
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.DeletedAt).HasColumnType("datetime");
            entity.Property(e => e.RowVersion)
                .IsRowVersion()
                .IsConcurrencyToken();
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
        });

        modelBuilder.Entity<Comment>(entity =>
        {
            entity.HasKey(e => e.CommentId).HasName("PK__Comments");

            entity.Property(e => e.CommentId).HasColumnName("CommentID");
            entity.Property(e => e.CertificateId).HasColumnName("CertificateID");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.DeletedAt).HasColumnType("datetime");
            entity.Property(e => e.RowVersion)
                .IsRowVersion()
                .IsConcurrencyToken();
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.Certificate).WithMany(p => p.Comments)
                .HasForeignKey(d => d.CertificateId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Comments__CertificateID");

            entity.HasOne(d => d.User).WithMany(p => p.Comments)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Comments__UserID");
        });

        modelBuilder.Entity<Department>(entity =>
        {
            entity.HasKey(e => e.DepartmentId).HasName("PK__Departments");

            entity.Property(e => e.DepartmentId).HasColumnName("DepartmentID");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.DeletedAt).HasColumnType("datetime");
            entity.Property(e => e.DepartmentName).HasMaxLength(255);
            entity.Property(e => e.RowVersion)
                .IsRowVersion()
                .IsConcurrencyToken();
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
        });

        modelBuilder.Entity<Participant>(entity =>
        {
            entity.HasKey(e => e.ParticipantId).HasName("PK__Participants");

            entity.Property(e => e.ParticipantId).HasColumnName("ParticipantID");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.DeletedAt).HasColumnType("datetime");
            entity.Property(e => e.DepartmentId).HasColumnName("DepartmentID");
            entity.Property(e => e.Email).HasMaxLength(255);
            entity.Property(e => e.FirstName).HasMaxLength(255);
            entity.Property(e => e.Name).HasMaxLength(255);
            entity.Property(e => e.Plant).HasMaxLength(255);
            entity.Property(e => e.RowVersion)
                .IsRowVersion()
                .IsConcurrencyToken();
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");

            entity.HasOne(d => d.Department).WithMany(p => p.Participants)
                .HasForeignKey(d => d.DepartmentId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Participants__DepartmentID");
        });

        modelBuilder.Entity<Supplier>(entity =>
        {
            entity.HasKey(e => e.SupplierId).HasName("PK__Suppliers");

            entity.Property(e => e.SupplierId).HasColumnName("SupplierID");
            entity.Property(e => e.City).HasMaxLength(255);
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.DeletedAt).HasColumnType("datetime");
            entity.Property(e => e.Name).HasMaxLength(255);
            entity.Property(e => e.RowVersion)
                .IsRowVersion()
                .IsConcurrencyToken();
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__Users");

            entity.HasIndex(e => e.Email, "UQ__Users__Email").IsUnique();

            entity.HasIndex(e => e.Username, "UQ__Users__Username").IsUnique();

            entity.Property(e => e.UserId).HasColumnName("UserID");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.DeletedAt).HasColumnType("datetime");
            entity.Property(e => e.Email).HasMaxLength(255);
            entity.Property(e => e.FirstName).HasMaxLength(225);
            entity.Property(e => e.LastName).HasMaxLength(225);
            entity.Property(e => e.RowVersion)
                .IsRowVersion()
                .IsConcurrencyToken();
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Username).HasMaxLength(255);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
