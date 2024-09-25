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

            CreateMap<Certificate, CreateCertificateDTO>()
                .ForMember(dest => dest.ValidFrom, opt => opt.MapFrom(src => src.ValidFrom.ToString("yyyy-MM-dd")))
                .ForMember(dest => dest.ValidTo, opt => opt.MapFrom(src => src.ValidTo.ToString("yyyy-MM-dd")));

            CreateMap<CreateCertificateDTO, Certificate>()
                .ForMember(dest => dest.ValidFrom, opt => opt.MapFrom(src => DateOnly.Parse(src.ValidFrom)))
                .ForMember(dest => dest.ValidTo, opt => opt.MapFrom(src => DateOnly.Parse(src.ValidTo)));

            CreateMap<Certificate, CertificateSummaryDTO>()
               .ForMember(dest => dest.SupplierName, opt => opt.MapFrom(src => src.Supplier.Name))
               .ForMember(dest => dest.CertificateTypeName, opt => opt.MapFrom(src => src.CertificateType.CertificateTypeName))
               .ForMember(dest => dest.ValidFrom, opt => opt.MapFrom(src => src.ValidFrom.ToString("yyyy-MM-dd")))
               .ForMember(dest => dest.ValidTo, opt => opt.MapFrom(src => src.ValidTo.ToString("yyyy-MM-dd")));

            CreateMap<CreateCertificateDTO, UpdateCertficateDTO>()
            .ReverseMap();

            CreateMap<UpdateCertficateDTO, Certificate>()
               .ForMember(dest => dest.ValidFrom, opt => opt.MapFrom(src => DateOnly.Parse(src.ValidFrom)))
               .ForMember(dest => dest.ValidTo, opt => opt.MapFrom(src => DateOnly.Parse(src.ValidTo)));
        }
    }
}
