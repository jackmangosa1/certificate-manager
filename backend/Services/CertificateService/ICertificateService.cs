using CertificateManagerAPI.DTO;

namespace CertificateManagerAPI.Services.CertificateService
{
    public interface ICertificateService
    {
        Task<CreateCertificateDTO> CreateCertificateAsync(CreateCertificateDTO certificateDTO);
        Task<GetCertificateDTO> GetCertificateByIdAsync(int certificateId);
        Task<IEnumerable<CertificateSummaryDTO>> GetAllCertificatesAsync();
        Task DeleteCertificateAsync(int certificateId);
        Task UpdateCertificateAsync(int certificateId, UpdateCertficateDTO certificateDTO);
    }
}
