using AutoMapper;
using CertificateManagerAPI.DTO;
using CertificateManagerAPI.Entities;

namespace CertificateManagerAPI.Mappers
{
    public class CertificateSummaryProfile : Profile
    {
        public CertificateSummaryProfile()
        {
            CreateMap<Certificate, CertificateSummaryDTO>()
                .ForMember(dest => dest.SupplierName,
                    opt => opt.MapFrom(src => src.Supplier.Name))

                .ForMember(dest => dest.CertificateTypeName,
                    opt => opt.MapFrom(src => src.CertificateType.CertificateTypeName))

                .ForMember(dest => dest.ValidFrom,
                    opt => opt.MapFrom(src => src.ValidFrom.ToString("yyyy-MM-dd")))

                .ForMember(dest => dest.ValidTo,
                    opt => opt.MapFrom(src => src.ValidTo.ToString("yyyy-MM-dd")));
        }
    }
}
