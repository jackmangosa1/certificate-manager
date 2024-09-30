using CertificateManagerAPI.DTO;

namespace CertificateManagerAPI.Repositories.ParticipantRespository
{
    public interface IParticipantRespository
    {
        Task<List<ParticipantDTO>> SearchParticipants(ParticipantSearchDTO searchCriteria);
    }
}
