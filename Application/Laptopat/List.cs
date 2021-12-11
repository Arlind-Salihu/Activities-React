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

namespace Application.Laptopat
{
    public class List
    {
        public class Query : IRequest<Result<List<LaptopiDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<LaptopiDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<LaptopiDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var laptopat = await _context.Laptopat
                .ProjectTo<LaptopiDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

                return Result<List<LaptopiDto>>.Success(laptopat);
            }
        }
    }
}