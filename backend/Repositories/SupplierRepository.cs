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


        public async Task<List<SupplierDTO>> SearchSuppliers(string? name = null, int? index = null, string? city = null)
        {
            var query = _context.Suppliers.AsQueryable();

            if (!string.IsNullOrWhiteSpace(name))
            {
                query = query.Where(s => s.Name == name);
            }

            if (index.HasValue)
            {
                query = query.Where(s => s.SupplierIndex == index.Value);
            }

            if (!string.IsNullOrWhiteSpace(city))
            {
                query = query.Where(s => s.City == city);
            }

            var suppliers = await query.ToListAsync();
            return _mapper.Map<List<SupplierDTO>>(suppliers);
        }
    }
}
