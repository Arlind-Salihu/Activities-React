using Domain;
using FluentValidation;

namespace Application.Laptopat
{
    public class LaptopiValidator : AbstractValidator<Laptopi>
    {
        public LaptopiValidator()
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