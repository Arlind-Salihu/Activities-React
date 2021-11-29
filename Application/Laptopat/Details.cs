using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Laptopat
{
    public class Details
    {
        public class Query : IRequest<Result<Laptopi>>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<Laptopi>>
        {
            private readonly DataContext _contextLaptopi;
            public Handler(DataContext contextLaptopi)
            {
                _contextLaptopi = contextLaptopi;

            }

            public async Task<Result<Laptopi>> Handle(Query request, CancellationToken cancellationToken)
            {
                var laptopi = await _contextLaptopi.Laptopat.FindAsync(request.Id);

                return Result<Laptopi>.Success(laptopi);
            }
        }
    }
}