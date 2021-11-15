using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Produktet
{
    public class Create
    {
        public class Command : IRequest
        {
            public Produkti Produkti { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Produktet.Add(request.Produkti);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}