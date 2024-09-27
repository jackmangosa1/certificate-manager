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
        public async Task<ActionResult<List<ParticipantDTO>>> SearchParticipants([FromQuery] ParticipantSearchDTO searchCriteria)
        {
            var participants = await _participantService.SearchParticipants(searchCriteria);

            if (participants == null || participants.Count == 0)
            {
                return NotFound();
            }

            return Ok(participants);
        }
    }
}
