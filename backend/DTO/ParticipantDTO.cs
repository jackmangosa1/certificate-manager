namespace CertificateManagerAPI.DTO
{
    public class ParticipantDTO
    {
        public string Name { get; set; } = null!;

        public string FirstName { get; set; } = null!;

        public int UserId { get; set; }

        public string Department { get; set; } = null!;

        public string Plant { get; set; } = null!;

    }
}
