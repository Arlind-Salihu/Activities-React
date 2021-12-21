using System;
using Application.Core;

namespace Application.Telefonat
{
    public class TelefoniParams : PagingParams
    {
        public bool IsInteresed { get; set; }
        public bool IsHost { get; set; }
        public DateTime StartDate { get; set; } = DateTime.UtcNow;

    }
}