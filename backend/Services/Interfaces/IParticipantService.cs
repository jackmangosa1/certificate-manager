using CertificateManagerAPI.DTO;

namespace CertificateManagerAPI.Services.Interfaces
{
    public interface IParticipantService
    {
        public Task<List<ParticipantDTO>> SearchParticipants(ParticipantSearchDTO searchCriteria);
    }
}
