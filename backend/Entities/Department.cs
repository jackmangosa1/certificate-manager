namespace CertificateManagerAPI.Entities;

public partial class Department
{
    public int DepartmentId { get; set; }

    public string DepartmentName { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public DateTime? DeletedAt { get; set; }

    public byte[]? RowVersion { get; set; }

    public virtual ICollection<Participant> Participants { get; set; } = new List<Participant>();
}
