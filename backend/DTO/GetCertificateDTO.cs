namespace CertificateManagerAPI.DTO
{
    public class GetCertificateDTO
    {
        public int CertificateId { get; set; }
        public SupplierDTO Supplier { get; set; } = null!;
        public string CertificateTypeName { get; set; } = null!;

        public string ValidFrom { get; set; } = null!;

        public string ValidTo { get; set; } = null!;

        public byte[] PdfDocumentData { get; set; } = null!;

        public List<CommentDTO> Comments { get; set; } = null!;

        public List<ParticipantDTO> Participants { get; set; } = null!;

    }
}
