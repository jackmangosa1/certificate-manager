using CertificateManagerAPI.DTO;

namespace CertificateManagerAPI.Repositories
{
    public interface ISupplierRepository
    {
        Task<List<SupplierDTO>> SearchSuppliers(SupplierSearchDTO searchCriteria);
    }
}
