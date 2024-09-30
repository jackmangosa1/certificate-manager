using CertificateManagerAPI.DTO;

namespace CertificateManagerAPI.Repositories.Interfaces
{
    public interface ICertificateCommentRepository
    {
        Task<CommentDTO> AddCommentToCertificate(int certificateId, CommentDTO commentDTO);
    }
}
