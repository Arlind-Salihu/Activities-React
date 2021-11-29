using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Telefoni> Telefonat { get; set; }
        public DbSet<Laptopi> Laptopat { get; set; }
        public DbSet<Ora> Orat { get; set; }
    }
}