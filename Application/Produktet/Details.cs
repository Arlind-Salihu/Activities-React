using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Produktet
{
    public class Details
    {
        public class Query : IRequest<Produkti>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Produkti>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }

            public async Task<Produkti> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Produktet.FindAsync(request.Id);
            }
        }
    }
}