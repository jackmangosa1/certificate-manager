-- New indexes for Suppliers table
CREATE NONCLUSTERED INDEX [IX_Suppliers_Name] ON [dbo].[Suppliers] ([Name]);
CREATE NONCLUSTERED INDEX [IX_Suppliers_SupplierIndex] ON [dbo].[Suppliers] ([SupplierIndex]);
CREATE NONCLUSTERED INDEX [IX_Suppliers_City] ON [dbo].[Suppliers] ([City]);

-- New indexes for Participants table
CREATE NONCLUSTERED INDEX [IX_Participants_Name] ON [dbo].[Participants] ([Name]);
CREATE NONCLUSTERED INDEX [IX_Participants_FirstName] ON [dbo].[Participants] ([FirstName]);
CREATE NONCLUSTERED INDEX [IX_Participants_DepartmentID] ON [dbo].[Participants] ([DepartmentID]);
CREATE NONCLUSTERED INDEX [IX_Participants_Plant] ON [dbo].[Participants] ([Plant]);