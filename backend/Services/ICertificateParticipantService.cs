using CertificateManagerAPI.DTO;

namespace CertificateManagerAPI.Services
{
    public interface ICertificateParticipantService
    {
        Task<CertificateParticipantDTO> AddParticipantToCertificate(int certificateId, ParticipantDTO participantDTO);
        Task RemoveParticipantFromCertificate(int certificateId, ParticipantDTO participantDTO);
    }
}
