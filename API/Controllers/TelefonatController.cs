using System;
using System.Threading.Tasks;
using Application.Telefonat;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{
    [AllowAnonymous]
    public class TelefonatController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetTelefonat()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
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

        [HttpPut("{id}")]
        public async Task<IActionResult> EditTelefoni(Guid id, Telefoni telefoni){
            
            telefoni.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Telefoni = telefoni}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTelefoni(Guid id){
            return HandleResult(await Mediator.Send(new Delete.Command{Id=id}));
        }
    }
}