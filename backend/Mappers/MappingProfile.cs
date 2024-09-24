using AutoMapper;
using CertificateManagerAPI.DTO;
using CertificateManagerAPI.Entities;

namespace CertificateMangerAPI.Mappers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<string, DateOnly>().ConvertUsing<StringToDateOnlyConverter>();

            CreateMap<Certificate, CertificateDTO>()
                .ForMember(dest => dest.ValidFrom, opt => opt.MapFrom(src => src.ValidFrom.ToString("yyyy-MM-dd")))
                .ForMember(dest => dest.ValidTo, opt => opt.MapFrom(src => src.ValidTo.ToString("yyyy-MM-dd")));

            CreateMap<CertificateDTO, Certificate>()
                .ForMember(dest => dest.ValidFrom, opt => opt.MapFrom(src => DateOnly.Parse(src.ValidFrom)))
                .ForMember(dest => dest.ValidTo, opt => opt.MapFrom(src => DateOnly.Parse(src.ValidTo)));
        }
    }
}
