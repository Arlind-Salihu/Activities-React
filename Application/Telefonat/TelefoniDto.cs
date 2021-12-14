using System;
using System.Collections.Generic;
using Application.Profiles;

namespace Application.Telefonat
{
    public class TelefoniDto
    {
        public Guid Id { get; set; }
        public string Emri { get; set; }
        public string Kategoria { get; set; }
        public string Brendi { get; set; }
        public DateTime Data { get; set; } 
        public string Pershkrimi { get; set; }               
        public decimal Cmimi { get; set; }
        public string HostUsername { get; set; }
        public bool IsCancelled { get; set; }
        public ICollection<PrezencaDto> TelefonatPrezencat { get; set; }
    }
}