using CertificateManagerAPI.DTO;

namespace CertificateManagerAPI.Repositories
{
    public interface ICertificateTypeRepository
    {
        Task<IEnumerable<CertificateTypeDTO>> GetAllCertificateTypes();
    }
}
