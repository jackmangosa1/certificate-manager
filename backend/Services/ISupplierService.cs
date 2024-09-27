using CertificateManagerAPI.DTO;

namespace CertificateManagerAPI.Services
{
    public interface ISupplierService
    {
        Task<List<SupplierDTO>> SearchSuppliers(SupplierSearchDTO searchCriteria);
    }
}
