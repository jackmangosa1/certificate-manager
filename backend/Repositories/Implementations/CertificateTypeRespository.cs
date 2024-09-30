using AutoMapper;
using CertificateManagerAPI.Data;
using CertificateManagerAPI.DTO;
using CertificateManagerAPI.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CertificateManagerAPI.Repositories.Implementations
{
    public class CertificateTypeRespository : ICertificateTypeRepository
    {
        private readonly CertificateManagerDbContext _context;
        private readonly IMapper _mapper;

        public CertificateTypeRespository(CertificateManagerDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<CertificateTypeDTO>> GetAllCertificateTypes()
        {
            var certificatesTypes = await _context.CertificateTypes.ToListAsync();
            return _mapper.Map<IEnumerable<CertificateTypeDTO>>(certificatesTypes);
        }
    }
}
