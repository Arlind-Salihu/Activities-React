using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Laptopat;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class LaptopatController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetLaptopat()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [Authorize]
        [HttpGet("{id}")] // laptopat/id
        public async Task<IActionResult> GetLaptopat(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateLaptopi(Laptopi laptopi){
            return HandleResult(await Mediator.Send(new Create.Command{Laptopi = laptopi}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditLaptopi(Guid id, Laptopi laptopi){
            
            laptopi.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Laptopi = laptopi}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLaptopi(Guid id){
            return HandleResult(await Mediator.Send(new Delete.Command{Id=id}));
        }
    }
}