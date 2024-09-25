using CertificateManagerAPI.DTO;
using CertificateManagerAPI.Repositories;

namespace CertificateManagerAPI.Services
{
    public class SupplierService : ISupplierService
    {
        private readonly ISupplierRepository _supplierRepository;
        public SupplierService(ISupplierRepository supplierRepository)
        {
            _supplierRepository = supplierRepository;
        }

        public async Task<SupplierDTO> GetSupplierByName(string name)
        {
            var supplier = await _supplierRepository.GetSupplierByName(name);
            return supplier;
        }

        public async Task<SupplierDTO> GetSupplierByIndex(int index)
        {
            var supplier = await _supplierRepository.GetSupplierByIndex(index);
            return supplier;
        }

        public async Task<SupplierDTO> GetSupplierByCity(string city)
        {
            var supplier = await _supplierRepository.GetSupplierByCity(city);
            return supplier;
        }
    }
}
