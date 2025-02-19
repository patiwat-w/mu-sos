using Microsoft.EntityFrameworkCore;

public class StrokeTriageDataContext : DbContext
{
    public StrokeTriageDataContext(DbContextOptions<StrokeTriageDataContext> options) : base(options) { }

    public DbSet<SubjectModel> Subjects { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        modelBuilder.Entity<SubjectModel>()
            .HasKey(s => s.SubjectId);
    }
}
