using CertificateManagerAPI.DTO;
using CertificateManagerAPI.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CertificateManagerAPI.Controllers
{
    [Route("api/certificates")]
    [ApiController]
    public class CertificateCommentController : ControllerBase
    {
        private readonly ICertificateCommentService _certificateCommentService;

        public CertificateCommentController(ICertificateCommentService certificateCommentService)
        {
            _certificateCommentService = certificateCommentService;
        }

        [HttpPost("{certificateId}/comments", Name = "AddCommentToCertificate")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<CommentDTO>> AddCommentToCertificate(int certificateId, [FromBody] CommentDTO commentDTO)
        {
            if (certificateId <= 0)
            {
                return BadRequest("Invalid certificate ID.");
            }

            if (commentDTO == null)
            {
                return BadRequest("Comment data is required.");
            }

            var certificateComment = await _certificateCommentService.AddCommentToCertificate(certificateId, commentDTO);
            return CreatedAtAction("AddCommentToCertificate", new { certificateId, commentId = commentDTO.CommentId }, certificateComment);
        }
    }
}
