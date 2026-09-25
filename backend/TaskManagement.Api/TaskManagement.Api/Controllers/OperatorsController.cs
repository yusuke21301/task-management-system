using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManagement.Api.Data;
using TaskManagement.Api.DTOs;

namespace TaskManagement.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OperatorsController : ControllerBase
{
    private readonly AppDbContext _db;

    public OperatorsController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<OperatorResponseDto>>> GetOperators()
    {
        var operators = await _db.Operators
            .AsNoTracking()
            .OrderBy(x => x.Name)
            .Select(x => new OperatorResponseDto
            {
                Id = x.Id,
                Name = x.Name
            })
            .ToListAsync();

        return Ok(operators);
    }
}