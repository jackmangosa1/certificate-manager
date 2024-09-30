using CertificateManagerAPI.DTO;

namespace CertificateManagerAPI.Services.CertificateTypeService
{
    public interface ICertificateTypeService
    {
        Task<IEnumerable<CertificateTypeDTO>> GetAllCertificateTypes();
    }
}
