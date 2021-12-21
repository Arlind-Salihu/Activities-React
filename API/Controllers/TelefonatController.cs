using System;
using System.Threading.Tasks;
using Application.Core;
using Application.Telefonat;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{
    public class TelefonatController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetTelefonat([FromQuery]TelefoniParams param)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query{Params = param}));
        }

        [HttpGet("{id}")] // telefonat/id
        public async Task<IActionResult> GetTelefonat(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateTelefoni(Telefoni telefoni){
            return HandleResult(await Mediator.Send(new Create.Command{Telefoni = telefoni}));
        }

        [Authorize(policy: "IsHost")]
        [HttpPut("{id}")]
        public async Task<IActionResult> EditTelefoni(Guid id, Telefoni telefoni){
            
            telefoni.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Telefoni = telefoni}));
        }

        [Authorize(policy: "IsHost")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTelefoni(Guid id){
            return HandleResult(await Mediator.Send(new Delete.Command{Id=id}));
        }

        [HttpPost("{id}/attend")]
        public async Task<IActionResult> Attend(Guid id){
            return HandleResult(await Mediator.Send(new UpdatePrezenca.Command{Id = id}));
        }
    }
}