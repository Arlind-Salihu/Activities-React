using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Produktet
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Produkti Produkti { get; set; }
        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Produkti).SetValidator(new ProduktiValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Produktet.Add(request.Produkti);

                var result = await _context.SaveChangesAsync() > 0;
                
                if(!result) return Result<Unit>.Failure("Deshtoi krijimi i produktit");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}