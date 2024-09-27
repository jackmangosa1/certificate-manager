using CertificateManagerAPI.DTO;

namespace CertificateManagerAPI.Services
{
    public interface IParticipantService
    {
        public Task<List<ParticipantDTO>> SearchParticipants(
            string? name = null,
            string? firstName = null,
            int? userId = null,
            string? department = null,
            string? plant = null);
    }
}
