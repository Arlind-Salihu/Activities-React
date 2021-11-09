using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ProduktetController : BaseApiController
    {
        private readonly DataContext _context;
        public ProduktetController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Produkti>>> GetProduktet(){
            return await _context.Produktet.ToListAsync();
        }

        [HttpGet("{id}")] // produktet/id
        public async Task<ActionResult<Produkti>> GetProdukti(Guid id){
            return await _context.Produktet.FindAsync(id);
        }
    }
}