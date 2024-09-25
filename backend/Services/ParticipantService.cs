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

        public async Task<ParticipantDTO> GetParticipantByName(string name)
        {
            var participant = await _participantRespository.GetParticipantByName(name);
            return participant;
        }

        public async Task<ParticipantDTO> GetParticipantByFirstName(string name)
        {
            var participant = await _participantRespository.GetParticipantByFirstName(name);
            return participant;
        }

        public async Task<ParticipantDTO> GetParticipantByUserId(int id)
        {
            var participant = await _participantRespository.GetParticipantByUserId(id);
            return participant;
        }

        public async Task<ParticipantDTO> GetParticipantByDepartment(string name)
        {
            var participant = await _participantRespository.GetParticipantByDepartment(name);
            return participant;
        }

        public async Task<ParticipantDTO> GetParticipantByPlant(string plant)
        {
            var participant = await _participantRespository.GetParticipantByPlant(plant);
            return participant;
        }
    }
}
