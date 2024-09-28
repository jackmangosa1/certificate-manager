using CertificateManagerAPI.DTO;
using CertificateManagerAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace CertificateManagerAPI.Controllers
{
    [Route("api/certificates")]
    [ApiController]
    public class CertificateParticipantController : ControllerBase
    {
        private readonly ICertificateParticipantService _certificateParticipantService;

        public CertificateParticipantController(ICertificateParticipantService certificateParticipantService)
        {
            _certificateParticipantService = certificateParticipantService;
        }

        [HttpPost("{certificateId}/participants", Name = "AddParticipantToCertificate")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<CertificateParticipantDTO>> AddParticipantToCertificate(int certificateId, [FromBody] ParticipantDTO participantDTO)
        {
            if (certificateId <= 0)
            {
                return BadRequest("Invalid certificate ID.");
            }

            if (participantDTO == null)
            {
                return BadRequest("Participant data is required.");
            }

            var certificateParticipant = await _certificateParticipantService.AddParticipantToCertificate(certificateId, participantDTO);
            return CreatedAtAction("AddParticipantToCertificate", new { certificateId, participantId = participantDTO.ParticipantId }, certificateParticipant);
        }

        [HttpDelete("{certificateId}/participants/{participantId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> RemoveParticipantFromCertificate(int certificateId, int participantId)
        {
            if (certificateId <= 0)
            {
                return BadRequest("Invalid certificate ID.");
            }

            if (participantId <= 0)
            {
                return BadRequest("Invalid participant ID.");
            }

            await _certificateParticipantService.RemoveParticipantFromCertificate(certificateId, participantId);
            return NoContent();
        }
    }
}