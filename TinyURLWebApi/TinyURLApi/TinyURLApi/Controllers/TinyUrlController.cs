using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TinyURLApi;

namespace TinyURLApi.Controllers;

[ApiController]
[Route("api")]
public class TinyUrlController : ControllerBase
{
    private readonly AppDbContext _db;

    public TinyUrlController(AppDbContext db)
    {
        _db = db;
    }

    // ✅ POST /api/add
    [HttpPost("add")]
    public async Task<IActionResult> Add([FromBody] ShortUrl dto)
    {
        var code = CodeGenerator.Generate();

        var url = new ShortUrl
        {
            OriginalUrl = dto.OriginalUrl,
            Code = code,
            IsPrivate = dto.IsPrivate,
            ClickCount = 0
        };

        _db.Urls.Add(url);
        await _db.SaveChangesAsync();

        return Ok(url);
    }

    // ✅ GET /api/public
    [HttpGet("public")]
    public async Task<IActionResult> GetPublic()
    {
        var urls = await _db.Urls
            .Where(x => !x.IsPrivate)
            .ToListAsync();

        return Ok(urls);
    }

    // ✅ GET /{code}  (redirect)
    [HttpGet("/{code}")]
    public async Task<IActionResult> RedirectToUrl(string code)
    {
        var url = await _db.Urls.FirstOrDefaultAsync(x => x.Code == code);

        if (url == null)
            return NotFound();

        url.ClickCount++;
        await _db.SaveChangesAsync();

        return Redirect(url.OriginalUrl);
    }

    // ✅ DELETE /api/delete/{code}
    [HttpDelete("delete/{code}")]
    public async Task<IActionResult> Delete(string code)
    {
        var url = await _db.Urls.FirstOrDefaultAsync(x => x.Code == code);

        if (url == null)
            return NotFound();

        _db.Urls.Remove(url);
        await _db.SaveChangesAsync();

        return Ok();
    }

    // ✅ DELETE /api/delete-all
    [HttpDelete("delete-all")]
    public async Task<IActionResult> DeleteAll()
    {
        var urls = await _db.Urls.ToListAsync();

        _db.Urls.RemoveRange(urls);
        await _db.SaveChangesAsync();

        return Ok("All URLs deleted");
    }

    // ✅ PUT /api/update/{code}
    [HttpPut("update/{code}")]
    public async Task<IActionResult> Update(string code, [FromBody] ShortUrl dto)
    {
        var url = await _db.Urls.FirstOrDefaultAsync(x => x.Code == code);

        if (url == null)
            return NotFound();

        url.OriginalUrl = dto.OriginalUrl;
        url.IsPrivate = dto.IsPrivate;

        await _db.SaveChangesAsync();

        return Ok(url);
    }
}