using System;
using System.Collections.Generic;

namespace Domain
{
    public class Laptopi
    {
        public Guid Id { get; set; }
        public string Emri { get; set; }
        public string Kategoria { get; set; }
        public string Brendi { get; set; }
        public DateTime Data { get; set; } 
        public string Pershkrimi { get; set; }               
        public decimal Cmimi { get; set; }
        public bool IsCancelled { get; set; }
        public ICollection<LaptopatPrezenca> LaptopatPrezencat { get; set; } = new List<LaptopatPrezenca>();
    }
}