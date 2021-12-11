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
using AutoMapper;
using AutoMapper.QueryableExtensions;

namespace Application.Orat
{
    public class List
    {
        public class Query : IRequest<Result<List<OraDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<OraDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<OraDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var orat = await _context.Orat
                .ProjectTo<OraDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

                return Result<List<OraDto>>.Success(orat);
            }
        }
    }
}