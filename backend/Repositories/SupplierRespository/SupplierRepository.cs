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

        public async Task<IEnumerable<SupplierDTO>> SearchSuppliers(SupplierSearchDTO searchCriteria)
        {
            var query = _context.Suppliers.AsQueryable();

            if (!string.IsNullOrWhiteSpace(searchCriteria.Name))
            {
                query = query.Where(s => s.Name.Contains(searchCriteria.Name));
            }

            if (!string.IsNullOrWhiteSpace(searchCriteria.City))
            {
                query = query.Where(s => s.City.Contains(searchCriteria.City));
            }

            if (searchCriteria.SupplierIndex.HasValue)
            {
                query = query.Where(s => s.SupplierIndex == searchCriteria.SupplierIndex.Value);
            }

            var suppliers = await query.ToListAsync();
            return _mapper.Map<IEnumerable<SupplierDTO>>(suppliers);
        }
    }
}
