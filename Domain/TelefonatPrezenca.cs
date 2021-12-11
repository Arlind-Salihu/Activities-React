using System;

namespace Domain
{
    public class TelefonatPrezenca
    {
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public Guid TelefoniId { get; set; }
        public Telefoni Telefoni { get; set; }
        public bool isHost { get; set; }
    }
}