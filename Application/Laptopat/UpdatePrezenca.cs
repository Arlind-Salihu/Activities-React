using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Laptopat
{
    public class UpdatePrezenca
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var laptopi = await _context.Laptopat
                .Include(a => a.LaptopatPrezencat).ThenInclude(u => u.AppUser)
                .SingleOrDefaultAsync(x => x.Id == request.Id);

                if(laptopi == null) return null;

                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                if(user == null) return null;
                
                var hostUsername = laptopi.LaptopatPrezencat.FirstOrDefault(x => x.isHost)?.AppUser.UserName;

                var prezenca = laptopi.LaptopatPrezencat.FirstOrDefault(x => x.AppUser.UserName == user.UserName);

                if(prezenca != null && hostUsername == user.UserName)
                laptopi.IsCancelled =!laptopi.IsCancelled;

                if(prezenca != null && hostUsername != user.UserName)
                laptopi.LaptopatPrezencat.Remove(prezenca);

                if(prezenca == null){
                    prezenca = new LaptopatPrezenca{
                        AppUser = user,
                        Laptopi = laptopi,
                        isHost = false
                    };

                    laptopi.LaptopatPrezencat.Add(prezenca);
                }

                var result = await _context.SaveChangesAsync() > 0;

                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Proble updating attendance");
            }
        }
    }
}