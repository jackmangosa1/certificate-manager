using CertificateManagerAPI.DTO;

namespace CertificateManagerAPI.Services
{
    public interface ICertificateTypeService
    {
        Task<IEnumerable<CertificateTypeDTO>> GetAllCertificateTypes();
    }
}
