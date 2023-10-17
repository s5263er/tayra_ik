using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Tayra_IK.Data;
using Tayra_IK.Models;

namespace Tayra_IK.Controllers
{
    [Route("api/workers")]
    [ApiController]
    public class WorkersController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly AppDbContext _dbContext;

        public WorkersController(IConfiguration configuration, AppDbContext dbContext)
        {
            _configuration = configuration;
            _dbContext = dbContext;
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddWorker([FromBody] Worker worker)
        {
            Console.WriteLine(worker.TC_Identity);
            Console.WriteLine(worker.LastName);


            try
            {
                // Check if a worker with the same TC_Identity already exists
                var existingWorker = await _dbContext.Workers.FirstOrDefaultAsync(w => w.TC_Identity == worker.TC_Identity);
                
                if (existingWorker != null)
                {
                    return BadRequest("Bu TC kimlik numarasına sahip bir çalışan zaten var.");
                }

                // Add the worker to the Workers table
                _dbContext.Workers.Add(worker);

                // If the worker is a chef, add to DepartmentChefs
                if (worker.EmployeeRole == "Şef" && worker.DepartmentId.HasValue)
                {
                    var departmentChef = new DepartmentChef
                    {
                        DepartmentId = worker.DepartmentId.Value,
                        DepartmentChefId = worker.TC_Identity // Assuming WorkerId is the primary key
                    };

                    _dbContext.DepartmentChefs.Add(departmentChef);
                }

                // If the worker is a manager, add to DepartmentManagers
                if (worker.EmployeeRole == "Müdür" && worker.DepartmentId.HasValue)
                {
                    var departmentManager = new DepartmentManager
                    {
                        DepartmentId = worker.DepartmentId.Value,
                        DepartmentManagerId = worker.TC_Identity // Assuming WorkerId is the primary key
                    };

                    _dbContext.DepartmentManagers.Add(departmentManager);
                }

                // Save changes to the database
                await _dbContext.SaveChangesAsync();

                return Ok("Çalışan başarıyla eklendi.");
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Exception: {ex}");
                return StatusCode(500, "Sunucu hatası.");
            }
        }
    }

}