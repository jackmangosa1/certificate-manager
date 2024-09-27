using CertificateManagerAPI.DTO;

namespace CertificateManagerAPI.Services
{
    public interface IParticipantService
    {
        public Task<List<ParticipantDTO>> SearchParticipants(ParticipantSearchDTO searchCriteria);
    }
}
