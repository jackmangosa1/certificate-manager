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

        public async Task<List<ParticipantDTO>> SearchParticipants(
             string? name = null,
             string? firstName = null,
             int? userId = null,
             string? department = null,
             string? plant = null)
        {
            var query = _context.Participants.Include(p => p.Department).AsQueryable();

            if (!string.IsNullOrEmpty(name))
            {
                query = query.Where(p => p.Name == name);
            }

            if (!string.IsNullOrEmpty(firstName))
            {
                query = query.Where(p => p.FirstName == firstName);
            }

            if (userId.HasValue)
            {
                query = query.Where(p => p.ParticipantId == userId);
            }

            if (!string.IsNullOrEmpty(department))
            {
                query = query.Where(p => p.Department.DepartmentName == department);
            }

            if (!string.IsNullOrEmpty(plant))
            {
                query = query.Where(p => p.Plant == plant);
            }

            var participants = await query.ToListAsync();
            return _mapper.Map<List<ParticipantDTO>>(participants);
        }
    }
}

