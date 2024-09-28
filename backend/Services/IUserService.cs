using CertificateManagerAPI.DTO;

namespace CertificateManagerAPI.Services
{
    public interface IUserService
    {
        Task<IEnumerable<UserDTO>> GetAllUsers();
    }
}
