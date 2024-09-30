using CertificateManagerAPI.DTO;

namespace CertificateManagerAPI.Repositories
{
    public interface IParticipantRespository
    {
        public Task<List<ParticipantDTO>> SearchParticipants(ParticipantSearchDTO searchCriteria);
    }
}
