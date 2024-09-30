using CertificateManagerAPI.DTO;

namespace CertificateManagerAPI.Services.Interfaces
{
    public interface ICertificateTypeService
    {
        Task<IEnumerable<CertificateTypeDTO>> GetAllCertificateTypes();
    }
}
