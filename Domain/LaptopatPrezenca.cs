using System;

namespace Domain
{
    public class LaptopatPrezenca
    {
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public Guid LaptopiId { get; set; }
        public Laptopi Laptopi { get; set; }
        public bool isHost { get; set; }
    }
}