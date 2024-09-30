using AutoMapper;
using CertificateManagerAPI.Data;
using CertificateManagerAPI.DTO;
using CertificateManagerAPI.Entities;
using CertificateManagerAPI.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CertificateManagerAPI.Repositories.Implementations
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
        public async Task<CreateCertificateDTO> CreateCertificateAsync(CreateCertificateDTO certificateDTO)
        {
            var certificate = _mapper.Map<Certificate>(certificateDTO);
            await _context.Certificates.AddAsync(certificate);
            await _context.SaveChangesAsync();

            return _mapper.Map<CreateCertificateDTO>(certificate);
        }

        public async Task<GetCertificateDTO> GetCertificateByIdAsync(int certificateId)
        {
            var certificate = await _context.Certificates
                .Include(c => c.Supplier)
                .Include(c => c.CertificateType)
                .Include(c => c.Comments)
                    .ThenInclude(comment => comment.User)
                .Include(c => c.CertificateAssignments)
                    .ThenInclude(ca => ca.Participant)
                        .ThenInclude(participant => participant.Department)
                .FirstOrDefaultAsync(c => c.CertificateId == certificateId);

            return _mapper.Map<GetCertificateDTO>(certificate);
        }


        public async Task<IEnumerable<CertificateSummaryDTO>> GetAllCertificatesAsync()
        {
            var certificates = await _context.Certificates
                .Include(c => c.Supplier)
                .Include(c => c.CertificateType)
                .ToListAsync();

            return _mapper.Map<IEnumerable<CertificateSummaryDTO>>(certificates);
        }

        public async Task UpdateCertificateAsync(int certificateId, UpdateCertficateDTO certificateDTO)
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
