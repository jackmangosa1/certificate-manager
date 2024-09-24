﻿using CertificateManagerAPI.DTO;
using CertificateManagerAPI.Services;
using Microsoft.AspNetCore.JsonPatch;
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

        [HttpGet("{id:int}", Name = "GetCertificate")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<CertificateDTO>> GetCertificate(int id)
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

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<CertificateDTO>>> GetAllCertificates()
        {
            var certificates = await _certificateService.GetAllCertificatesAsync();
            return Ok(certificates);
        }


        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<CertificateDTO>> CreateCertificate([FromBody] CertificateDTO certificateDto)
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

        [HttpDelete("{id:int}", Name = "DeleteBook")]
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

        [HttpPut("{id:int}", Name = "UpdateBook")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult> UpdateCertificate(int id, CertificateDTO certificateDTO)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid ID. ID must be greater than zero.");
            }

            await _certificateService.UpdateCertificateAsync(id, certificateDTO);
            return NoContent();
        }

        [HttpPatch("{id:int}")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> PatchCertificate(int id, [FromBody] JsonPatchDocument<CertificateDTO> certificateUpdates)
        {
            if (certificateUpdates == null)
            {
                return BadRequest("Certificate cannot be null");
            }

            var certificate = await _certificateService.GetCertificateByIdAsync(id);
            if (certificate == null)
            {
                return NotFound("Certificate is not found");
            }

            certificateUpdates.ApplyTo(certificate);
            await _certificateService.UpdateCertificateAsync(id, certificate);
            return NoContent();
        }
    }
}
