namespace CertificateManagerAPI.Entities;

public partial class Comment
{
    public int CommentId { get; set; }

    public int CertificateId { get; set; }

    public int UserId { get; set; }

    public string CommentText { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public DateTime? DeletedAt { get; set; }

    public byte[]? RowVersion { get; set; }

    public virtual Certificate Certificate { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
