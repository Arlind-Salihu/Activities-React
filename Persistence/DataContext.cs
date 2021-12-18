using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Telefoni> Telefonat { get; set; }
        public DbSet<TelefonatPrezenca> TelefonatPrezencas { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Comment> Comments { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<TelefonatPrezenca>(x => x.HasKey(aa => new { aa.AppUserId, aa.TelefoniId }));            

            builder.Entity<TelefonatPrezenca>()
            .HasOne(u => u.AppUser)
            .WithMany(a => a.Telefonat)
            .HasForeignKey(aa => aa.AppUserId);

             builder.Entity<TelefonatPrezenca>()
            .HasOne(u => u.Telefoni)
            .WithMany(a => a.TelefonatPrezencat)
            .HasForeignKey(aa => aa.TelefoniId);

            builder.Entity<Comment>()
            .HasOne(a => a.Telefoni)
            .WithMany(c => c.Comments)
            .OnDelete(DeleteBehavior.Cascade);
        }
    }
}