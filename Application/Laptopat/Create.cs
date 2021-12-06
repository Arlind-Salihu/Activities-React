using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Laptopat
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Laptopi Laptopi { get; set; }
        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Laptopi).SetValidator(new LaptopiValidator());
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
                _context.Laptopat.Add(request.Laptopi);

                var result = await _context.SaveChangesAsync() > 0;
                
                if(!result) return Result<Unit>.Failure("Deshtoi krijimi i laptopit");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}