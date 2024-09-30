using CertificateManagerAPI.DTO;
using CertificateManagerAPI.Repositories.Interfaces;
using CertificateManagerAPI.Services.Interfaces;

namespace CertificateManagerAPI.Services.Implementations
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<IEnumerable<UserDTO>> GetAllUsers()
        {
            return await _userRepository.GetAllUsers();
        }
    }
}
