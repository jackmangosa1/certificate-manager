
$connectionString = "Data Source=DESKTOP-0MMHJ8C\\SQLEXPRESS;Initial Catalog=CertificateManagerDB;Integrated Security=True;Trust Server Certificate=True"
$outputDir = "./Entities"

dotnet ef dbcontext scaffold $connectionString Microsoft.EntityFrameworkCore.SqlServer `
  -o $outputDir --context-dir ./Data --force

dotnet ef dbcontext scaffold $connectionString Microsoft.EntityFrameworkCore.SqlServer ` -o $outputDir --context-dir ./Data

