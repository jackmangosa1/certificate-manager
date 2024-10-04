using CertificateManagerAPI.DTO;

namespace CertificateManagerAPI.Repositories.SupplierRespository
{
    public interface ISupplierRepository
    {
        Task<IEnumerable<SupplierDTO>> SearchSuppliers(SupplierSearchDTO searchCriteria);
    }
}
