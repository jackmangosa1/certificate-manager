USE [CertificateManagerDB]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 9/23/2024 4:31:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CertificateAssignments]    Script Date: 9/23/2024 4:31:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CertificateAssignments](
	[CertificateAssignmentID] [int] IDENTITY(1,1) NOT NULL,
	[CertificateID] [int] NOT NULL,
	[ParticipantID] [int] NOT NULL,
	[CreatedAt] [datetime] NOT NULL,
	[UpdatedAt] [datetime] NOT NULL,
	[DeletedAt] [datetime] NULL,
	[RowVersion] [timestamp] NULL,
 CONSTRAINT [PK__Certific__C0E318BD1C73635D] PRIMARY KEY CLUSTERED 
(
	[CertificateAssignmentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Certificates]    Script Date: 9/23/2024 4:31:13 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Certificates](
	[CertificateID] [int] IDENTITY(1,1) NOT NULL,
	[SupplierID] [int] NOT NULL,
	[CertificateTypeID] [int] NOT NULL,
	[ValidFrom] [date] NOT NULL,
	[ValidTo] [date] NOT NULL,
	[PdfDocumentURL] [nvarchar](2048) NOT NULL,
	[CreatedAt] [datetime] NOT NULL,
	[UpdatedAt] [datetime] NOT NULL,
	[DeletedAt] [datetime] NULL,
	[RowVersion] [timestamp] NULL,
 CONSTRAINT [PK__Certific__BBF8A7E193AC33B4] PRIMARY KEY CLUSTERED 
(
	[CertificateID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CertificateTypes]    Script Date: 9/23/2024 4:31:13 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CertificateTypes](
	[CertificateTypeID] [int] IDENTITY(1,1) NOT NULL,
	[CertificateTypeName] [nvarchar](255) NOT NULL,
	[CreatedAt] [datetime] NOT NULL,
	[UpdatedAt] [datetime] NOT NULL,
	[DeletedAt] [datetime] NULL,
	[RowVersion] [timestamp] NULL,
 CONSTRAINT [PK__Certific__78F0E8D98089782E] PRIMARY KEY CLUSTERED 
(
	[CertificateTypeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Comments]    Script Date: 9/23/2024 4:31:13 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Comments](
	[CommentID] [int] IDENTITY(1,1) NOT NULL,
	[CertificateID] [int] NOT NULL,
	[UserID] [int] NOT NULL,
	[CommentText] [nvarchar](max) NOT NULL,
	[CreatedAt] [datetime] NOT NULL,
	[UpdatedAt] [datetime] NOT NULL,
	[DeletedAt] [datetime] NULL,
	[RowVersion] [timestamp] NULL,
 CONSTRAINT [PK__Comments__C3B4DFAA81EA7E70] PRIMARY KEY CLUSTERED 
(
	[CommentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Departments]    Script Date: 9/23/2024 4:31:13 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Departments](
	[DepartmentID] [int] IDENTITY(1,1) NOT NULL,
	[DepartmentName] [nvarchar](255) NOT NULL,
	[CreatedAt] [datetime] NOT NULL,
	[UpdatedAt] [datetime] NOT NULL,
	[DeletedAt] [datetime] NULL,
	[RowVersion] [timestamp] NULL,
 CONSTRAINT [PK__Departme__B2079BCD77726975] PRIMARY KEY CLUSTERED 
(
	[DepartmentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Participants]    Script Date: 9/23/2024 4:31:13 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Participants](
	[ParticipantID] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [nvarchar](255) NOT NULL,
	[LastName] [nvarchar](255) NOT NULL,
	[DepartmentID] [int] NOT NULL,
	[Plant] [nvarchar](255) NOT NULL,
	[CreatedAt] [datetime] NOT NULL,
	[UpdatedAt] [datetime] NOT NULL,
	[DeletedAt] [datetime] NULL,
	[RowVersion] [timestamp] NULL,
 CONSTRAINT [PK__Particip__7227997E79746700] PRIMARY KEY CLUSTERED 
(
	[ParticipantID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Suppliers]    Script Date: 9/23/2024 4:31:13 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Suppliers](
	[SupplierID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](255) NOT NULL,
	[SupplierIndex] [int] NOT NULL,
	[City] [nvarchar](255) NOT NULL,
	[CreatedAt] [datetime] NOT NULL,
	[UpdatedAt] [datetime] NOT NULL,
	[DeletedAt] [datetime] NULL,
	[RowVersion] [timestamp] NULL,
 CONSTRAINT [PK__Supplier__4BE66694E3917704] PRIMARY KEY CLUSTERED 
(
	[SupplierID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 9/23/2024 4:31:13 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[UserID] [int] IDENTITY(1,1) NOT NULL,
	[Username] [nvarchar](255) NOT NULL,
	[FirstName] [nvarchar](225) NOT NULL,
	[LastName] [nvarchar](225) NOT NULL,
	[Email] [nvarchar](255) NOT NULL,
	[CreatedAt] [datetime] NOT NULL,
	[UpdatedAt] [datetime] NOT NULL,
	[DeletedAt] [datetime] NULL,
	[RowVersion] [timestamp] NULL,
 CONSTRAINT [PK__Users__1788CCAC5B6B3EA7] PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ__Users__536C85E4CF2B83DF] UNIQUE NONCLUSTERED 
(
	[Username] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ__Users__A9D10534D8CAB45A] UNIQUE NONCLUSTERED 
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[CertificateAssignments] ADD  CONSTRAINT [DF__Certifica__Creat__5441852A]  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[CertificateAssignments] ADD  CONSTRAINT [DF__Certifica__Updat__5535A963]  DEFAULT (getdate()) FOR [UpdatedAt]
GO
ALTER TABLE [dbo].[Certificates] ADD  CONSTRAINT [DF__Certifica__Creat__52593CB8]  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[Certificates] ADD  CONSTRAINT [DF__Certifica__Updat__534D60F1]  DEFAULT (getdate()) FOR [UpdatedAt]
GO
ALTER TABLE [dbo].[CertificateTypes] ADD  CONSTRAINT [DF__Certifica__Creat__5629CD9C]  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[CertificateTypes] ADD  CONSTRAINT [DF__Certifica__Updat__571DF1D5]  DEFAULT (getdate()) FOR [UpdatedAt]
GO
ALTER TABLE [dbo].[Comments] ADD  CONSTRAINT [DF__Comments__Create__49C3F6B7]  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[Comments] ADD  CONSTRAINT [DF__Comments__Update__5812160E]  DEFAULT (getdate()) FOR [UpdatedAt]
GO
ALTER TABLE [dbo].[Departments] ADD  CONSTRAINT [DF__Departmen__Creat__656C112C]  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[Departments] ADD  CONSTRAINT [DF__Departmen__Updat__66603565]  DEFAULT (getdate()) FOR [UpdatedAt]
GO
ALTER TABLE [dbo].[Participants] ADD  CONSTRAINT [DF__Participa__Creat__4E88ABD4]  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[Participants] ADD  CONSTRAINT [DF__Participa__Updat__4F7CD00D]  DEFAULT (getdate()) FOR [UpdatedAt]
GO
ALTER TABLE [dbo].[Suppliers] ADD  CONSTRAINT [DF__Suppliers__Creat__59063A47]  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[Suppliers] ADD  CONSTRAINT [DF__Suppliers__Updat__59FA5E80]  DEFAULT (getdate()) FOR [UpdatedAt]
GO
ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [DF__Users__CreatedAt__5070F446]  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [DF__Users__UpdatedAt__5165187F]  DEFAULT (getdate()) FOR [UpdatedAt]
GO
ALTER TABLE [dbo].[CertificateAssignments]  WITH CHECK ADD  CONSTRAINT [FK__Certifica__Certi__4CA06362] FOREIGN KEY([CertificateID])
REFERENCES [dbo].[Certificates] ([CertificateID])
GO
ALTER TABLE [dbo].[CertificateAssignments] CHECK CONSTRAINT [FK__Certifica__Certi__4CA06362]
GO
ALTER TABLE [dbo].[CertificateAssignments]  WITH CHECK ADD  CONSTRAINT [FK__Certifica__Parti__4D94879B] FOREIGN KEY([ParticipantID])
REFERENCES [dbo].[Participants] ([ParticipantID])
GO
ALTER TABLE [dbo].[CertificateAssignments] CHECK CONSTRAINT [FK__Certifica__Parti__4D94879B]
GO
ALTER TABLE [dbo].[Certificates]  WITH CHECK ADD  CONSTRAINT [FK__Certifica__Certi__44FF419A] FOREIGN KEY([CertificateTypeID])
REFERENCES [dbo].[CertificateTypes] ([CertificateTypeID])
GO
ALTER TABLE [dbo].[Certificates] CHECK CONSTRAINT [FK__Certifica__Certi__44FF419A]
GO
ALTER TABLE [dbo].[Certificates]  WITH CHECK ADD  CONSTRAINT [FK__Certifica__Suppl__440B1D61] FOREIGN KEY([SupplierID])
REFERENCES [dbo].[Suppliers] ([SupplierID])
GO
ALTER TABLE [dbo].[Certificates] CHECK CONSTRAINT [FK__Certifica__Suppl__440B1D61]
GO
ALTER TABLE [dbo].[Comments]  WITH CHECK ADD  CONSTRAINT [FK__Comments__Certif__47DBAE45] FOREIGN KEY([CertificateID])
REFERENCES [dbo].[Certificates] ([CertificateID])
GO
ALTER TABLE [dbo].[Comments] CHECK CONSTRAINT [FK__Comments__Certif__47DBAE45]
GO
ALTER TABLE [dbo].[Comments]  WITH CHECK ADD  CONSTRAINT [FK__Comments__UserID__48CFD27E] FOREIGN KEY([UserID])
REFERENCES [dbo].[Users] ([UserID])
GO
ALTER TABLE [dbo].[Comments] CHECK CONSTRAINT [FK__Comments__UserID__48CFD27E]
GO
ALTER TABLE [dbo].[Participants]  WITH CHECK ADD  CONSTRAINT [FK__Participa__Depar__398D8EEE] FOREIGN KEY([DepartmentID])
REFERENCES [dbo].[Departments] ([DepartmentID])
GO
ALTER TABLE [dbo].[Participants] CHECK CONSTRAINT [FK__Participa__Depar__398D8EEE]
GO
