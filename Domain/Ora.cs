using System;

namespace Domain
{
    public class Ora
    {
        public Guid Id { get; set; }
        public string Emri { get; set; }
        public string Kategoria { get; set; }
        public string Brendi { get; set; }
        public DateTime Data { get; set; } 
        public string Pershkrimi { get; set; }               
        public decimal Cmimi { get; set; }
    }
}