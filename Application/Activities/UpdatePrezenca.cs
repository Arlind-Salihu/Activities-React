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

namespace Application.Activities
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
                var activity = await _context.Activities
                .Include(a => a.ActivitiesPrezencat).ThenInclude(u => u.AppUser)
                .SingleOrDefaultAsync(x => x.Id == request.Id);

                if(activity == null) return null;

                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                if(user == null) return null;
                
                var hostUsername = activity.ActivitiesPrezencat.FirstOrDefault(x => x.isHost)?.AppUser.UserName;

                var prezenca = activity.ActivitiesPrezencat.FirstOrDefault(x => x.AppUser.UserName == user.UserName);

                if(prezenca != null && hostUsername == user.UserName)
                activity.IsCancelled =!activity.IsCancelled;

                if(prezenca != null && hostUsername != user.UserName)
                activity.ActivitiesPrezencat.Remove(prezenca);

                if(prezenca == null){
                    prezenca = new ActivitiesPrezenca{
                        AppUser = user,
                        Activity = activity,
                        isHost = false
                    };

                    activity.ActivitiesPrezencat.Add(prezenca);
                }

                var result = await _context.SaveChangesAsync() > 0;

                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Proble updating attendance");
            }
        }
    }
}