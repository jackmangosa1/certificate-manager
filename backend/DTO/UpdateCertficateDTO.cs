using System.ComponentModel.DataAnnotations;

namespace CertificateManagerAPI.DTO
{
    public class UpdateCertficateDTO
    {
        public int SupplierId { get; set; }

        public int CertificateTypeId { get; set; }

        public string ValidFrom { get; set; } = null!;

        public string ValidTo { get; set; } = null!;

        [Url(ErrorMessage = "Invalid URL format for PDF document.")]
        public string PdfDocumentUrl { get; set; } = null!;
    }
}
