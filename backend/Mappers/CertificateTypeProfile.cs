using AutoMapper;
using CertificateManagerAPI.DTO;
using CertificateManagerAPI.Entities;

namespace CertificateManagerAPI.Mappers
{
    public class CertificateTypeProfile : Profile
    {
        public CertificateTypeProfile()
        {
            CreateMap<CertificateType, CertificateTypeDTO>().ReverseMap();
        }
    }
}
