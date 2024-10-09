using System.ComponentModel.DataAnnotations;

namespace CertificateManagerAPI.DTO
{
    public class CreateCertificateDTO
    {
        [Required]
        public int CertificateId { get; set; }

        [Required]
        public int SupplierId { get; set; }

        [Required]
        public int CertificateTypeId { get; set; }

        [Required]
        public DateTime ValidFrom { get; set; }

        [Required]
        public DateTime ValidTo { get; set; }

        [Required]
        public byte[] PdfDocumentData { get; set; } = null!;
    }
}
