using HappyCommunication.API.Entity;
using HappyCommunication.API.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HappyCommunication.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommunicationsController : ControllerBase
    {
        private readonly ICommunicationService _communicationService;
        public CommunicationsController(ICommunicationService communicationService) =>
            _communicationService = communicationService;

        [HttpGet("{connectionID}")]
        public List<Communication> Get(string connectionID) => _communicationService.GetProduct(connectionID);

        [HttpPost("UpdateProduct")]
        public async Task UpdateProduct([FromBody] Communication communication) => await _communicationService.UpdateProduct(communication).ConfigureAwait(false);

        [HttpGet("ProductDetail/{id}")]
        public Communication GetByIdProduct(int id) => _communicationService.GetByIdProduct(id);
    }
}
