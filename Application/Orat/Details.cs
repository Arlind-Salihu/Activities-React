using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Orat
{
    public class Details
    {
        public class Query : IRequest<Result<Ora>>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<Ora>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }

            public async Task<Result<Ora>> Handle(Query request, CancellationToken cancellationToken)
            {
                var ora = await _context.Orat.FindAsync(request.Id);

                return Result<Ora>.Success(ora);
            }
        }
    }
}