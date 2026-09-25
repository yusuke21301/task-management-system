using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskManagement.Api.Models;

[Table("tasks")]
public class TaskItem
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Required]
    [Column("task_name")]
    [MaxLength(200)]
    public string TaskName { get; set; } = string.Empty;

    [Column("operator_id")]
    public int OperatorId { get; set; }

    [Column("status")]
    public WorkStatus Status { get; set; }

    [Column("planned_date")]
    public DateOnly? PlannedDate { get; set; }

    [Column("created_at", TypeName = "timestamp without time zone")]
    public DateTime CreatedAt { get; set; }

    [Column("updated_at", TypeName = "timestamp without time zone")]
    public DateTime UpdatedAt { get; set; }

    [ForeignKey(nameof(OperatorId))]
    public Operator? Operator { get; set; }
}