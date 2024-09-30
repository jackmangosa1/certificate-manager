using AutoMapper;
using CertificateManagerAPI.Data;
using CertificateManagerAPI.DTO;
using Microsoft.EntityFrameworkCore;

namespace CertificateManagerAPI.Repositories.SupplierRespository
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

        public async Task<List<SupplierDTO>> SearchSuppliers(SupplierSearchDTO searchCriteria)
        {
            var query = _context.Suppliers.AsQueryable();

            if (!string.IsNullOrWhiteSpace(searchCriteria.Name))
            {
                query = query.Where(s => s.Name == searchCriteria.Name);
            }

            if (searchCriteria.SupplierIndex > 0)
            {
                query = query.Where(s => s.SupplierIndex == searchCriteria.SupplierIndex);
            }

            if (!string.IsNullOrWhiteSpace(searchCriteria.City))
            {
                query = query.Where(s => s.City == searchCriteria.City);
            }

            var suppliers = await query.ToListAsync();
            return _mapper.Map<List<SupplierDTO>>(suppliers);
        }
    }
}
