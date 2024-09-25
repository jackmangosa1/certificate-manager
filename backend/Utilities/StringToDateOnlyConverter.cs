using AutoMapper;

namespace CertificateManagerAPI.Utilities
{
    public class StringToDateOnlyConverter : ITypeConverter<string, DateOnly>
    {
        public DateOnly Convert(string source, DateOnly destination, ResolutionContext context)
        {
            if (DateOnly.TryParse(source, out DateOnly result))
            {
                return result;
            }
            throw new AutoMapperMappingException($"Unable to convert {source} to DateOnly");
        }
    }
}
