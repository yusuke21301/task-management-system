namespace TaskManagement.Api.DTOs;

public class TaskDto
{
    public int Id { get; set; }

    public string TaskName { get; set; } = string.Empty;

    public int OperatorId { get; set; }

    public string OperatorName { get; set; } = string.Empty;

    public int Status { get; set; }

    public DateOnly? PlannedDate { get; set; }
}