using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public string Bio { get; set; }
        public ICollection<TelefonatPrezenca> Telefonat { get; set; }
        public ICollection<LaptopatPrezenca> Laptopat { get; set; }
        public ICollection<OratPrezenca> Orat { get; set; }
    }
}