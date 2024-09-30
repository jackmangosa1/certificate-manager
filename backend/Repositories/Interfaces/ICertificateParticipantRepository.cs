using CertificateManagerAPI.DTO;

namespace CertificateManagerAPI.Repositories.Interfaces
{
    public interface ICertificateParticipantRepository
    {
        Task<CertificateParticipantDTO> AddParticipantToCertificate(int certificateId, ParticipantDTO participantDTO);
        Task RemoveParticipantFromCertificate(int certificateId, int participantId);
    }
}
