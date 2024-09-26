using CertificateManagerAPI.DTO;
using CertificateManagerAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace CertificateMangerAPI.Controllers
{
    [Route("api/certificates")]
    [ApiController]
    public class CertificateController : ControllerBase
    {
        private readonly ICertificateService _certificateService;

        public CertificateController(ICertificateService certificateService)
        {
            _certificateService = certificateService;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<CertificateSummaryDTO>>> GetAllCertificates()
        {
            var certificates = await _certificateService.GetAllCertificatesAsync();
            return Ok(certificates);
        }

        [HttpGet("{id:int}", Name = "GetCertificate")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<CreateCertificateDTO>> GetCertificate(int id)
        {
            var certificate = await _certificateService.GetCertificateByIdAsync(id);

            if (id <= 0)
            {
                return BadRequest("Invalid ID. ID must be greater than zero.");
            }

            if (certificate == null)
            {
                return NotFound();
            }

            return Ok(certificate);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<CreateCertificateDTO>> CreateCertificate(CreateCertificateDTO certificateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (certificateDto.CertificateId > 0)
            {
                return BadRequest("Certficate ID must not be set when creating a new certificate.");
            }

            if (!DateOnly.TryParse(certificateDto.ValidFrom, out var validFrom))
            {
                ModelState.AddModelError("ValidFrom", "Invalid date format for ValidFrom.");
                return BadRequest(ModelState);
            }

            if (!DateOnly.TryParse(certificateDto.ValidTo, out var validTo))
            {
                ModelState.AddModelError("ValidTo", "Invalid date format for ValidTo.");
                return BadRequest(ModelState);
            }

            if (validFrom > validTo)
            {
                ModelState.AddModelError("ValidDateRange", "ValidFrom must be before ValidTo.");
                return BadRequest(ModelState);
            }

            var certificate = await _certificateService.CreateCertificateAsync(certificateDto);
            return CreatedAtRoute("GetCertificate", new { id = certificate.CertificateId }, certificate);
        }

        [HttpPut("{id:int}", Name = "UpdateCertificate")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult> UpdateCertificate(int id, UpdateCertficateDTO certificateDTO)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid ID. ID must be greater than zero.");
            }

            await _certificateService.UpdateCertificateAsync(id, certificateDTO);
            return NoContent();
        }

        [HttpDelete("{id:int}", Name = "DeleteCertificate")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult> DeleteCertificate(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid ID. ID must be greater than zero.");
            }

            await _certificateService.DeleteCertificateAsync(id);
            return NoContent();
        }
    }
}
