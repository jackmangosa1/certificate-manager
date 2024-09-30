using CertificateManagerAPI.DTO;

namespace CertificateManagerAPI.Repositories.Interfaces
{
    public interface ICertificateTypeRepository
    {
        Task<IEnumerable<CertificateTypeDTO>> GetAllCertificateTypes();
    }
}
