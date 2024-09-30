using CertificateManagerAPI.DTO;
using CertificateManagerAPI.Repositories.CertificateTypeRepository;

namespace CertificateManagerAPI.Services.CertificateTypeService
{
    public class CertificateTypeService : ICertificateTypeService
    {
        private readonly ICertificateTypeRepository _certificateTypeRepository;

        public CertificateTypeService(ICertificateTypeRepository certificateTypeRepository)
        {
            _certificateTypeRepository = certificateTypeRepository;
        }

        public async Task<IEnumerable<CertificateTypeDTO>> GetAllCertificateTypes()
        {
            var certificates = await _certificateTypeRepository.GetAllCertificateTypes();
            return certificates;
        }

    }
}
