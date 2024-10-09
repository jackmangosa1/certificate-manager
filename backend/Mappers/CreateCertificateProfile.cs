using AutoMapper;
using CertificateManagerAPI.DTO;
using CertificateManagerAPI.Entities;

namespace CertificateManagerAPI.Mappers
{
    public class CreateCertificateProfile : Profile
    {
        public CreateCertificateProfile()
        {
            CreateMap<Certificate, CreateCertificateDTO>()
               .ForMember(dest => dest.ValidFrom,
                   opt => opt.MapFrom(src => src.ValidFrom.ToDateTime(TimeOnly.MinValue)))
               .ForMember(dest => dest.ValidTo,
                   opt => opt.MapFrom(src => src.ValidTo.ToDateTime(TimeOnly.MinValue)))
               .ReverseMap()
               .ForMember(dest => dest.ValidFrom,
                   opt => opt.MapFrom(src => DateOnly.FromDateTime(src.ValidFrom)))
               .ForMember(dest => dest.ValidTo,
                   opt => opt.MapFrom(src => DateOnly.FromDateTime(src.ValidTo)));
        }
    }
}
