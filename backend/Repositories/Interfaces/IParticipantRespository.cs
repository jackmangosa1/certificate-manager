using CertificateManagerAPI.DTO;

namespace CertificateManagerAPI.Repositories.Interfaces
{
    public interface IParticipantRespository
    {
        Task<List<ParticipantDTO>> SearchParticipants(ParticipantSearchDTO searchCriteria);
    }
}
