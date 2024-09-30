using CertificateManagerAPI.DTO;

namespace CertificateManagerAPI.Repositories.CertificateTypeRepository
{
    public interface ICertificateTypeRepository
    {
        Task<IEnumerable<CertificateTypeDTO>> GetAllCertificateTypes();
    }
}
