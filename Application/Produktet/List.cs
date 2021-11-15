using System.Collections.Generic;
using MediatR;
using Domain;
using System.Threading.Tasks;
using System.Threading;
using Persistence;
using Microsoft.EntityFrameworkCore;
using System;
using Microsoft.Extensions.Logging;

namespace Application.Produktet
{
    public class List
    {
        public class Query : IRequest<List<Produkti>> { }

        public class Handler : IRequestHandler<Query, List<Produkti>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Produkti>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Produktet.ToListAsync(cancellationToken);
            }
        }
    }
}