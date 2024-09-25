namespace CertificateManagerAPI.Entities;

public partial class Certificate
{
    public int CertificateId { get; set; }

    public int SupplierId { get; set; }

    public int CertificateTypeId { get; set; }

    public DateOnly ValidFrom { get; set; }

    public DateOnly ValidTo { get; set; }

    public string PdfDocumentUrl { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public DateTime? DeletedAt { get; set; }

    public byte[]? RowVersion { get; set; }

    public virtual ICollection<CertificateAssignment> CertificateAssignments { get; set; } = new List<CertificateAssignment>();

    public virtual CertificateType CertificateType { get; set; } = null!;

    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();

    public virtual Supplier Supplier { get; set; } = null!;
}
