using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Orat
{
    public class Edit
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
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var ora = await _context.Orat.FindAsync(request.Ora.Id);

                if(ora == null) return null;

                _mapper.Map(request.Ora, ora);

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Deshtoi per te perditesuar oran");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}