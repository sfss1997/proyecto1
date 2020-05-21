using Proyecto.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Proyecto.Controllers
{
    public class ProfessorController : Controller
    {
        // GET: Professor
        public ActionResult Index()
        {
            return View();
        }

        ProfessorDataEF ProfessorDataEF = new ProfessorDataEF();
        Email Email = new Email();

        public JsonResult Add(Professor professor, Location location, Users user)
        {
            Email.SendEmail(professor.Mail, "Nuevo Usuario", professor.Name + " " + professor.LastName + ", ha sido añadido satisfactoriamente." +
                "\nNombre de usuario: " + user.Username +
                "\nContraseña temporal: " + user.Password + "\nDiríjase al sitio a realizar el cambio de contraseña.");
            return Json(ProfessorDataEF.Add(professor, location, user), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(Professor professor, Location location, Users user)
        {
            return Json(ProfessorDataEF.Update(professor, location, user), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetById(int id)
        {
            var professor = ProfessorDataEF.GetProfessorById(id);

            return Json(professor, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListAllProfessors()
        {
            var professors = ProfessorDataEF.ListAllProfessors();

            return Json(professors, JsonRequestBehavior.AllowGet);
        }

        public JsonResult DeleteProfessor(int id)
        {
            return Json(ProfessorDataEF.DeleteProfessor(id), JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListAcademicDegree()
        {
            var academicDegree = ProfessorDataEF.ListAcademicDegree();

            return Json(academicDegree, JsonRequestBehavior.AllowGet);
        }

        public JsonResult AddSocialNetwork(int Id, string Url, int SocialNetworkNameId)
        {
            return Json(ProfessorDataEF.AddSocialNetwork(Id, Url, SocialNetworkNameId), JsonRequestBehavior.AllowGet);
        }

        public JsonResult AddProfessorCourse(int ProfessorId, int CourseId)
        {
            return Json(ProfessorDataEF.AddProfessorCourse(ProfessorId, CourseId), JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListSocialNetworksCatalog()
        {
            return Json(ProfessorDataEF.ListSocialNetworksCatalog(), JsonRequestBehavior.AllowGet);
        }
    }
}