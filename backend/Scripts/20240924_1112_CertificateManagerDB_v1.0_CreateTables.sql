-- Create the database
CREATE DATABASE CertificateManagerDB;
GO

-- Switch to the newly created database
USE CertificateManagerDB;
GO

-- Enable ANSI NULLS and QUOTED_IDENTIFIER for all tables
SET ANSI_NULLS ON;
GO
SET QUOTED_IDENTIFIER ON;
GO

-- Create tables
CREATE TABLE [dbo].[CertificateTypes](
    [CertificateTypeID] [int] IDENTITY(1,1) NOT NULL,
    [CertificateTypeName] [nvarchar](255) NOT NULL,
    [CreatedAt] [datetime] NOT NULL DEFAULT (getdate()),
    [UpdatedAt] [datetime] NOT NULL DEFAULT (getdate()),
    [DeletedAt] [datetime] NULL,
    [RowVersion] [rowversion] NULL,
    CONSTRAINT [PK__CertificateTypes] PRIMARY KEY CLUSTERED ([CertificateTypeID] ASC)
);

CREATE TABLE [dbo].[Departments](
    [DepartmentID] [int] IDENTITY(1,1) NOT NULL,
    [DepartmentName] [nvarchar](255) NOT NULL,
    [CreatedAt] [datetime] NOT NULL DEFAULT (getdate()),
    [UpdatedAt] [datetime] NOT NULL DEFAULT (getdate()),
    [DeletedAt] [datetime] NULL,
    [RowVersion] [rowversion] NULL,
    CONSTRAINT [PK__Departments] PRIMARY KEY CLUSTERED ([DepartmentID] ASC)
);

CREATE TABLE [dbo].[Suppliers](
    [SupplierID] [int] IDENTITY(1,1) NOT NULL,
    [Name] [nvarchar](255) NOT NULL,
    [SupplierIndex] [int] NOT NULL,
    [City] [nvarchar](255) NOT NULL,
    [CreatedAt] [datetime] NOT NULL DEFAULT (getdate()),
    [UpdatedAt] [datetime] NOT NULL DEFAULT (getdate()),
    [DeletedAt] [datetime] NULL,
    [RowVersion] [rowversion] NULL,
    CONSTRAINT [PK__Suppliers] PRIMARY KEY CLUSTERED ([SupplierID] ASC)
);

CREATE TABLE [dbo].[Users](
    [UserID] [int] IDENTITY(1,1) NOT NULL,
    [Username] [nvarchar](255) NOT NULL,
    [FirstName] [nvarchar](225) NOT NULL,
    [LastName] [nvarchar](225) NOT NULL,
    [Email] [nvarchar](255) NOT NULL,
    [CreatedAt] [datetime] NOT NULL DEFAULT (getdate()),
    [UpdatedAt] [datetime] NOT NULL DEFAULT (getdate()),
    [DeletedAt] [datetime] NULL,
    [RowVersion] [rowversion] NULL,
    CONSTRAINT [PK__Users] PRIMARY KEY CLUSTERED ([UserID] ASC),
    CONSTRAINT [UQ__Users__Username] UNIQUE NONCLUSTERED ([Username] ASC),
    CONSTRAINT [UQ__Users__Email] UNIQUE NONCLUSTERED ([Email] ASC)
);

CREATE TABLE [dbo].[Certificates](
    [CertificateID] [int] IDENTITY(1,1) NOT NULL,
    [SupplierID] [int] NOT NULL,
    [CertificateTypeID] [int] NOT NULL,
    [ValidFrom] [date] NOT NULL,
    [ValidTo] [date] NOT NULL,
    [PdfDocumentData] [VARBINARY](MAX) NOT NULL, 
    [CreatedAt] [datetime] NOT NULL DEFAULT (getdate()),
    [UpdatedAt] [datetime] NOT NULL DEFAULT (getdate()),
    [DeletedAt] [datetime] NULL,
    [RowVersion] [rowversion] NULL,
    CONSTRAINT [PK_Certificates] PRIMARY KEY CLUSTERED ([CertificateID] ASC),
    CONSTRAINT [FK_Certificates_SupplierID] FOREIGN KEY([SupplierID]) REFERENCES [dbo].[Suppliers] ([SupplierID]),
    CONSTRAINT [FK_Certificates_CertificateTypeID] FOREIGN KEY([CertificateTypeID]) REFERENCES [dbo].[CertificateTypes] ([CertificateTypeID])
);

CREATE TABLE [dbo].[Participants](
    [ParticipantID] [int] IDENTITY(1,1) NOT NULL,
    [Name] [nvarchar](255) NOT NULL,
    [FirstName] [nvarchar](255) NOT NULL,
    [DepartmentID] [int] NOT NULL,
    [Plant] [nvarchar](255) NOT NULL,
    [Email] [nvarchar](255) NOT NULL,
    [CreatedAt] [datetime] NOT NULL DEFAULT (getdate()),
    [UpdatedAt] [datetime] NOT NULL DEFAULT (getdate()),
    [DeletedAt] [datetime] NULL,
    [RowVersion] [rowversion] NULL,
    CONSTRAINT [PK__Participants] PRIMARY KEY CLUSTERED ([ParticipantID] ASC),
    CONSTRAINT [FK__Participants__DepartmentID] FOREIGN KEY([DepartmentID]) REFERENCES [dbo].[Departments] ([DepartmentID])
);


CREATE TABLE [dbo].[CertificateAssignments](
    [CertificateAssignmentID] [int] IDENTITY(1,1) NOT NULL,
    [CertificateID] [int] NOT NULL,
    [ParticipantID] [int] NOT NULL,
    [CreatedAt] [datetime] NOT NULL DEFAULT (getdate()),
    [UpdatedAt] [datetime] NOT NULL DEFAULT (getdate()),
    [DeletedAt] [datetime] NULL,
    [RowVersion] [rowversion] NULL,
    CONSTRAINT [PK__CertificateAssignments] PRIMARY KEY CLUSTERED ([CertificateAssignmentID] ASC),
    CONSTRAINT [FK__CertificateAssignments__CertificateID] FOREIGN KEY([CertificateID]) REFERENCES [dbo].[Certificates] ([CertificateID]),
    CONSTRAINT [FK__CertificateAssignments__ParticipantID] FOREIGN KEY([ParticipantID]) REFERENCES [dbo].[Participants] ([ParticipantID])
);

CREATE TABLE [dbo].[Comments](
    [CommentID] [int] IDENTITY(1,1) NOT NULL,
    [CertificateID] [int] NOT NULL,
    [UserID] [int] NOT NULL,
    [CommentText] [nvarchar](max) NOT NULL,
    [CreatedAt] [datetime] NOT NULL DEFAULT (getdate()),
    [UpdatedAt] [datetime] NOT NULL DEFAULT (getdate()),
    [DeletedAt] [datetime] NULL,
    [RowVersion] [rowversion] NULL,
    CONSTRAINT [PK__Comments] PRIMARY KEY CLUSTERED ([CommentID] ASC),
    CONSTRAINT [FK__Comments__CertificateID] FOREIGN KEY([CertificateID]) REFERENCES [dbo].[Certificates] ([CertificateID]),
    CONSTRAINT [FK__Comments__UserID] FOREIGN KEY([UserID]) REFERENCES [dbo].[Users] ([UserID])
);