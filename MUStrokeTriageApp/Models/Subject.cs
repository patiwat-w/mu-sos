using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("SubjectInformation")]
public class SubjectModel
{
    [Key]
    [Column("Subject_ID")]
    [StringLength(20)]
    public string? SubjectId { get; set; } // รหัสผู้ป่วย

    [Column("Phone_Number")]
    [StringLength(15)]
    public string? PhoneNumber { get; set; } // หมายเลขโทรศัพท์

    [Column("Onset_Time")]
    public DateTime OnsetTime { get; set; } // เวลาเริ่มต้น

    [Column("Last_Seen_Normal_Time")]
    public DateTime LastSeenNormalTime { get; set; } // เวลา Last Seen

    [Column("First_Name")]
    [StringLength(50)]
    public string? FirstName { get; set; } // ชื่อ

    [Column("Last_Name")]
    [StringLength(50)]
    public string? LastName { get; set; } // นามสกุล

    [Column("Created_Date")]
    public DateTime CreatedDate { get; set; } = DateTime.Now; // วันที่สร้างข้อมูล

    [Column("Modified_Date")]
    public DateTime ModifiedDate { get; set; } = DateTime.Now; // วันที่แก้ไขข้อมูล

    [Column("Created_By")]
    [StringLength(50)]
    public string? CreatedBy { get; set; } // ผู้สร้างข้อมูล

    [Column("Modified_By")]
    [StringLength(50)]
    public string? ModifiedBy { get; set; } // ผู้แก้ไขข้อมูล

    [Column("State_Code")]
    public int StateCode { get; set; } // รหัสสถานะ

    // Add other properties as needed
}
