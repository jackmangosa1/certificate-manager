$outputDir = "./Entities"
$env:ASPNETCORE_ENVIRONMENT = "Development"
dotnet ef dbcontext scaffold Name=ConnectionStrings:DefaultConnectionString Microsoft.EntityFrameworkCore.SqlServer 
  -o $outputDir --context-dir ./Data



