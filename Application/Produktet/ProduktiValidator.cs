using Domain;
using FluentValidation;

namespace Application.Produktet
{
    public class ProduktiValidator : AbstractValidator<Produkti>
    {
        public ProduktiValidator()
        {
            RuleFor(x => x.Emri).NotEmpty();
            RuleFor(x => x.Kategoria).NotEmpty();
            RuleFor(x => x.Brendi).NotEmpty();
            RuleFor(x => x.Data).NotEmpty();
            RuleFor(x => x.Pershkrimi).NotEmpty();
            RuleFor(x => x.Cmimi).NotEmpty();
        }
    }
}