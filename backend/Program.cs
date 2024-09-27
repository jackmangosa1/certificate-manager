
using BookAPI.Utilities;
using CertificateManagerAPI.Data;
using CertificateManagerAPI.Repositories;
using CertificateManagerAPI.Services;
using CertificateManagerAPI.Utilities;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

namespace CertificateManagerAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers()
             .AddJsonOptions(options =>
             {
                 options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
                 options.JsonSerializerOptions.Converters.Add(new DateOnlyJsonConverter());
             });
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddDbContext<CertificateManagerDbContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnectionString")));
            builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            builder.Services.AddScoped<ICertificateRepository, CertificateRepository>();
            builder.Services.AddScoped<ICertificateService, CertificateService>();
            builder.Services.AddScoped<ISupplierRepository, SupplierRepository>();
            builder.Services.AddScoped<ISupplierService, SupplierService>();
            builder.Services.AddScoped<IParticipantRespository, ParticipantRepository>();
            builder.Services.AddScoped<IParticipantService, ParticipantService>();
            builder.Services.AddScoped<ICertificateParticipantRepository, CertificateParticipantRepository>();
            builder.Services.AddScoped<ICertificateParticipantService, CertificateParticipantService>();
            builder.Services.AddScoped<ICertificateCommentRepository, CertificateCommentRepository>();
            builder.Services.AddScoped<ICertificateCommentService, CertificateCommentService>();
            builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseExceptionHandler(_ => { });

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
