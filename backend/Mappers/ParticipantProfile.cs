using AutoMapper;
using CertificateManagerAPI.DTO;
using CertificateManagerAPI.Entities;

namespace CertificateManagerAPI.Mappers
{
    public class ParticipantProfile : Profile
    {
        public ParticipantProfile()
        {
            CreateMap<Participant, ParticipantDTO>()
     .ForMember(dest => dest.ParticipantId, opt => opt.MapFrom(src => src.ParticipantId))

     .ForMember(dest => dest.Department, opt => opt.MapFrom(src => src.Department.DepartmentName));
        }
    }
}
