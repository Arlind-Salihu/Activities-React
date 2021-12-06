using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Orat;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class OratController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetOrat()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }
        
        [Authorize]
        [HttpGet("{id}")] // orat/id
        public async Task<IActionResult> GetOrat(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateOra(Ora ora){
            return HandleResult(await Mediator.Send(new Create.Command{Ora = ora}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditOra(Guid id, Ora ora){
            
            ora.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Ora = ora}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOra(Guid id){
            return HandleResult(await Mediator.Send(new Delete.Command{Id=id}));
        }
    }
}