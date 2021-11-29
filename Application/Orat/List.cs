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

namespace Application.Orat
{
    public class List
    {
        public class Query : IRequest<Result<List<Ora>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Ora>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Ora>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Ora>>.Success(await _context.Orat.ToListAsync(cancellationToken));
            }
        }
    }
}