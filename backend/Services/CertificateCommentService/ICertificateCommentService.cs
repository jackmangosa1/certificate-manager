using CertificateManagerAPI.DTO;

namespace CertificateManagerAPI.Services.CertificateCommentService
{
    public interface ICertificateCommentService
    {
        Task<CommentDTO> AddCommentToCertificate(int certificateId, CommentDTO commentDTO);
    }
}
