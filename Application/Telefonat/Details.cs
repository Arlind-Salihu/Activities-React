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

namespace Application.Telefonat
{
    public class Details
    {
        public class Query : IRequest<Result<TelefoniDto>>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<TelefoniDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }

            public async Task<Result<TelefoniDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var telefoni = await _context.Telefonat
                .ProjectTo<TelefoniDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Id == request.Id);

                return Result<TelefoniDto>.Success(telefoni);
            }
        }
    }
}