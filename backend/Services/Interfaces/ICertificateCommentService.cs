using CertificateManagerAPI.DTO;

namespace CertificateManagerAPI.Services
{
    public interface ICertificateCommentService
    {
        Task<CommentDTO> AddCommentToCertificate(int certificateId, CommentDTO commentDTO);
    }
}
