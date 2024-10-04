using CertificateManagerAPI.DTO;

namespace CertificateManagerAPI.Repositories.ParticipantRespository
{
    public interface IParticipantRespository
    {
        Task<IEnumerable<ParticipantDTO>> SearchParticipants(ParticipantSearchDTO searchCriteria);
    }
}
