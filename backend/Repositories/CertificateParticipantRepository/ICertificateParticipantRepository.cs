using CertificateManagerAPI.DTO;

namespace CertificateManagerAPI.Repositories.CertificateParticipantRepository
{
    public interface ICertificateParticipantRepository
    {
        Task<IEnumerable<CertificateParticipantDTO>> AddParticipantsToCertificate(int certificateId, IEnumerable<ParticipantDTO> articipantDTOs);
        Task RemoveParticipantFromCertificate(int certificateId, int participantId);
    }
}
