using AutoMapper;
using CertificateManagerAPI.DTO;
using CertificateManagerAPI.Entities;
using CertificateManagerAPI.Utilities;

namespace CertificateManagerAPI.Mappers
{
    public class CreateCertificateProfile : Profile
    {
        public CreateCertificateProfile()
        {
            CreateMap<string, DateOnly>().ConvertUsing<StringToDateOnlyConverter>();

            CreateMap<Certificate, CreateCertificateDTO>()
                .ForMember(dest => dest.ValidFrom, opt => opt.MapFrom(src => src.ValidFrom.ToString("yyyy-MM-dd")))
                .ForMember(dest => dest.ValidTo, opt => opt.MapFrom(src => src.ValidTo.ToString("yyyy-MM-dd")));

            CreateMap<CreateCertificateDTO, Certificate>()
                .ForMember(dest => dest.ValidFrom, opt => opt.MapFrom(src => DateOnly.Parse(src.ValidFrom)))
                .ForMember(dest => dest.ValidTo, opt => opt.MapFrom(src => DateOnly.Parse(src.ValidTo)));
        }
    }
}
