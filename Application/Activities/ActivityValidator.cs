using Domain;
using FluentValidation;

namespace Application.Activities
{
    public class ActivityValidator : AbstractValidator<Activity>
    {
        public ActivityValidator()
        {
            RuleFor(x => x.Emri).NotEmpty();
            RuleFor(x => x.Kategoria).NotEmpty();
            RuleFor(x => x.Brendi).NotEmpty();
            RuleFor(x => x.Data).NotEmpty();
            RuleFor(x => x.Pershkrimi).NotEmpty();
        }
    }
}