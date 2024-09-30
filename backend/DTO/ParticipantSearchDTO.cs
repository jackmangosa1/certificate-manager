namespace CertificateManagerAPI.DTO
{
    public class ParticipantSearchDTO
    {
        public int? ParticipantId { get; set; }

        public string? Name { get; set; } = null!;

        public string? FirstName { get; set; } = null!;

        public string? Department { get; set; } = null!;

        public string? Plant { get; set; } = null!;
    }
}
