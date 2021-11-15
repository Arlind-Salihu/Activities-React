using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Produktet;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ProduktetController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Produkti>>> GetProduktet()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")] // produktet/id
        public async Task<ActionResult<Produkti>> GetProdukti(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<IActionResult> CreateProdukti(Produkti produkti){
            return Ok(await Mediator.Send(new Create.Command{Produkti = produkti}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditProdukti(Guid id, Produkti produkti){
            
            produkti.Id = id;
            return Ok(await Mediator.Send(new Edit.Command{Produkti = produkti}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProdukti(Guid id){
            return Ok(await Mediator.Send(new Delete.Command{Id=id}));
        }
    }
}