using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using WebAPI.Models;
using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public UserController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                    select user_id, First_Name, Middle_Name, Last_Name, Email,
                    convert(varchar(10),Date_Of_Birth,120) as Date_Of_Birth,
                    convert(varchar(10),Phone_No,120) as Phone_No,
                    Add_City, Add_State,
                    convert(varchar(10),Add_Zip,120) as Add_Zip,
                    convert(varchar(10),Created_On,120) as Created_On
                    from dbo.UserInfo
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("UserAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            string query = @"
                    select user_id, First_Name, Middle_Name, Last_Name, Email,
                    convert(varchar(10),Date_Of_Birth,120) as Date_Of_Birth,
                    convert(varchar(10),Phone_No,120) as Phone_No,
                    Add_City, Add_State,
                    convert(varchar(10),Add_Zip,120) as Add_Zip,
                    convert(varchar(10),Created_On,120) as Created_On
                    from dbo.UserInfo
                    where user_id = " + id + @" 
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("UserAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post(userData userdata)
        {
            string query = @"
                    insert into dbo.UserInfo
                    (First_Name,Middle_Name,Last_Name,Email,Date_Of_Birth,Phone_No,Add_City,Add_State,Add_Zip,Created_On)
                    values 
                    (
                    '" + userdata.First_Name + @"'
                    ,'" + userdata.Middle_Name + @"'
                    ,'" + userdata.Last_Name + @"'
                    ,'" + userdata.Email + @"'
                    ,'" + userdata.Date_of_Birth + @"'
                    ,'" + userdata.Phone_No + @"'
                    ,'" + userdata.Add_City + @"'
                    ,'" + userdata.Add_State + @"'
                    ,'" + userdata.Add_Zip + @"'
                    ,'" + userdata.Created_On + @"'
                    )
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("UserAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully!");
        }


        [HttpPut]
        public JsonResult Put(userData userdata)
        {
            string query = @"
                    update dbo.UserInfo set 
                    First_Name = '" + userdata.First_Name + @"'
                    ,Middle_Name = '" + userdata.Middle_Name + @"'
                    ,Last_Name = '" + userdata.Last_Name + @"'
                    ,Email = '" + userdata.Email + @"'
                    ,Date_Of_Birth = '" + userdata.Date_of_Birth + @"'
                    ,Phone_No = '" + userdata.Phone_No + @"'
                    ,Add_City = '" + userdata.Add_City + @"'
                    ,Add_State = '" + userdata.Add_State + @"'
                    ,Add_Zip = '" + userdata.Add_Zip + @"'
                    ,Created_On = '" + userdata.Created_On + @"'
                    where user_id = " + userdata.user_id + @" 
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("UserAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Updated Successfully!");
        }


        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                    delete from dbo.UserInfo
                    where user_id = " + id + @" 
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("UserAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Deleted Successfully!");
        }
    }
}
