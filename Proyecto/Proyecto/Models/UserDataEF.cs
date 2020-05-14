using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Proyecto.Models
{
    public class UserDataEF
    {

        public String VerifyTypeOfUser(int id) {

            using (var context = new Entities())
            {
                var user = context.SPTypeUserVerify(id).Single();

                return user;

            }

        }

        public String Login(String Username, String Password)
        {
            using (var context = new Entities())
            {
                var user = context.SPUsersLogin(Username, Password).Single();

                return user;

            }

        }
    }
}