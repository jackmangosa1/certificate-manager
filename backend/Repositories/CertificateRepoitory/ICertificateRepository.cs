using CertificateManagerAPI.DTO;

namespace CertificateManagerAPI.Repositories.CertificateRepoitory
{
    public interface ICertificateRepository
    {
        Task<CertificateDTO> CreateCertificateAsync(CertificateDTO certificateDTO);
        Task<GetCertificateDTO> GetCertificateByIdAsync(int certificateId);
        Task<IEnumerable<CertificateSummaryDTO>> GetAllCertificatesAsync();
        Task DeleteCertificateAsync(int certificateId);
        Task UpdateCertificateAsync(int certificateId, CertificateDTO certificateDTO);
        Task<IEnumerable<CertificateTypeDTO>> GetAllCertificateTypesAsync();

    }
}
