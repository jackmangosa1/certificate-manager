using CertificateManagerAPI.DTO;
using CertificateManagerAPI.Repositories.CertificateRepoitory;

namespace CertificateManagerAPI.Services.CertificateService
{
    public class CertificateService : ICertificateService
    {
        private readonly ICertificateRepository _certificateRepository;

        public CertificateService(ICertificateRepository certificateRepository)
        {
            _certificateRepository = certificateRepository;
        }

        public async Task<CreateCertificateDTO> CreateCertificateAsync(CreateCertificateDTO certificateDTO)
        {
            var certificate = await _certificateRepository.CreateCertificateAsync(certificateDTO);
            return certificate;
        }

        public async Task<GetCertificateDTO> GetCertificateByIdAsync(int certificateId)
        {
            var certificate = await _certificateRepository.GetCertificateByIdAsync(certificateId);
            return certificate;
        }

        public async Task<IEnumerable<CertificateSummaryDTO>> GetAllCertificatesAsync()
        {
            var certificates = await _certificateRepository.GetAllCertificatesAsync();
            return certificates;
        }
        public async Task UpdateCertificateAsync(int certificateId, UpdateCertificateDTO certificateDTO)
        {
            await _certificateRepository.UpdateCertificateAsync(certificateId, certificateDTO);
        }

        public async Task DeleteCertificateAsync(int certificateId)
        {
            await _certificateRepository.DeleteCertificateAsync(certificateId);
        }

        public async Task<IEnumerable<CertificateTypeDTO>> GetAllCertificateTypesAsync()
        {
            return await _certificateRepository.GetAllCertificateTypesAsync();
        }
    }
}
