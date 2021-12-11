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
        public DbSet<Laptopi> Laptopat { get; set; }
        public DbSet<Ora> Orat { get; set; }
        public DbSet<TelefonatPrezenca> TelefonatPrezencas { get; set; }
        public DbSet<LaptopatPrezenca> LaptopatPrezencas { get; set; }
        public DbSet<OratPrezenca> OratPrezencas { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<TelefonatPrezenca>(x => x.HasKey(aa => new { aa.AppUserId, aa.TelefoniId }));
            builder.Entity<LaptopatPrezenca>(x => x.HasKey(aa => new { aa.AppUserId, aa.LaptopiId }));
            builder.Entity<OratPrezenca>(x => x.HasKey(aa => new { aa.AppUserId, aa.OraId }));

            builder.Entity<TelefonatPrezenca>()
            .HasOne(u => u.AppUser)
            .WithMany(a => a.Telefonat)
            .HasForeignKey(aa => aa.AppUserId);

             builder.Entity<TelefonatPrezenca>()
            .HasOne(u => u.Telefoni)
            .WithMany(a => a.TelefonatPrezencat)
            .HasForeignKey(aa => aa.TelefoniId);
            
///////////////////////////////////////////////////////////////////////////

            builder.Entity<LaptopatPrezenca>()
            .HasOne(u => u.AppUser)
            .WithMany(a => a.Laptopat)
            .HasForeignKey(aa => aa.AppUserId);

            builder.Entity<LaptopatPrezenca>()
            .HasOne(u => u.Laptopi)
            .WithMany(a => a.LaptopatPrezencat)
            .HasForeignKey(aa => aa.LaptopiId);
            
///////////////////////////////////////////////////////////////////////////
            
            builder.Entity<OratPrezenca>()
            .HasOne(u => u.AppUser)
            .WithMany(a => a.Orat)
            .HasForeignKey(aa => aa.AppUserId);

            builder.Entity<OratPrezenca>()
            .HasOne(u => u.Ora)
            .WithMany(a => a.OratPrezencat)
            .HasForeignKey(aa => aa.OraId);
        }
    }
}