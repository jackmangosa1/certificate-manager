using CertificateManagerAPI.Data;
using CertificateManagerAPI.DTO;
using CertificateManagerAPI.Entities;
using CertificateManagerAPI.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CertificateManagerAPI.Repositories.Implementations
{
    public class CertificateCommentRepository : ICertificateCommentRepository
    {
        private readonly CertificateManagerDbContext _context;

        public CertificateCommentRepository(CertificateManagerDbContext context)
        {
            _context = context;
        }

        public async Task<CommentDTO> AddCommentToCertificate(int certificateId, CommentDTO commentDTO)
        {
            var certificate = await _context.Certificates
                .Include(c => c.Comments)
                .FirstOrDefaultAsync(c => c.CertificateId == certificateId);

            if (certificate == null)
            {
                throw new ArgumentException($"Certificate with ID {certificateId} not found.");
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == commentDTO.Username);
            if (user == null)
            {
                throw new ArgumentException($"User with username {commentDTO.Username} not found.");
            }

            var newComment = new Comment
            {
                CertificateId = certificateId,
                UserId = user.UserId,
                CommentText = commentDTO.CommentText,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
            };

            certificate.Comments.Add(newComment);
            await _context.SaveChangesAsync();

            var commenrDTO = new CommentDTO
            {
                Username = user.Username,
                CommentText = newComment.CommentText
            };

            return commentDTO;
        }
    }
}
