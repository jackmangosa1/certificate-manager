using CertificateManagerAPI.DTO;

namespace CertificateManagerAPI.Repositories.UserRepository
{
    public interface IUserRepository
    {
        Task<IEnumerable<UserDTO>> GetAllUsers();
    }
}
