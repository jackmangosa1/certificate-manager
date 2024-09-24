using System.ComponentModel.DataAnnotations;

namespace CertificateManagerAPI.DTO
{
    public class CertificateDTO
    {
        [Required]
        public int CertificateId { get; set; }

        [Required]
        public int SupplierId { get; set; }

        [Required]
        public int CertificateTypeId { get; set; }

        [Required]
        public string ValidFrom { get; set; } = null!;

        [Required]
        public string ValidTo { get; set; } = null!;

        [Required]
        [Url(ErrorMessage = "Invalid URL format for PDF document.")]
        public string PdfDocumentUrl { get; set; } = null!;
    }
}
