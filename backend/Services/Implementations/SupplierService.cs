using CertificateManagerAPI.DTO;
using CertificateManagerAPI.Repositories.Interfaces;

namespace CertificateManagerAPI.Services
{
    public class SupplierService : ISupplierService
    {
        private readonly ISupplierRepository _supplierRepository;

        public SupplierService(ISupplierRepository supplierRepository)
        {
            _supplierRepository = supplierRepository;
        }

        public async Task<List<SupplierDTO>> SearchSuppliers(SupplierSearchDTO searchCriteria)
        {
            var suppliers = await _supplierRepository.SearchSuppliers(searchCriteria);
            return suppliers;
        }
    }
}
