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

        public async Task<List<SupplierDTO>> SearchSuppliers(string? name = null, int? index = null, string? city = null)
        {
            var suppliers = await _supplierRepository.SearchSuppliers(name, index, city);
            return suppliers;
        }
    }
}
