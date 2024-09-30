using CertificateManagerAPI.DTO;

namespace CertificateManagerAPI.Repositories
{
    public interface ICertificateCommentRepository
    {
        Task<CommentDTO> AddCommentToCertificate(int certificateId, CommentDTO commentDTO);
    }
}
