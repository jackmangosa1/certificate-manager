using CertificateManagerAPI.DTO;

namespace CertificateManagerAPI.Services.Interfaces
{
    public interface ICertificateParticipantService
    {
        Task<CertificateParticipantDTO> AddParticipantToCertificate(int certificateId, ParticipantDTO participantDTO);
        Task RemoveParticipantFromCertificate(int certificateId, int participantId);
    }
}
