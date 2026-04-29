using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace TinyURLApi
{
    public class AppDbContext : DbContext
    {
        public DbSet<ShortUrl> Urls => Set<ShortUrl>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ShortUrl>().ToTable("ShortUrls");
        }

        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }
    }
}
