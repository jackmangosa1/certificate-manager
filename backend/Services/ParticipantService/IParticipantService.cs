using CertificateManagerAPI.DTO;

namespace CertificateManagerAPI.Services.ParticipantService
{
    public interface IParticipantService
    {
        public Task<List<ParticipantDTO>> SearchParticipants(ParticipantSearchDTO searchCriteria);
    }
}
