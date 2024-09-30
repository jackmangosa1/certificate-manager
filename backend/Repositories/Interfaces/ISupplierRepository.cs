using CertificateManagerAPI.DTO;

namespace CertificateManagerAPI.Repositories.Interfaces
{
    public interface ISupplierRepository
    {
        Task<List<SupplierDTO>> SearchSuppliers(SupplierSearchDTO searchCriteria);
    }
}
