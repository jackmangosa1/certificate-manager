namespace CertificateManagerAPI.DTO
{
    public class GetCertificateDTO
    {
        public int CertificateId { get; set; }
        public SupplierDTO Supplier { get; set; } = null!;
        public string CertificateTypeName { get; set; } = null!;

        public DateTime ValidFrom { get; set; }

        public DateTime ValidTo { get; set; }

        public byte[] PdfDocumentData { get; set; } = null!;

        public List<CommentDTO> Comments { get; set; } = null!;

        public List<ParticipantDTO> Participants { get; set; } = null!;

    }
}
