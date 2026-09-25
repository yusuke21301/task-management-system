using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManagement.Api.Data;
using TaskManagement.Api.DTOs;

namespace TaskManagement.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private readonly AppDbContext _db;

    public TasksController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<ActionResult<List<TaskDto>>> GetTasks()
    {
        var tasks = await _db.Tasks
            .OrderBy(x => x.Id)
            .Select(x => new TaskDto
            {
                Id = x.Id,
                TaskName = x.TaskName,
                OperatorId = x.OperatorId,
                OperatorName = x.Operator != null
                    ? x.Operator.Name
                    : string.Empty,
                Status = (int)x.Status,
                PlannedDate = x.PlannedDate
            })
            .ToListAsync();

        return Ok(tasks);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<TaskDto>> GetTask([FromRoute] int id)
    {
        var task = await _db.Tasks
            .Where(x => x.Id == id)
            .Select(x => new TaskDto
            {
                Id = x.Id,
                TaskName = x.TaskName,
                OperatorId = x.OperatorId,
                OperatorName = x.Operator != null
                    ? x.Operator.Name
                    : string.Empty,
                Status = (int)x.Status,
                PlannedDate = x.PlannedDate
            })
            .FirstOrDefaultAsync();

        if (task == null)
        {
            return NotFound();
        }

        return Ok(task);
    }

    [HttpPost]
    public async Task<ActionResult<TaskDto>> CreateTask(
    [FromBody] CreateTaskRequest request)
    {
        var operatorEntity = await _db.Operators
            .FirstOrDefaultAsync(x => x.Id == request.OperatorId);

        if (operatorEntity == null)
        {
            return BadRequest("指定された担当者が存在しません。");
        }

        if (!Enum.IsDefined(typeof(Models.WorkStatus), request.Status))
        {
            return BadRequest("不正なステータスです。");
        }

        var task = new Models.TaskItem
        {
            TaskName = request.TaskName,
            OperatorId = request.OperatorId,
            Status = (Models.WorkStatus)request.Status,
            PlannedDate = request.PlannedDate,
            CreatedAt = DateTime.Now,
            UpdatedAt = DateTime.Now
        };

        _db.Tasks.Add(task);

        await _db.SaveChangesAsync();

        var response = new TaskDto
        {
            Id = task.Id,
            TaskName = task.TaskName,
            OperatorId = task.OperatorId,
            OperatorName = operatorEntity.Name,
            Status = (int)task.Status,
            PlannedDate = task.PlannedDate
        };

        return CreatedAtAction(
            nameof(GetTask),
            new { id = task.Id },
            response);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateTask(
    [FromRoute] int id,
    [FromBody] UpdateTaskRequest request)
    {
        var task = await _db.Tasks
            .FirstOrDefaultAsync(x => x.Id == id);

        if (task == null)
        {
            return NotFound();
        }

        var operatorExists = await _db.Operators
            .AnyAsync(x => x.Id == request.OperatorId);

        if (!operatorExists)
        {
            return BadRequest("指定された担当者が存在しません。");
        }

        if (!Enum.IsDefined(typeof(Models.WorkStatus), request.Status))
        {
            return BadRequest("不正なステータスです。");
        }

        task.TaskName = request.TaskName;
        task.OperatorId = request.OperatorId;
        task.Status = (Models.WorkStatus)request.Status;
        task.PlannedDate = request.PlannedDate;
        task.UpdatedAt = DateTime.Now;

        await _db.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteTask(
    [FromRoute] int id)
    {
        var task = await _db.Tasks
            .FirstOrDefaultAsync(x => x.Id == id);

        if (task == null)
        {
            return NotFound();
        }

        _db.Tasks.Remove(task);

        await _db.SaveChangesAsync();

        return NoContent();
    }
}