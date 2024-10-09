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
                .ForMember(dest => dest.ValidFrom,
                    opt => opt.MapFrom(src => src.ValidFrom.ToDateTime(TimeOnly.MinValue)))
                .ForMember(dest => dest.ValidTo,
                    opt => opt.MapFrom(src => src.ValidTo.ToDateTime(TimeOnly.MinValue)))
                .ForMember(dest => dest.SupplierDetails,
                    opt => opt.MapFrom(src => $"{src.Supplier.Name}, {src.Supplier.SupplierIndex}, {src.Supplier.City}"))
                .ForMember(dest => dest.CertificateTypeName,
                    opt => opt.MapFrom(src => src.CertificateType.CertificateTypeName));
        }
    }
}
