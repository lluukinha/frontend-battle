using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public DepartmentController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        private string DBstring()
        {
            return _configuration.GetConnectionString("EmployeeAppCon");
        }

        [HttpGet]
        public JsonResult Get()
        {
            DataTable table = new DataTable();

            using (SqlConnection myCon = new SqlConnection(DBstring()))
            {
                string query = @"SELECT DepartmentId, DepartmentName FROM dbo.Department";
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCon.Open();
                    SqlDataReader myReader;
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
         }

        [HttpPost]
        public JsonResult Post(Department dep)
        {
            using (SqlConnection myCon = new SqlConnection(DBstring()))
            {
                string query = @"INSERT INTO dbo.Department (DepartmentName) VALUES (@name)";
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@name", dep.DepartmentName);

                    SqlDataReader myReader;
                    myCon.Open();
                    myReader = myCommand.ExecuteReader();
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Department Included");
        }

        [HttpPut]
        public JsonResult Put(Department dep)
        {
            using (SqlConnection myCon = new SqlConnection(DBstring()))
            {
                string query = @"
                    UPDATE dbo.Department
                    SET DepartmentName = @name
                    WHERE DepartmentId = @id";

                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@id", dep.DepartmentId);
                    myCommand.Parameters.AddWithValue("@name", dep.DepartmentName);

                    SqlDataReader myReader;
                    myCon.Open();
                    myReader = myCommand.ExecuteReader();
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Department Updated");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            using (SqlConnection myCon = new SqlConnection(DBstring()))
            {
                string query = @"DELETE FROM dbo.Department WHERE DepartmentId = '"+ id + "'";

                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    SqlDataReader myReader;
                    myCon.Open();
                    myReader = myCommand.ExecuteReader();
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Department Deleted");
        }
    }
}
