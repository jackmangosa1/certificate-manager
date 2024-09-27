using CertificateManagerAPI.DTO;

namespace CertificateManagerAPI.Repositories
{
    public interface IParticipantRespository
    {
        public Task<List<ParticipantDTO>> SearchParticipants(
            string? name = null,
            string? firstName = null,
            int? userId = null,
            string? department = null,
            string? plant = null);
    }
}
