using System;
using System.Text.Json.Serialization;

namespace Application.Profiles
{
    public class UserTelefoniDto
    {
        public Guid Id { get; set; }
        public string Emri { get; set; }
        public string Kategoria { get; set; }
        public DateTime Data { get; set; }
        
        [JsonIgnore]
        public string HostUsername { get; set; }
    }
}