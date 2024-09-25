using AutoMapper;
using CertificateManagerAPI.Data;
using CertificateManagerAPI.DTO;
using Microsoft.EntityFrameworkCore;

namespace CertificateManagerAPI.Repositories
{
    public class SupplierRepository : ISupplierRepository
    {
        private readonly CertificateManagerDbContext _context;

        private readonly IMapper _mapper;
        public SupplierRepository(CertificateManagerDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<SupplierDTO> GetSupplierByName(string name)
        {
            var supplier = await _context.Suppliers
                .FirstOrDefaultAsync(s => s.Name == name);

            return _mapper.Map<SupplierDTO>(supplier);
        }

        public async Task<SupplierDTO> GetSupplierByIndex(int index)
        {
            var supplier = await _context.Suppliers
                .FirstOrDefaultAsync(s => s.SupplierIndex == index);

            return _mapper.Map<SupplierDTO>(supplier);
        }

        public async Task<SupplierDTO> GetSupplierByCity(string city)
        {
            var supplier = await _context.Suppliers
                .FirstOrDefaultAsync(s => s.City == city);

            return _mapper.Map<SupplierDTO>(supplier);
        }
    }
}
