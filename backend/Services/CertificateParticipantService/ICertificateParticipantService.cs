using CertificateManagerAPI.DTO;

namespace CertificateManagerAPI.Services.CertificateParticipantService
{
    public interface ICertificateParticipantService
    {
        Task<IEnumerable<CertificateParticipantDTO>> AddParticipantsToCertificate(int certificateId, IEnumerable<ParticipantDTO> participantDTOs);
        Task RemoveParticipantFromCertificate(int certificateId, int participantId);
    }
}
