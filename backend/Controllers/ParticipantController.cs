using CertificateManagerAPI.DTO;
using CertificateManagerAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace CertificateManagerAPI.Controllers
{
    [Route("api/participants")]
    [ApiController]
    public class ParticipantController : ControllerBase
    {
        private readonly IParticipantService _participantService;

        public ParticipantController(IParticipantService participantService)
        {
            _participantService = participantService;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<List<ParticipantDTO>>> GetParticipants(
            [FromQuery] string? name = null,
            [FromQuery] string? firstName = null,
            [FromQuery] int? userId = null,
            [FromQuery] string? department = null,
            [FromQuery] string? plant = null)
        {
            var participants = await _participantService.SearchParticipants(name, firstName, userId, department, plant);

            if (participants == null || participants.Count == 0)
            {
                return NotFound();
            }

            return Ok(participants);
        }
    }
}
