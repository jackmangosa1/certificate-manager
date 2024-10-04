using CertificateManagerAPI.DTO;

namespace CertificateManagerAPI.Services.SupplierService
{
    public interface ISupplierService
    {
        Task<IEnumerable<SupplierDTO>> SearchSuppliers(SupplierSearchDTO searchCriteria);
    }
}
