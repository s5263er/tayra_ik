using Microsoft.EntityFrameworkCore;
using Tayra_IK;
using Tayra_IK.Models;

namespace Tayra_IK.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }
        public DbSet<Worker> Workers { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<DepartmentManager> DepartmentManagers { get; set; }
        public DbSet<DepartmentChef> DepartmentChefs { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        }
    }
}