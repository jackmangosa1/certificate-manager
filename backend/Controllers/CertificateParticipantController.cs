using CertificateManagerAPI.DTO;
using CertificateManagerAPI.Services.CertificateParticipantService;
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

        [HttpPost("{certificateId}/participants", Name = "AddParticipantsToCertificate")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<IEnumerable<CertificateParticipantDTO>>> AddParticipantsToCertificate(int certificateId, [FromBody] IEnumerable<ParticipantDTO> participantDTOs)
        {
            if (certificateId <= 0)
            {
                return BadRequest("Invalid certificate ID.");
            }

            if (participantDTOs == null || !participantDTOs.Any())
            {
                return BadRequest("Participant data is required.");
            }

            var addedParticipants = await _certificateParticipantService.AddParticipantsToCertificate(certificateId, participantDTOs);
            return CreatedAtAction("AddParticipantsToCertificate", new { certificateId }, addedParticipants);
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
