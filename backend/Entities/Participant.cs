namespace CertificateManagerAPI.Entities;

public partial class Participant
{
    public int ParticipantId { get; set; }

    public string Name { get; set; } = null!;

    public string FirstName { get; set; } = null!;

    public int DepartmentId { get; set; }

    public string Plant { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public DateTime? DeletedAt { get; set; }

    public byte[]? RowVersion { get; set; }

    public virtual ICollection<CertificateAssignment> CertificateAssignments { get; set; } = new List<CertificateAssignment>();

    public virtual Department Department { get; set; } = null!;
}
