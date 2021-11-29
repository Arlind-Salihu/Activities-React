using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Persistence;

namespace Application.Laptopat
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _contextLaptopi;
            public Handler(DataContext contextLaptopi)
            {
                _contextLaptopi = contextLaptopi;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var laptopi = await _contextLaptopi.Laptopat.FindAsync(request.Id);

                // if(laptopi == null) return null;

                _contextLaptopi.Remove(laptopi);

                var result = await _contextLaptopi.SaveChangesAsync() > 0;
                
                if(!result) return Result<Unit>.Failure("Deshtoi fshirja e laptopit");

                return Result<Unit>.Success(Unit.Value);

            }
        }
    }
}