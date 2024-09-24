using CertificateManagerAPI.DTO;

namespace CertificateManagerAPI.Repositories
{
    public interface ICertificateRepository
    {
        Task<CertificateDTO> CreateCertificateAsync(CertificateDTO certificateDTO);
        Task<CertificateDTO> GetCertificateByIdAsync(int certificateId);
        Task<IEnumerable<CertificateDTO>> GetAllCertificatesAsync();
        Task DeleteCertificateAsync(int certificateId);
        Task UpdateCertificateAsync(int certificateId, CertificateDTO certificateDTO);

    }
}
