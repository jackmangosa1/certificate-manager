using CertificateManagerAPI.DTO;

namespace CertificateManagerAPI.Services.Interfaces
{
    public interface ICertificateCommentService
    {
        Task<CommentDTO> AddCommentToCertificate(int certificateId, CommentDTO commentDTO);
    }
}
