using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Telefonat
{
    public class Details
    {
        public class Query : IRequest<Result<Telefoni>>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<Telefoni>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }

            public async Task<Result<Telefoni>> Handle(Query request, CancellationToken cancellationToken)
            {
                var telefoni = await _context.Telefonat.FindAsync(request.Id);

                return Result<Telefoni>.Success(telefoni);
            }
        }
    }
}