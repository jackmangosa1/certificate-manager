using AutoMapper;
using CertificateManagerAPI.Data;
using CertificateManagerAPI.DTO;
using Microsoft.EntityFrameworkCore;

namespace CertificateManagerAPI.Repositories.ParticipantRespository
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

        public async Task<IEnumerable<ParticipantDTO>> SearchParticipants(ParticipantSearchDTO searchCriteria)
        {
            var query = _context.Participants.Include(p => p.Department).AsQueryable();

            if (!string.IsNullOrEmpty(searchCriteria.Name))
            {
                query = query.Where(p => p.Name.Contains(searchCriteria.Name));
            }

            if (!string.IsNullOrEmpty(searchCriteria.FirstName))
            {
                query = query.Where(p => p.FirstName.Contains(searchCriteria.FirstName));
            }

            if (searchCriteria.ParticipantId > 0)
            {
                query = query.Where(p => p.ParticipantId == searchCriteria.ParticipantId);
            }

            if (!string.IsNullOrEmpty(searchCriteria.Department))
            {

                query = query.Where(p => p.Department.DepartmentName.Contains(searchCriteria.Department));
            }

            if (!string.IsNullOrEmpty(searchCriteria.Plant))
            {
                query = query.Where(p => p.Plant.Contains(searchCriteria.Plant));
            }

            var participants = await query.ToListAsync();
            return _mapper.Map<IEnumerable<ParticipantDTO>>(participants);
        }
    }
}
