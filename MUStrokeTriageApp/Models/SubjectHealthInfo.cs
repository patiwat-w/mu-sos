using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

[Table("SubjectHealthInfo")]
public class SubjectHealthInfoModel {
    [Key]
    [Column("Id")]
    public int Id { get; set; } // if null, it's a new record

    //FK
    [Column("SubjectId")]
    [Required]
    public int SubjectId { get; set; }

    // Comorbidities
    [Column("Comorbidities_Hypertension")]
    public bool? Comorbidities_Hypertension { get; set; } = false; // ความดันโลหิตสูง

    [Column("Comorbidities_Diabetes")]
    public bool? Comorbidities_Diabetes { get; set; } = true; // โรคเบาหวาน

    [Column("Comorbidities_Hyperlipidemia")]
    public bool? Comorbidities_Hyperlipidemia { get; set; } = false; // ไขมันในเลือดสูง

    [Column("Comorbidities_HeartDisease")]
    public bool? Comorbidities_HeartDisease { get; set; } = false; // โรคหัวใจ

    [Column("Comorbidities_PreviousStroke")]
    public bool? Comorbidities_PreviousStroke { get; set; } = true; // เคยเป็นโรคหลอดเลือดสมองมาก่อน

    // Symptoms
    [Column("Symptoms_SpeechDifficulties")]
    public bool? Symptoms_SpeechDifficulties { get; set; } = false; // พูดลำบาก

    [Column("Symptoms_FacialDrooping")]
    public bool? Symptoms_FacialDrooping { get; set; } = true; // มุมปากตก

    [Column("Symptoms_VisualProblems")]
    public bool? Symptoms_VisualProblems { get; set; } = false; // ปัญหาการมองเห็น

    [Column("Symptoms_ArmLt")]
    public bool? Symptoms_ArmLt { get; set; } = true; // แขนอ่อนแรงด้านซ้าย

    [Column("Symptoms_ArmRt")]
    public bool? Symptoms_ArmRt { get; set; } = false; // แขนอ่อนแรงด้านขวา

    [Column("Symptoms_LegLt")]
    public bool? Symptoms_LegLt { get; set; } = false; // ขาอ่อนแรงด้านซ้าย

    [Column("Symptoms_LegRt")]
    public bool? Symptoms_LegRt { get; set; } = true; // ขาอ่อนแรงด้านขวา

    // NIHSS Assessment
    [Column("NHISS_Consciousness")]
    public int? NHISS_Consciousness { get; set; } // ระดับความรู้สึกตัว

    [Column("NHISS_Question")]
    public int? NHISS_Question { get; set; } // การตอบคำถาม

    [Column("NHISS_Commands")]
    public int? NHISS_Commands { get; set; } // การทำตามคำสั่ง

    [Column("NHISS_Gaze")]
    public int? NHISS_Gaze { get; set; } // การเคลื่อนไหวของลูกตา

    [Column("NHISS_VisualField")]
    public int? NHISS_VisualField { get; set; } // ลานสายตา

    [Column("NHISS_FacialPalsy")]
    public int? NHISS_FacialPalsy { get; set; } // อาการกล้ามเนื้อใบหน้าอ่อนแรง

    [Column("NHISS_ArmStrengthLeft")]
    public int? NHISS_ArmStrengthLeft { get; set; } // กำลังแขนด้านซ้าย

    [Column("NHISS_ArmStrengthRight")]
    public int? NHISS_ArmStrengthRight { get; set; } // กำลังแขนด้านขวา

    [Column("NHISS_LegStrengthLeft")]
    public int? NHISS_LegStrengthLeft { get; set; } // กำลังขาด้านซ้าย

    [Column("NHISS_LegStrengthRight")]
    public int? NHISS_LegStrengthRight { get; set; } // กำลังขาด้านขวา

    [Column("NHISS_Ataxia")]
    public int? NHISS_Ataxia { get; set; } // ภาวะเสียการทรงตัว

    [Column("NHISS_Sensory")]
    public int? NHISS_Sensory { get; set; } // การรับความรู้สึก

    // General properties
    [Column("Created_Date")]
    public DateTime? CreatedDate { get; set; } = DateTime.Now; // วันที่สร้างข้อมูล

    [Column("Modified_Date")]
    public DateTime? ModifiedDate { get; set; } = DateTime.Now; // วันที่แก้ไขข้อมูล

    [Column("Created_By")]
    [StringLength(50)]
    public string? CreatedBy { get; set; }  // ผู้สร้างข้อมูล

    [Column("Modified_By")]
    [StringLength(50)]
    public string? ModifiedBy { get; set; }  // ผู้แก้ไขข้อมูล

    [Column("State_Code")]
    public int? StateCode { get; set; } = 1; // รหัสสถานะ
}