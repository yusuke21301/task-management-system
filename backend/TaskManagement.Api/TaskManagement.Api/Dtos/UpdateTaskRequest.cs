using System.ComponentModel.DataAnnotations;

namespace TaskManagement.Api.DTOs;

public class UpdateTaskRequest
{
    [Required]
    [MaxLength(200)]
    public string TaskName { get; set; } = string.Empty;

    public int OperatorId { get; set; }

    public int Status { get; set; }

    public DateOnly? PlannedDate { get; set; }
}