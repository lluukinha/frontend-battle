USE master
GO
IF NOT EXISTS (
   SELECT name
   FROM sys.databases
   WHERE name = N'EmployeeDB'
)
CREATE DATABASE [EmployeeDB]
GO


USE [EmployeeDB]
-- Drop the table if it already exists
IF OBJECT_ID('dbo.Department', 'U') IS NOT NULL
DROP TABLE dbo.Department
GO
-- Create the table in the specified schema
CREATE TABLE dbo.Department
(
   DepartmentId INT identity(1,1), -- primary key column
   DepartmentName varchar(500)  NOT NULL
);
GO

USE [EmployeeDB]
-- Drop the table if it already exists
IF OBJECT_ID('dbo.Employee', 'U') IS NOT NULL
DROP TABLE dbo.Employee
GO
-- Create the table in the specified schema
CREATE TABLE dbo.Employee
(
   EmployeeId INT identity(1,1), -- primary key column
   EmployeeName varchar(500),
   DepartmentId int,
   DateOfJoining date,
   PhotoFileName varchar(500)
);
GO