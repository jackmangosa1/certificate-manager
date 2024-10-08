namespace CertificateManagerAPI.DTO
{
    public class CommentDTO
    {
        public int CommentId { get; set; }

        public int UserId { get; set; }

        public string Username { get; set; } = null!;

        public string CommentText { get; set; } = null!;
    }
}
