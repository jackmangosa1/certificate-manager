using CertificateManagerAPI.DTO;

namespace CertificateManagerAPI.Repositories
{
    public interface ICertificateRepository
    {
        Task<CreateCertificateDTO> CreateCertificateAsync(CreateCertificateDTO certificateDTO);
        Task<CreateCertificateDTO> GetCertificateByIdAsync(int certificateId);
        Task<IEnumerable<CertificateSummaryDTO>> GetAllCertificatesAsync();
        Task DeleteCertificateAsync(int certificateId);
        Task UpdateCertificateAsync(int certificateId, UpdateCertficateDTO certificateDTO);

    }
}
