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

namespace Application.Produktet
{
    public class List
    {
        public class Query : IRequest<Result<List<Produkti>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Produkti>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Produkti>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Produkti>>.Success(await _context.Produktet.ToListAsync(cancellationToken));
            }
        }
    }
}