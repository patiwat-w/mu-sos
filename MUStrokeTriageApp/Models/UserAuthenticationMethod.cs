using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public enum AuthenticationProvider
{
    Google = 1,
    Facebook = 2,
    Local = 3
}

[Table("UserAuthenticationMethod")]
public class UserAuthenticationMethodModel
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column("Id")]
    [Display(Name = "Authentication Method ID")]
    public int Id { get; set; }

    [Required]
    [Column("UserId")]
    [Display(Name = "User ID")]
    public int UserId { get; set; }

    [Required]
    [Column("Provider")]
    [Display(Name = "Authentication Provider")]
    public AuthenticationProvider Provider { get; set; }

    [Required]
    [Column("ProviderKey")]
    [Display(Name = "Provider Key")]
    public string ProviderKey { get; set; }

    [Column("DisplayName")]
    [Display(Name = "Display Name")]
    public string? DisplayName { get; set; }

    [Column("Email")]
    [Display(Name = "Email Address")]
    public string? Email { get; set; }

    [Column("PhotoURL")]
    [Display(Name = "Photo URL")]
    public string? PhotoURL { get; set; }

    [ForeignKey("UserId")]
    [Display(Name = "User")]
    public UserModel User { get; set; }
}

