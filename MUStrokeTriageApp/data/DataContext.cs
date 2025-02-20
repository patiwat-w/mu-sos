using Microsoft.EntityFrameworkCore;


public class StrokeTriageDataContext : DbContext
{
    public StrokeTriageDataContext(DbContextOptions<StrokeTriageDataContext> options) : base(options) { }

}
