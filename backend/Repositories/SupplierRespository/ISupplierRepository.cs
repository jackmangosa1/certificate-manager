using CertificateManagerAPI.DTO;

namespace CertificateManagerAPI.Repositories.SupplierRespository
{
    public interface ISupplierRepository
    {
        Task<List<SupplierDTO>> SearchSuppliers(SupplierSearchDTO searchCriteria);
    }
}
