using CertificateManagerAPI.DTO;

namespace CertificateManagerAPI.Services
{
    public interface ISupplierService
    {
        Task<List<SupplierDTO>> SearchSuppliers(string? name = null, int? index = null, string? city = null);
    }
}
