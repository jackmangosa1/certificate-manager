using AutoMapper;
using CertificateManagerAPI.DTO;
using CertificateManagerAPI.Entities;

namespace CertificateManagerAPI.Mappers
{
    public class UpdateCertificateProfile : Profile
    {
        public UpdateCertificateProfile()
        {
            CreateMap<UpdateCertficateDTO, Certificate>()
               .ForMember(dest => dest.ValidFrom, opt => opt.MapFrom(src => DateOnly.Parse(src.ValidFrom)))
               .ForMember(dest => dest.ValidTo, opt => opt.MapFrom(src => DateOnly.Parse(src.ValidTo)));

            CreateMap<CreateCertificateDTO, UpdateCertficateDTO>().ReverseMap();
        }
    }
}
