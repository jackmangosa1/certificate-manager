using CertificateManagerAPI.Services.CertificateCommentService;
using CertificateManagerAPI.Services.CertificateParticipantService;
using CertificateManagerAPI.Services.CertificateService;
using CertificateManagerAPI.Services.CertificateTypeService;
using CertificateManagerAPI.Services.ParticipantService;
using CertificateManagerAPI.Services.SupplierService;
using CertificateManagerAPI.Services.UserService;

namespace CertificateManagerAPI.Extensions
{
    public static class ServiceExtensions
    {
        public static IServiceCollection AddCustomServices(this IServiceCollection services)
        {
            services.AddScoped<ICertificateService, CertificateService>();
            services.AddScoped<ISupplierService, SupplierService>();
            services.AddScoped<IParticipantService, ParticipantService>();
            services.AddScoped<ICertificateParticipantService, CertificateParticipantService>();
            services.AddScoped<ICertificateCommentService, CertificateCommentService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<ICertificateTypeService, CertificateTypeService>();

            return services;
        }
    }
}
