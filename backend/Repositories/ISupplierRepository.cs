using CertificateManagerAPI.DTO;

namespace CertificateManagerAPI.Repositories
{
    public interface ISupplierRepository
    {
        Task<SupplierDTO> GetSupplierByName(string name);
        Task<SupplierDTO> GetSupplierByIndex(int index);
        Task<SupplierDTO> GetSupplierByCity(string city);
    }
}
