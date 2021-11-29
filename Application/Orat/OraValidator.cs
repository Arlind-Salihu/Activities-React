using Domain;
using FluentValidation;

namespace Application.Orat
{
    public class OraValidator : AbstractValidator<Ora>
    {
        public OraValidator()
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