using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using WebAPI.Models;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using System;
using System.Text.RegularExpressions;
using Azure.Storage.Blobs;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public EmployeeController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        private string DBstring()
        {
            return _configuration.GetConnectionString("EmployeeAppCon");
        }

        private string filenameFromFile(string file)
        {
            return DateTime.Now.ToString("dMyHHmmsstt") + "_" + file.Replace(" ", "_");
        }

        [HttpGet]
        public JsonResult Get()
        {
            DataTable table = new DataTable();

            using (SqlConnection myCon = new SqlConnection(DBstring()))
            {
                string query = @"
                    SELECT emp.EmployeeId,
                           emp.EmployeeName,
                           emp.DepartmentId,
                           dep.DepartmentName,
                           convert(varchar(10), emp.DateOfJoining, 120) as DateOfJoining,
                           emp.PhotoFileName
                    FROM dbo.Employee emp
                    JOIN dbo.Department dep ON (dep.DepartmentId = emp.DepartmentId)";

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
        public JsonResult Post(Employee emp)
        {
            using (SqlConnection myCon = new SqlConnection(DBstring()))
            {
                string query = @"
                                INSERT INTO dbo.Employee
                                (EmployeeName, DepartmentId, DateOfJoining, PhotoFileName)
                                VALUES
                                (@name, @department, @date, @photo)";

                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@name", emp.EmployeeName);
                    myCommand.Parameters.AddWithValue("@department", emp.DepartmentId);
                    myCommand.Parameters.AddWithValue("@date", emp.DateOfJoining);
                    myCommand.Parameters.AddWithValue("@photo", emp.PhotoFileName);

                    SqlDataReader myReader;
                    myCon.Open();
                    myReader = myCommand.ExecuteReader();
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Employee Included");
        }

        [HttpPut]
        public JsonResult Put(Employee emp)
        {
            using (SqlConnection myCon = new SqlConnection(DBstring()))
            {
                string query = @"
                    UPDATE dbo.Employee
                    SET EmployeeName = @name,
                        DepartmentId = @department,
                        DateOfJoining = @date,
                        PhotoFileName = @photo
                    WHERE EmployeeId = @id";

                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@id", emp.EmployeeId);
                    myCommand.Parameters.AddWithValue("@name", emp.EmployeeName);
                    myCommand.Parameters.AddWithValue("@department", emp.DepartmentId);
                    myCommand.Parameters.AddWithValue("@date", emp.DateOfJoining);
                    myCommand.Parameters.AddWithValue("@photo", emp.PhotoFileName);

                    SqlDataReader myReader;
                    myCon.Open();
                    myReader = myCommand.ExecuteReader();
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Employee Updated");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            using (SqlConnection myCon = new SqlConnection(DBstring()))
            {
                string query = @"DELETE FROM dbo.Employee WHERE EmployeeId = '" + id + "'";

                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    SqlDataReader myReader;
                    myCon.Open();
                    myReader = myCommand.ExecuteReader();
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Employee Deleted");
        }

        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = filenameFromFile(postedFile.FileName);
                var physicalPath = _env.ContentRootPath + "/Photos/" + filename;

                using(var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }

                return new JsonResult(filename);
            }
            catch (Exception)
            {
                return new JsonResult("anonymous.png");
            }
        }

        public string UploadBase64Image(string base64Image, string container)
        {
            // Gera um nome randomico para imagem
            var fileName = Guid.NewGuid().ToString() + ".jpg";

            // Limpa o hash enviado
            var data = new Regex(@"^data:image\/[a-z]+;base64,").Replace(base64Image, "");

            // Gera um array de Bytes
            byte[] imageBytes = Convert.FromBase64String(data);

            // Define o BLOB no qual a imagem será armazenada
            var blobClient = new BlobClient("SUA CONN STRING", container, fileName);

            // Envia a imagem
            using (var stream = new MemoryStream(imageBytes))
            {
                blobClient.Upload(stream);
            }

            // Retorna a URL da imagem
            return blobClient.Uri.AbsoluteUri;
        }
    }
}
