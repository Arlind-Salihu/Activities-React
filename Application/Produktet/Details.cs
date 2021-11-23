using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Produktet
{
    public class Details
    {
        public class Query : IRequest<Result<Produkti>>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<Produkti>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }

            public async Task<Result<Produkti>> Handle(Query request, CancellationToken cancellationToken)
            {
                var produkti = await _context.Produktet.FindAsync(request.Id);

                return Result<Produkti>.Success(produkti);
            }
        }
    }
}