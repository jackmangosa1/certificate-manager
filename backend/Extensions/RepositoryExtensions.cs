using CertificateManagerAPI.Repositories.CertificateRepoitory;
using CertificateManagerAPI.Repositories.CertificateTypeRepository;
using CertificateManagerAPI.Repositories.ParticipantRespository;
using CertificateManagerAPI.Repositories.SupplierRespository;
using CertificateManagerAPI.Repositories.UserRepository;

namespace CertificateManagerAPI.Extensions
{
    public static class RepositoryExtensions
    {
        public static IServiceCollection AddRepositoryServices(this IServiceCollection services)
        {
            services.AddScoped<ICertificateRepository, CertificateRepository>();
            services.AddScoped<ISupplierRepository, SupplierRepository>();
            services.AddScoped<IParticipantRespository, ParticipantRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<ICertificateTypeRepository, CertificateTypeRespository>();

            return services;
        }
    }
}
