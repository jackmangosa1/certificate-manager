using CertificateManagerAPI.DTO;

namespace CertificateManagerAPI.Repositories
{
    public interface IParticipantRespository
    {
        Task<List<ParticipantDTO>> SearchParticipants(ParticipantSearchDTO searchCriteria);
    }
}
