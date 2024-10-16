﻿using CertificateManagerAPI.DTO;
using CertificateManagerAPI.Repositories.SupplierRespository;

namespace CertificateManagerAPI.Services.SupplierService
{
    public class SupplierService : ISupplierService
    {
        private readonly ISupplierRepository _supplierRepository;

        public SupplierService(ISupplierRepository supplierRepository)
        {
            _supplierRepository = supplierRepository;
        }

        public async Task<IEnumerable<SupplierDTO>> SearchSuppliers(SupplierSearchDTO searchCriteria)
        {
            var suppliers = await _supplierRepository.SearchSuppliers(searchCriteria);
            return suppliers;
        }
    }
}
