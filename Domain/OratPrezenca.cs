using System;

namespace Domain
{
    public class OratPrezenca
    {
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public Guid OraId { get; set; }
        public Ora Ora { get; set; }
        public bool isHost { get; set; }
    }
}