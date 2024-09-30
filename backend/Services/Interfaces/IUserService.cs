using CertificateManagerAPI.DTO;

namespace CertificateManagerAPI.Services.Interfaces
{
    public interface IUserService
    {
        Task<IEnumerable<UserDTO>> GetAllUsers();
    }
}
