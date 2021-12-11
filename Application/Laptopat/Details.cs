using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Laptopat
{
    public class Details
    {
        public class Query : IRequest<Result<LaptopiDto>>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<LaptopiDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }

            public async Task<Result<LaptopiDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var laptopi = await _context.Laptopat
                .ProjectTo<LaptopiDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Id == request.Id);

                return Result<LaptopiDto>.Success(laptopi);
            }
        }
    }
}