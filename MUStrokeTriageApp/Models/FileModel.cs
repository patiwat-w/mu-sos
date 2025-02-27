using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("Files")]
public class FileModel
{
    [Key]
    [Column("Id")]
    public int Id { get; set; }

    [Required]
    [MaxLength(1000)]
    [Column("Name")]
    public string Name { get; set; }

    [Required]
    [Column("Length")]
    public long Length { get; set; }

    [Required]
    [Column("CreationTime")]
    public DateTime CreationTime { get; set; }

    [Required]
    [Column("LastAccessTime")]
    public DateTime LastAccessTime { get; set; }

    [Required]
    [Column("LastWriteTime")]
    public DateTime LastWriteTime { get; set; }

    [Required]
    [MaxLength(1000)]
    [Column("FilePath")]
    public string? FilePath { get; set; }

    [Column("UserId")]
    public int? UserId { get; set; }

    [Column("SubjectId")]
    public int? SubjectId { get; set; }

    [Column("FileType")]
    public string? FileType { get; set; }

    [Column("FileExtension")]
    public string? FileExtension { get; set; }

    [Column("FileName")]
    public string? FileName { get; set; }
    
    [Column("FileCategory")]
    public string? FileCategory { get; set; }

    [Column("FileInfo")]
    public string? FileInfo { get; set; }
    
 
}
