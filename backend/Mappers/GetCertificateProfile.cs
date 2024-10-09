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
                .ForMember(dest => dest.ValidFrom,
                    opt => opt.MapFrom(src => src.ValidFrom.ToDateTime(TimeOnly.MinValue)))
                .ForMember(dest => dest.ValidTo,
                    opt => opt.MapFrom(src => src.ValidTo.ToDateTime(TimeOnly.MinValue)))
                .ForMember(dest => dest.Comments, opt => opt.MapFrom(src => src.Comments))
                .ForMember(dest => dest.Participants, opt => opt.MapFrom(src => src.CertificateAssignments.Select(ca => ca.Participant)))
                .ForMember(dest => dest.Supplier, opt => opt.MapFrom(src => src.Supplier))
                .ForMember(dest => dest.CertificateTypeName, opt => opt.MapFrom(src => src.CertificateType.CertificateTypeName));
        }
    }
}
