using AutoMapper;
using CertificateManagerAPI.DTO;
using CertificateManagerAPI.Entities;

namespace CertificateManagerAPI.Mappers
{
    public class GetCertificateProfile : Profile
    {
        public GetCertificateProfile()
        {
            CreateMap<Certificate, GetCertificateDTO>()
                .ForMember(dest => dest.Comments,
                    opt => opt.MapFrom(src => src.Comments))

                .ForMember(dest => dest.Participants,
                    opt => opt.MapFrom(src => src.CertificateAssignments.Select(ca => ca.Participant)));

            CreateMap<Comment, CommentDTO>()
                .ForMember(dest => dest.Username,
                    opt => opt.MapFrom(src => src.User.Username));

            CreateMap<Participant, ParticipantDTO>()
                .ForMember(dest => dest.Department,
                    opt => opt.MapFrom(src => src.Department.DepartmentName));
        }
    }
}
