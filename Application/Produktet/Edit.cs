using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Produktet
{
    public class Edit
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
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var produkti = await _context.Produktet.FindAsync(request.Produkti.Id);

                if(produkti == null) return null;

                _mapper.Map(request.Produkti, produkti);

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Deshtoi per te perditesuar produktin");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}