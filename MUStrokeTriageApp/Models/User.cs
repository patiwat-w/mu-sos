using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


    public enum UserRole
    {
        User,
        Admin
    }

    public enum UserState
    {
        InActive = 0,
        Active = 1
    }

    [Table("UserAccount")]
    public class UserModel
    {
        [Key]
        [Column("Id")]
        [Display(Name = "User ID")]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        [Column("Name")]
        [Display(Name = "Full Name")]
        public  string? Name { get; set; }

        [Required]
        [StringLength(100)]
        [Column("First_Name")]
        [Display(Name = "FirstName")]
        public  string? FirstName { get; set; }


         [Required]
        [StringLength(100)]
        [Column("Last_Name")]
        [Display(Name = "LastName")]
        public  string? LastName { get; set; }

      

        [Required]
        [EmailAddress]
        [Column("Email")]
        [Display(Name = "Email Address")]
        public required string Email { get; set; }

        [Required]
        [Column("Role")]
        [Display(Name = "User Role")]
        public required UserRole Role { get; set; }

        [Column("Token")]
        [Display(Name = "Authentication Token")]
        public string? Token { get; set; }

        [Column("LastLoginDate")]
        [Display(Name = "Last Login Date")]
        public DateTime? LastLoginDate { get; set; }


        [Column("Created_Date")]
        [Display(Name = "Created Date")]
        public DateTime CreatedDate { get; set; } = DateTime.Now;



        [Column("Modified_Date")]
        [Display(Name = "Modified Date")]
        public DateTime ModifiedDate { get; set; } = DateTime.Now;




        [Column("Created_By")]
        [StringLength(50)]
        [Display(Name = "Created By")]
        public string? CreatedBy { get; set; }

        [Column("Modified_By")]
        [StringLength(50)]
        [Display(Name = "Modified By")]
        public string? ModifiedBy { get; set; }

        [Required]
        [Column("State_Code")]
        [Display(Name = "State Code")]
        public UserState StateCode { get; set; } = UserState.Active;

        [Column("DisplayName")]
        [Display(Name = "Display Name")]
        public string? DisplayName { get; set; }

        [Column("PhotoURL")]
        [Display(Name = "Photo URL")]
        public string? PhotoURL { get; set; }
    }

