using CertificateManagerAPI.DTO;

namespace CertificateManagerAPI.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task<IEnumerable<UserDTO>> GetAllUsers();
    }
}
