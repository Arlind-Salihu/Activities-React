using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Orat
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Ora Ora { get; set; }
        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Ora).SetValidator(new OraValidator());
            }
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
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                var oratPrezenca = new OratPrezenca{
                    AppUser = user,
                    Ora = request.Ora,
                    isHost = true
                };

                request.Ora.OratPrezencat.Add(oratPrezenca);

                _context.Orat.Add(request.Ora);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Deshtoi krijimi i ores");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}