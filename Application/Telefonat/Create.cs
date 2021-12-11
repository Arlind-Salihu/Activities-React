using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Telefonat
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Telefoni Telefoni { get; set; }
        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Telefoni).SetValidator(new TelefoniValidator());
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

                var telefonatPrezenca = new TelefonatPrezenca{
                    AppUser = user,
                    Telefoni = request.Telefoni,
                    isHost = true
                };

                request.Telefoni.TelefonatPrezencat.Add(telefonatPrezenca);

                _context.Telefonat.Add(request.Telefoni);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Deshtoi krijimi i telefonit");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}