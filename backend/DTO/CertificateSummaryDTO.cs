namespace CertificateManagerAPI.DTO
{
    public class CertificateSummaryDTO
    {
        public int CertificateId { get; set; }

        public string SupplierDetails { get; set; } = null!;

        public string CertificateTypeName { get; set; } = null!;

        public string ValidFrom { get; set; } = null!;

        public string ValidTo { get; set; } = null!;
    }
}
