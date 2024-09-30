using CertificateManagerAPI.DTO;
using CertificateManagerAPI.Repositories.Interfaces;
using CertificateManagerAPI.Services.Interfaces;

namespace CertificateManagerAPI.Services.Implementations
{
    public class ParticipantService : IParticipantService
    {
        private readonly IParticipantRespository _participantRespository;

        public ParticipantService(IParticipantRespository participantRespository)
        {
            _participantRespository = participantRespository;
        }

        public async Task<List<ParticipantDTO>> SearchParticipants(ParticipantSearchDTO searchCriteria)
        {
            var participants = await _participantRespository.SearchParticipants(searchCriteria);
            return participants;
        }
    }
}
