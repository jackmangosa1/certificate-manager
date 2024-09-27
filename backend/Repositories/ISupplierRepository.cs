using CertificateManagerAPI.DTO;

namespace CertificateManagerAPI.Repositories
{
    public interface ISupplierRepository
    {
        public Task<List<SupplierDTO>> SearchSuppliers(string? name = null, int? index = null, string? city = null);
    }
}
