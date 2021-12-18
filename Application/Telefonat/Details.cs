using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
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
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _mapper = mapper;
                _context = context;

            }

            public async Task<Result<TelefoniDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var telefoni = await _context.Telefonat
                .ProjectTo<TelefoniDto>(_mapper.ConfigurationProvider, new {currentUsername = _userAccessor.GetUsername()})
                .FirstOrDefaultAsync(x => x.Id == request.Id);

                return Result<TelefoniDto>.Success(telefoni);
            }
        }
    }
}