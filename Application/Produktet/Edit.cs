using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Produktet
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Produkti Produkti { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var produkti = await _context.Produktet.FindAsync(request.Produkti.Id);

                _mapper.Map(request.Produkti, produkti);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}