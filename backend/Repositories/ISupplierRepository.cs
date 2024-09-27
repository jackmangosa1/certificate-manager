using CertificateManagerAPI.DTO;

namespace CertificateManagerAPI.Repositories
{
    public interface ISupplierRepository
    {
        public Task<List<SupplierDTO>> SearchSuppliers(SupplierSearchDTO searchCriteria);
    }
}
