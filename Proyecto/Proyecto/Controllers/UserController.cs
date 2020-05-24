using Proyecto.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Proyecto.Controllers
{
    public class UserController : Controller
    {
        // GET: User
        public ActionResult Index()
        {
            return View();
        }

        UserDataEF userDataEF = new UserDataEF();

        public JsonResult ListAllUsers()
        {
            return Json(userDataEF.ListAllUsers(), JsonRequestBehavior.AllowGet);
        }

    }
}