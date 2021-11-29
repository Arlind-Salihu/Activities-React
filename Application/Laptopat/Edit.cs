using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Laptopat
{
    public class Edit
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
            private readonly DataContext _contextLaptopi;
            private readonly IMapper _mapper;
            public Handler(DataContext contextLaptopi, IMapper mapper)
            {
                _mapper = mapper;
                _contextLaptopi = contextLaptopi;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var laptopi = await _contextLaptopi.Laptopat.FindAsync(request.Laptopi.Id);

                if(laptopi == null) return null;

                _mapper.Map(request.Laptopi, laptopi);

                var result = await _contextLaptopi.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Deshtoi per te perditesuar laptopin");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}