using CertificateManagerAPI.DTO;

namespace CertificateManagerAPI.Services
{
    public interface ICertificateService
    {

        Task<CertificateDTO> CreateCertificateAsync(CertificateDTO certificateDTO);
        Task<CertificateDTO> GetCertificateByIdAsync(int certificateId);
        Task<IEnumerable<CertificateSummaryDTO>> GetAllCertificatesAsync();
        Task DeleteCertificateAsync(int certificateId);
        Task UpdateCertificateAsync(int certificateId, CertificateDTO certificateDTO);
    }
}
