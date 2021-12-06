using System.Collections.Generic;
using MediatR;
using Domain;
using System.Threading.Tasks;
using System.Threading;
using Persistence;
using Microsoft.EntityFrameworkCore;
using System;
using Microsoft.Extensions.Logging;
using Application.Core;

namespace Application.Laptopat
{
    public class List
    {
        public class Query : IRequest<Result<List<Laptopi>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Laptopi>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Laptopi>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Laptopi>>.Success(await _context.Laptopat.ToListAsync(cancellationToken));
            }
        }
    }
}