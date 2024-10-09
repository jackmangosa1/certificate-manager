using AutoMapper;
using CertificateManagerAPI.Data;
using CertificateManagerAPI.DTO;
using CertificateManagerAPI.Entities;
using Microsoft.EntityFrameworkCore;

namespace CertificateManagerAPI.Repositories.CertificateRepoitory
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


        public async Task UpdateCertificateAsync(int certificateId, UpdateCertificateDTO certificateDTO)
        {
            var certificate = await _context.Certificates
                .Include(c => c.CertificateAssignments)
                .Include(c => c.Comments)
                .FirstOrDefaultAsync(c => c.CertificateId == certificateId);

            if (certificate == null)
            {
                throw new KeyNotFoundException($"Certificate with ID {certificateId} not found.");
            }

            certificate.SupplierId = certificateDTO.SupplierId;
            certificate.CertificateTypeId = certificateDTO.CertificateTypeId;
            certificate.ValidFrom = DateOnly.FromDateTime(certificateDTO.ValidFrom);
            certificate.ValidTo = DateOnly.FromDateTime(certificateDTO.ValidTo);
            certificate.PdfDocumentData = certificateDTO.PdfDocumentData;
            certificate.UpdatedAt = DateTime.UtcNow;

            var existingParticipantIds = certificate.CertificateAssignments
                .Select(a => a.ParticipantId)
                .ToList();

            var participantsToAdd = certificateDTO.ParticipantIds
                .Except(existingParticipantIds)
                .ToList();

            var participantsToRemove = existingParticipantIds
                .Except(certificateDTO.ParticipantIds)
                .ToList();

            foreach (var participantId in participantsToRemove)
            {
                var assignmentToRemove = certificate.CertificateAssignments
                    .First(a => a.ParticipantId == participantId);
                _context.CertificateAssignments.Remove(assignmentToRemove);
            }

            foreach (var participantId in participantsToAdd)
            {
                certificate.CertificateAssignments.Add(new CertificateAssignment
                {
                    CertificateId = certificate.CertificateId,
                    ParticipantId = participantId
                });
            }

            foreach (var comment in certificateDTO.CommentsToAdd)
            {
                certificate.Comments.Add(new Comment
                {
                    CertificateId = certificate.CertificateId,
                    CommentText = comment.CommentText,
                    UserId = comment.UserId,
                });
            }

            await _context.SaveChangesAsync();
        }


        public async Task DeleteCertificateAsync(int certificateId)
        {
            var certificate = await _context.Certificates
                .Include(c => c.CertificateAssignments)
                .Include(c => c.Comments)
                .FirstOrDefaultAsync(c => c.CertificateId == certificateId);

            if (certificate == null)
            {
                throw new KeyNotFoundException($"Certificate with ID {certificateId} not found.");
            }

            if (certificate.CertificateAssignments != null)
            {
                _context.CertificateAssignments.RemoveRange(certificate.CertificateAssignments);
            }

            if (certificate.Comments != null)
            {
                _context.Comments.RemoveRange(certificate.Comments);
            }

            _context.Certificates.Remove(certificate);

            await _context.SaveChangesAsync();
        }


        public async Task<IEnumerable<CertificateTypeDTO>> GetAllCertificateTypesAsync()
        {
            var certificateTypes = await _context.CertificateTypes.ToListAsync();
            return _mapper.Map<IEnumerable<CertificateTypeDTO>>(certificateTypes);
        }
    }
}
