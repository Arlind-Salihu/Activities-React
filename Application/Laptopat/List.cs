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
            private readonly DataContext _contextLaptopi;
            public Handler(DataContext contextLaptopi)
            {
                _contextLaptopi = contextLaptopi;
            }

            public async Task<Result<List<Laptopi>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Laptopi>>.Success(await _contextLaptopi.Laptopat.ToListAsync(cancellationToken));
            }
        }
    }
}