using CertificateManagerAPI.DTO;

namespace CertificateManagerAPI.Repositories
{
    public interface ICertificateParticipantRepository
    {
        Task<CertificateParticipantDTO> AddParticipantToCertificate(int certificateId, ParticipantDTO participantDTO);
        Task RemoveParticipantFromCertificate(int certificateId, ParticipantDTO participantDTO);
    }
}
