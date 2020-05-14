using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Proyecto.Models
{
    public class UserDataEF
    {

        public List<SelectUsers_Result> ListAllUsers()
        {
            using (var context = new Entities())
            {
                var users = context.SPSelectUsers().ToList();

                return users;

            }
        }
    }
}