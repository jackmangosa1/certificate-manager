using CertificateManagerAPI.DTO;

namespace CertificateManagerAPI.Repositories
{
    public interface IUserRepository
    {
        Task<IEnumerable<UserDTO>> GetAllUsers();
    }
}
