using CertificateManagerAPI.DTO;

namespace CertificateManagerAPI.Services.ParticipantService
{
    public interface IParticipantService
    {
        public Task<IEnumerable<ParticipantDTO>> SearchParticipants(ParticipantSearchDTO searchCriteria);
    }
}
