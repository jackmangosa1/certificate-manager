using CertificateManagerAPI.DTO;
using CertificateManagerAPI.Repositories.CertificateParticipantRepository;

namespace CertificateManagerAPI.Services.CertificateParticipantService
{
    public class CertificateParticipantService : ICertificateParticipantService
    {
        private readonly ICertificateParticipantRepository _certificateParticipantRepository;

        public CertificateParticipantService(ICertificateParticipantRepository certificateParticipantRepository)
        {
            _certificateParticipantRepository = certificateParticipantRepository;
        }

        public async Task<IEnumerable<CertificateParticipantDTO>> AddParticipantsToCertificate(int certificateId, IEnumerable<ParticipantDTO> participantDTOs)
        {
            var participants = await _certificateParticipantRepository.AddParticipantsToCertificate(certificateId, participantDTOs);
            return participants;
        }

        public async Task RemoveParticipantFromCertificate(int certificateId, int participantId)
        {
            await _certificateParticipantRepository.RemoveParticipantFromCertificate(certificateId, participantId);
        }
    }
}
