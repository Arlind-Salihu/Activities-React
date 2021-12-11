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

namespace Application.Orat
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
                var ora = await _context.Orat
                .Include(a => a.OratPrezencat).ThenInclude(u => u.AppUser)
                .SingleOrDefaultAsync(x => x.Id == request.Id);

                if(ora == null) return null;

                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                if(user == null) return null;
                
                var hostUsername = ora.OratPrezencat.FirstOrDefault(x => x.isHost)?.AppUser.UserName;

                var prezenca = ora.OratPrezencat.FirstOrDefault(x => x.AppUser.UserName == user.UserName);

                if(prezenca != null && hostUsername == user.UserName)
                ora.IsCancelled =!ora.IsCancelled;

                if(prezenca != null && hostUsername != user.UserName)
                ora.OratPrezencat.Remove(prezenca);

                if(prezenca == null){
                    prezenca = new OratPrezenca{
                        AppUser = user,
                        Ora = ora,
                        isHost = false
                    };

                    ora.OratPrezencat.Add(prezenca);
                }

                var result = await _context.SaveChangesAsync() > 0;

                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Proble updating attendance");
            }
        }
    }
}