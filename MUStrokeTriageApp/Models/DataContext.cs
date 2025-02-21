using Microsoft.EntityFrameworkCore;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {
    }

    public DbSet<SubjectModel> Subjects { get; set; }
    public DbSet<UserModel> Users { get; set; }
    public DbSet<UserAuthenticationMethodModel> UserAuthenticationMethods { get; set; }

    public DbSet<FileModel> Files { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        modelBuilder.Entity<SubjectModel>()
            .HasKey(s => s.Id);

        modelBuilder.Entity<UserModel>()
            .HasKey(u => u.Id);

        modelBuilder.Entity<FileModel>()
            .HasKey(u => u.Id);

        modelBuilder.Entity<UserAuthenticationMethodModel>()
            .HasKey(uam => uam.Id);

        modelBuilder.Entity<UserAuthenticationMethodModel>()
            .HasOne(uam => uam.User)
            .WithMany()
            .HasForeignKey(uam => uam.UserId);
    }
}
