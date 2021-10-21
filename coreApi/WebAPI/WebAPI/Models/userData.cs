
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class userData
    {
        public int user_id { get; set; }
        public string First_Name { get; set; }
        public string Middle_Name { get; set; }
        public string Last_Name { get; set; }
        public string Email { get; set; }
        public string Date_of_Birth { get; set; }
        public string Phone_No { get; set; }
        public string Add_City { get; set; }
        public string Add_State { get; set; }
        public string Add_Zip { get; set; }
        public string Created_On { get; set; }
    }
}
