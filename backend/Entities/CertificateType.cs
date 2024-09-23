using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class CertificateType
{
    public int CertificateTypeId { get; set; }

    public string CertificateTypeName { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public DateTime? DeletedAt { get; set; }

    public byte[]? RowVersion { get; set; }

    public virtual ICollection<Certificate> Certificates { get; set; } = new List<Certificate>();
}
