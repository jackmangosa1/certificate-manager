using AutoMapper;
using CertificateManagerAPI.Data;
using CertificateManagerAPI.DTO;
using Microsoft.EntityFrameworkCore;

namespace CertificateManagerAPI.Repositories
{
    public class ParticipantRepository : IParticipantRespository
    {
        private readonly CertificateManagerDbContext _context;

        private readonly IMapper _mapper;
        public ParticipantRepository(CertificateManagerDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ParticipantDTO> GetParticipantByName(string name)
        {
            var participant = await _context.Participants
                .Include(p => p.Department)
                .FirstOrDefaultAsync(p => p.Name == name);

            return _mapper.Map<ParticipantDTO>(participant);
        }

        public async Task<ParticipantDTO> GetParticipantByFirstName(string name)
        {
            var participant = await _context.Participants
                .Include(p => p.Department)
                .FirstOrDefaultAsync(p => p.FirstName == name);

            return _mapper.Map<ParticipantDTO>(participant);
        }

        public async Task<ParticipantDTO> GetParticipantByUserId(int id)
        {
            var participant = await _context.Participants
                    .Include(p => p.Department)
                    .FirstOrDefaultAsync(p => p.ParticipantId == id);

            return _mapper.Map<ParticipantDTO>(participant);
        }

        public async Task<ParticipantDTO> GetParticipantByDepartment(string name)
        {
            var participant = await _context.Participants
                    .Include(p => p.Department)
                    .FirstOrDefaultAsync(p => p.Department.DepartmentName == name);

            return _mapper.Map<ParticipantDTO>(participant);
        }

        public async Task<ParticipantDTO> GetParticipantByPlant(string plant)
        {
            var participant = await _context.Participants
                    .Include(p => p.Department)
                    .FirstOrDefaultAsync(p => p.Plant == plant);

            return _mapper.Map<ParticipantDTO>(participant);
        }
    }
}

