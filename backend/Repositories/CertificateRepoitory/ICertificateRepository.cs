using CertificateManagerAPI.DTO;

namespace CertificateManagerAPI.Repositories.CertificateRepoitory
{
    public interface ICertificateRepository
    {
        Task<CreateCertificateDTO> CreateCertificateAsync(CreateCertificateDTO certificateDTO);
        Task<GetCertificateDTO> GetCertificateByIdAsync(int certificateId);
        Task<IEnumerable<CertificateSummaryDTO>> GetAllCertificatesAsync();
        Task DeleteCertificateAsync(int certificateId);
        Task UpdateCertificateAsync(int certificateId, UpdateCertificateDTO certificateDTO);

    }
}
