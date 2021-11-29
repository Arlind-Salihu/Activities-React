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

namespace Application.Telefonat
{
    public class List
    {
        public class Query : IRequest<Result<List<Telefoni>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Telefoni>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Telefoni>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Telefoni>>.Success(await _context.Telefonat.ToListAsync(cancellationToken));
            }
        }
    }
}