using CertificateManagerAPI.DTO;
using CertificateManagerAPI.Repositories;

namespace CertificateManagerAPI.Services
{
    public class CertificateParticipantService : ICertificateParticipantService
    {
        private readonly ICertificateParticipantRepository _certificateParticipantRepository;
        public CertificateParticipantService(ICertificateParticipantRepository certificateParticipantRepository)
        {
            _certificateParticipantRepository = certificateParticipantRepository;
        }

        public async Task<CertificateParticipantDTO> AddParticipantToCertificate(int certificateId, ParticipantDTO participantDTO)
        {
            var participant = await _certificateParticipantRepository.AddParticipantToCertificate(certificateId, participantDTO);
            return participant;
        }

        public async Task RemoveParticipantFromCertificate(int certificateId, ParticipantDTO participantDTO)
        {
            await _certificateParticipantRepository.RemoveParticipantFromCertificate(certificateId, participantDTO);
        }
    }
}
