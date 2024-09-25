using CertificateManagerAPI.DTO;

namespace CertificateManagerAPI.Services
{
    public interface ICertificateService
    {
        Task<CreateCertificateDTO> CreateCertificateAsync(CreateCertificateDTO certificateDTO);
        Task<CreateCertificateDTO> GetCertificateByIdAsync(int certificateId);
        Task<IEnumerable<CertificateSummaryDTO>> GetAllCertificatesAsync();
        Task DeleteCertificateAsync(int certificateId);
        Task UpdateCertificateAsync(int certificateId, UpdateCertficateDTO certificateDTO);
    }
}
