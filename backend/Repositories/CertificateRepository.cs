using AutoMapper;
using CertificateManagerAPI.Data;
using CertificateManagerAPI.DTO;
using CertificateManagerAPI.Entities;
using Microsoft.EntityFrameworkCore;

namespace CertificateManagerAPI.Repositories
{
    public class CertificateRepository : ICertificateRepository
    {
        CertificateManagerDbContext _context;
        IMapper _mapper;
        public CertificateRepository(CertificateManagerDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<CertificateDTO> CreateCertificateAsync(CertificateDTO certificateDTO)
        {
            var certificate = _mapper.Map<Certificate>(certificateDTO);
            await _context.Certificates.AddAsync(certificate);
            await _context.SaveChangesAsync();
            return _mapper.Map<CertificateDTO>(certificate);
        }

        public async Task<CertificateDTO> GetCertificateByIdAsync(int certificateId)
        {
            var certificate = await _context.Certificates.FindAsync(certificateId);
            return _mapper.Map<CertificateDTO>(certificate);
        }

        public async Task<IEnumerable<CertificateDTO>> GetAllCertificatesAsync()
        {
            var certificates = await _context.Certificates.ToListAsync();
            return _mapper.Map<IEnumerable<CertificateDTO>>(certificates);
        }

        public async Task UpdateCertificateAsync(int certificateId, CertificateDTO certificateDTO)
        {
            var certificate = await _context.Certificates.FindAsync(certificateId);
            if (certificate == null)
            {
                throw new KeyNotFoundException($"Certificate with ID {certificateId} not found.");
            }

            _mapper.Map(certificateDTO, certificate);

            await _context.SaveChangesAsync();
        }


        public async Task DeleteCertificateAsync(int certificateId)
        {
            var certificate = await _context.Certificates.FindAsync(certificateId);

            if (certificate == null)
            {
                throw new KeyNotFoundException($"Certificate with ID {certificateId} not found.");
            }
            _context.Certificates.Remove(certificate);
            await _context.SaveChangesAsync();
        }
    }
}
