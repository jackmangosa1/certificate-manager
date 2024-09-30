using CertificateManagerAPI.DTO;

namespace CertificateManagerAPI.Services.SupplierService
{
    public interface ISupplierService
    {
        Task<List<SupplierDTO>> SearchSuppliers(SupplierSearchDTO searchCriteria);
    }
}
