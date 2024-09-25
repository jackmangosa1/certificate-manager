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

        [HttpGet("name")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ParticipantDTO>> GetParticipantByName([FromQuery] string name)
        {
            var participant = await _participantService.GetParticipantByName(name);

            if (participant == null)
            {
                return NotFound();
            }

            return Ok(participant);
        }

        [HttpGet("firstName")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ParticipantDTO>> GetParticipantByFirstName([FromQuery] string name)
        {
            var participant = await _participantService.GetParticipantByFirstName(name);

            if (participant == null)
            {
                return NotFound();
            }

            return Ok(participant);
        }

        [HttpGet("{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ParticipantDTO>> GetParticipantByUserId([FromQuery] int id)
        {
            var participant = await _participantService.GetParticipantByUserId(id);

            if (participant == null)
            {
                return NotFound();
            }

            return Ok(participant);
        }

        [HttpGet("departmentName")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<ParticipantDTO>> GetParticipantByDepartment([FromQuery] string name)
        {
            var participant = await _participantService.GetParticipantByDepartment(name);
            return Ok(participant);
        }

        [HttpGet("plantName")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ParticipantDTO>> GetParticipantByPlant([FromQuery] string name)
        {
            var participant = await _participantService.GetParticipantByPlant(name);

            if (participant == null)
            {
                return NotFound();
            }

            return Ok(participant);
        }
    }
}
