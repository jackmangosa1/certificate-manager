using System.ComponentModel.DataAnnotations;

namespace CertificateManagerAPI.DTO
{
    public class UpdateCertificateDTO
    {
        [Required]
        public int SupplierId { get; set; }

        [Required]
        public int CertificateTypeId { get; set; }

        [Required]
        public string ValidFrom { get; set; } = null!;

        [Required]
        public string ValidTo { get; set; } = null!;

        [Required]
        public byte[] PdfDocumentData { get; set; } = null!;

        public List<int> ParticipantIds { get; set; } = new List<int>();

        public List<CommentDTO> CommentsToAdd { get; set; } = new List<CommentDTO>();
    }


}
