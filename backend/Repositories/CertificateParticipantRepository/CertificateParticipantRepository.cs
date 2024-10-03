using CertificateManagerAPI.Data;
using CertificateManagerAPI.DTO;
using CertificateManagerAPI.Entities;
using Microsoft.EntityFrameworkCore;

namespace CertificateManagerAPI.Repositories.CertificateParticipantRepository
{
    public class CertificateParticipantRepository : ICertificateParticipantRepository
    {
        private readonly CertificateManagerDbContext _context;

        public CertificateParticipantRepository(CertificateManagerDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<CertificateParticipantDTO>> AddParticipantsToCertificate(int certificateId, IEnumerable<ParticipantDTO> participantDTOs)
        {
            var addedParticipants = new List<CertificateParticipantDTO>();

            foreach (var participantDTO in participantDTOs)
            {
                var existingParticipant = await _context.Participants
                    .Include(p => p.Department)
                    .FirstOrDefaultAsync(p => p.ParticipantId == participantDTO.ParticipantId);

                if (existingParticipant == null)
                {
                    throw new KeyNotFoundException($"Participant with ID {participantDTO.ParticipantId} not found.");
                }

                var existingAssignment = await _context.CertificateAssignments
                    .FirstOrDefaultAsync(ca => ca.CertificateId == certificateId && ca.ParticipantId == participantDTO.ParticipantId);

                if (existingAssignment != null)
                {
                    continue;
                }

                var certificateAssignment = new CertificateAssignment
                {
                    CertificateId = certificateId,
                    ParticipantId = participantDTO.ParticipantId,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };

                _context.CertificateAssignments.Add(certificateAssignment);

                addedParticipants.Add(new CertificateParticipantDTO
                {
                    Name = existingParticipant.Name,
                    Department = existingParticipant.Department.DepartmentName,
                    Email = existingParticipant.Email
                });
            }

            await _context.SaveChangesAsync();

            return addedParticipants;
        }

        public async Task RemoveParticipantFromCertificate(int certificateId, int participantId)
        {
            var certificateAssignment = await _context.CertificateAssignments
                .Include(ca => ca.Participant)
                .ThenInclude(p => p.Department)
                .FirstOrDefaultAsync(ca => ca.CertificateId == certificateId
                                            && ca.ParticipantId == participantId);

            if (certificateAssignment == null)
            {
                throw new KeyNotFoundException("Participant not assigned to the specified certificate.");
            }

            _context.CertificateAssignments.Remove(certificateAssignment);
            await _context.SaveChangesAsync();
        }
    }
}
