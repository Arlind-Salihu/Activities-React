using System.Collections.Generic;
using MediatR;
using Domain;
using System.Threading.Tasks;
using System.Threading;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Application.Interfaces;
using System.Linq;

namespace Application.Telefonat
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<TelefoniDto>>> {
            public TelefoniParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<TelefoniDto>>>
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

            public async Task<Result<PagedList<TelefoniDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.Telefonat
                .Where(d => d.Data >= request.Params.StartDate)
                .OrderBy(d => d.Data)
                .ProjectTo<TelefoniDto>(_mapper.ConfigurationProvider, new {currentUsername = _userAccessor.GetUsername()})
                .AsQueryable();

                if (request.Params.IsInteresed && !request.Params.IsHost){
                    query = query.Where(x => x.TelefonatPrezencat.Any(a => a.Username == _userAccessor.GetUsername()));
                }

                if(request.Params.IsHost && !request.Params.IsInteresed){
                    query = query.Where(x => x.HostUsername == _userAccessor.GetUsername());
                }

                return Result<PagedList<TelefoniDto>>.Success(
                    await PagedList<TelefoniDto>.CreateAsync(query, request.Params.PageNumber, request.Params.PageSize)
                );
            }
        }
    }
}