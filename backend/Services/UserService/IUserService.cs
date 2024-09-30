using CertificateManagerAPI.DTO;

namespace CertificateManagerAPI.Services.UserService
{
    public interface IUserService
    {
        Task<IEnumerable<UserDTO>> GetAllUsers();
    }
}
