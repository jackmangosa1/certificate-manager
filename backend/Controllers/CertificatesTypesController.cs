using CertificateManagerAPI.DTO;
using CertificateManagerAPI.Services.CertificateTypeService;
using Microsoft.AspNetCore.Mvc;

namespace CertificateManagerAPI.Controllers
{
    [Route("api/certificates/types")]
    [ApiController]
    public class CertificatesTypesController : ControllerBase
    {
        private readonly ICertificateTypeService _certificateTypeService;

        public CertificatesTypesController(ICertificateTypeService certificateTypeService)
        {
            _certificateTypeService = certificateTypeService;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<CertificateTypeDTO>>> GetAllCertificateTypes()
        {
            var certificateTypes = await _certificateTypeService.GetAllCertificateTypes();
            return Ok(certificateTypes);
        }
    }
}
