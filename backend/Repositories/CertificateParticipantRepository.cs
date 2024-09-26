using CertificateManagerAPI.Data;
using CertificateManagerAPI.DTO;
using CertificateManagerAPI.Entities;
using Microsoft.EntityFrameworkCore;

namespace CertificateManagerAPI.Repositories
{
    public class CertificateParticipantRepository : ICertificateParticipantRepository
    {
        private readonly CertificateManagerDbContext _context;

        public CertificateParticipantRepository(CertificateManagerDbContext context)
        {
            _context = context;
        }

        public async Task<CertificateParticipantDTO> AddParticipantToCertificate(int certificateId, ParticipantDTO participantDTO)
        {
            var existingParticipant = await _context.Participants
                .Include(p => p.Department)
                .FirstOrDefaultAsync(p => p.ParticipantId == participantDTO.UserId);

            if (existingParticipant == null)
            {
                throw new KeyNotFoundException("Participant not found.");
            }

            var existingAssignment = await _context.CertificateAssignments
                .FirstOrDefaultAsync(ca => ca.CertificateId == certificateId && ca.ParticipantId == participantDTO.UserId);

            if (existingAssignment != null)
            {
                throw new InvalidOperationException("Participant is already assigned to this certificate.");
            }

            var certificateAssignment = new CertificateAssignment
            {
                CertificateId = certificateId,
                ParticipantId = participantDTO.UserId,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.CertificateAssignments.Add(certificateAssignment);
            await _context.SaveChangesAsync();

            return new CertificateParticipantDTO
            {
                Name = existingParticipant.Name,
                Department = existingParticipant.Department.DepartmentName,
                Email = existingParticipant.Email
            };
        }

        public async Task RemoveParticipantFromCertificate(int certificateId, ParticipantDTO participantDTO)
        {
            var certificateAssignment = await _context.CertificateAssignments
                .Include(ca => ca.Participant)
                .ThenInclude(p => p.Department)
                .FirstOrDefaultAsync(ca => ca.CertificateId == certificateId
                                            && ca.ParticipantId == participantDTO.UserId);

            if (certificateAssignment == null)
            {
                throw new KeyNotFoundException("Participant not assigned to the specified certificate.");
            }

            _context.CertificateAssignments.Remove(certificateAssignment);
            await _context.SaveChangesAsync();
        }
    }
}