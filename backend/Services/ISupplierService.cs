using CertificateManagerAPI.DTO;

namespace CertificateManagerAPI.Services
{
    public interface ISupplierService
    {
        Task<SupplierDTO> GetSupplierByName(string name);
        Task<SupplierDTO> GetSupplierByIndex(int index);
        Task<SupplierDTO> GetSupplierByCity(string city);
    }
}
