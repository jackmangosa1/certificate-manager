using CertificateManagerAPI.DTO;

namespace CertificateManagerAPI.Repositories.CertificateCommentRepository
{
    public interface ICertificateCommentRepository
    {
        Task<CommentDTO> AddCommentToCertificate(int certificateId, CommentDTO commentDTO);
    }
}
