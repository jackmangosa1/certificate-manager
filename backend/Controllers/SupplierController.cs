using CertificateManagerAPI.DTO;
using CertificateManagerAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace CertificateManagerAPI.Controllers
{
    [Route("api/suppliers")]
    [ApiController]
    public class SupplierController : ControllerBase
    {
        private readonly ISupplierService _supplierService;

        public SupplierController(ISupplierService supplierService)
        {
            _supplierService = supplierService;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<List<SupplierDTO>>> SearchSuppliers([FromQuery] SupplierSearchDTO searchCriteria)
        {
            var suppliers = await _supplierService.SearchSuppliers(searchCriteria);

            if (suppliers == null || suppliers.Count == 0)
            {
                return NotFound();
            }

            return Ok(suppliers);
        }
    }
}
