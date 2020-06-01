using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Proyecto.Models;
using Microsoft.VisualBasic.Devices;

namespace Proyecto.Controllers
{
    public class StudentController : Controller
    {
        Computer Computer = new Computer();
        // GET: Student
        public ActionResult Index()
        {
            return View();
        }

        StudentDataEF StudentDataEF = new StudentDataEF();
        Email Email = new Email();

        public JsonResult Add(Student student, Location location, Users user)
        {
            //var path = Path.Combine(Server.MapPath("~/images/"), student.Image);
            //Computer.FileSystem.CopyFile(student.Image, path);
            Email.SendEmail(student.Mail,"Nuevo Usuario", student.StudentName + " " + student.LastName +
              ", ha sido añadido satisfactoriamente, su aprobación se encuentra en espera. ");
            return Json(StudentDataEF.Add(student, location, user), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(Student student, Location location, Users user)
        {
            return Json(StudentDataEF.Update(student, location, user), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetById(int id)
        {
            var student = StudentDataEF.GetStudentById(id);

            return Json(student, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListAllStudents()
        {
            var students = StudentDataEF.ListAllStudents();

            return Json(students, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListStudentApproval()
        {
            var students = StudentDataEF.ListStudentApproval();

            return Json(students, JsonRequestBehavior.AllowGet);
        }

        public JsonResult StudentApproval(int id)
        {
            var student = StudentDataEF.GetStudentById(id);
            Email.SendEmail(student.Mail, "Actualización de estado", "El estudiante " + student.StudentName + " " + student.LastName + ", ha sido aprobado.");
            return Json(StudentDataEF.UpdateStudentStatus(id, "Aprobado"), JsonRequestBehavior.AllowGet);
        }

        public JsonResult StudentDeny(int id)
        {
            var student = StudentDataEF.GetStudentById(id);
            Email.SendEmail(student.Mail, "Actualización de estado","El estudiante " + student.StudentName + " " + student.LastName + ", ha sido rechazado.");
            return Json(StudentDataEF.UpdateStudentStatus(id, "Rechazado"), JsonRequestBehavior.AllowGet);
        }

        public JsonResult DeleteStudent(int id)
        {
            return Json(StudentDataEF.DeleteStudent(id), JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListStudents()
        {
            var students = StudentDataEF.ListStudents();

            return Json(students, JsonRequestBehavior.AllowGet);
        }

        public JsonResult AddSocialNetwork(SocialNetworksStudent socialNetworksStudent)
        {
            return Json(StudentDataEF.AddSocialNetwork(socialNetworksStudent), JsonRequestBehavior.AllowGet);
        }

        public JsonResult AddStudentCourse(StudentCourse studentCourse)
        {
            return Json(StudentDataEF.AddStudentCourse(studentCourse), JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListSocialNetworksCatalog()
        {
            var socialNetworks = StudentDataEF.ListSocialNetworksCatalog();
            return Json(socialNetworks, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetSocialNetworksByIdStudent(int id)
        {
            return Json(StudentDataEF.GetSocialNetworksByIdStudent(id), JsonRequestBehavior.AllowGet);
        }

        public JsonResult UpdateImage(Student student)
        {
            return Json(StudentDataEF.UpdateImage(student), JsonRequestBehavior.AllowGet);
        }
    }
}