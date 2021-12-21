using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Telefonat;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
namespace Application.Profiles
{
    public class ListTelefonat
    {
        public class Query : IRequest<Result<List<UserTelefoniDto>>>
        {
            public string Username { get; set; }
            public string Predicate { get; set; }
        }
        public class Handler : IRequestHandler<Query,
        Result<List<UserTelefoniDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }
            public async Task<Result<List<UserTelefoniDto>>> Handle(Query
            request, CancellationToken cancellationToken)
            {
                var query = _context.TelefonatPrezencas
                .Where(u => u.AppUser.UserName == request.Username)
                .OrderBy(a => a.Telefoni.Data)
                .ProjectTo<UserTelefoniDto>(_mapper.ConfigurationProvider)
                .AsQueryable();
                query = request.Predicate switch
                {
                    "past" => query.Where(a => a.Data <= DateTime.Now),
                    "hosting" => query.Where(a => a.HostUsername ==
                    request.Username),
                    _ => query.Where(a => a.Data >= DateTime.Now)
                };
                var activities = await query.ToListAsync();
                return Result<List<UserTelefoniDto>>.Success(activities);
            }
        }
    }
}