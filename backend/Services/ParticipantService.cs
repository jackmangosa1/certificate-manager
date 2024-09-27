using CertificateManagerAPI.DTO;
using CertificateManagerAPI.Repositories;

namespace CertificateManagerAPI.Services
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
