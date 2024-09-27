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

        public async Task<List<ParticipantDTO>> SearchParticipants(
            string? name = null,
            string? firstName = null,
            int? userId = null,
            string? department = null,
            string? plant = null)
        {
            var participants = await _participantRespository.SearchParticipants(name, firstName, userId, department, plant);
            return participants;
        }
    }
}
