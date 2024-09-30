using CertificateManagerAPI.DTO;
using CertificateManagerAPI.Repositories.UserRepository;

namespace CertificateManagerAPI.Services.UserService
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
