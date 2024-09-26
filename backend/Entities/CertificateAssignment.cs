using System;
using System.Collections.Generic;

namespace CertificateManagerAPI.Entities;

public partial class CertificateAssignment
{
    public int CertificateAssignmentId { get; set; }

    public int CertificateId { get; set; }

    public int ParticipantId { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public DateTime? DeletedAt { get; set; }

    public byte[]? RowVersion { get; set; }

    public virtual Certificate Certificate { get; set; } = null!;

    public virtual Participant Participant { get; set; } = null!;
}
