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

namespace Application.Telefonat
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
                var telefoni = await _context.Telefonat
                .Include(a => a.TelefonatPrezencat).ThenInclude(u => u.AppUser)
                .SingleOrDefaultAsync(x => x.Id == request.Id);

                if(telefoni == null) return null;

                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                if(user == null) return null;
                
                var hostUsername = telefoni.TelefonatPrezencat.FirstOrDefault(x => x.isHost)?.AppUser.UserName;

                var prezenca = telefoni.TelefonatPrezencat.FirstOrDefault(x => x.AppUser.UserName == user.UserName);

                if(prezenca != null && hostUsername == user.UserName)
                telefoni.IsCancelled =!telefoni.IsCancelled;

                if(prezenca != null && hostUsername != user.UserName)
                telefoni.TelefonatPrezencat.Remove(prezenca);

                if(prezenca == null){
                    prezenca = new TelefonatPrezenca{
                        AppUser = user,
                        Telefoni = telefoni,
                        isHost = false
                    };

                    telefoni.TelefonatPrezencat.Add(prezenca);
                }

                var result = await _context.SaveChangesAsync() > 0;

                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Proble updating attendance");
            }
        }
    }
}