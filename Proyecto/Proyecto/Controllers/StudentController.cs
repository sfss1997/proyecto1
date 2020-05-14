using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Proyecto.Models;

namespace Proyecto.Controllers
{
    public class StudentController : Controller
    {
        // GET: Student
        public ActionResult Index()
        {
            return View();
        }

        StudentDataEF StudentDataEF = new StudentDataEF();
        Email Email = new Email();

        public JsonResult Add(Student student, Location location, Users user)
        {
            Email.SendEmail(student.Mail,"Nuevo Usuario", student.StudentName + " " + student.LastName +
                ", ha sido añadido satisfactoriamente, su aprobación se encuentra en espera. " +
                "\n\n\n\n" + "Para consultas o mas información ingrese a la direción www.ucr.ac.cr"+
                "\nUniversidad de Costa Rica" +
                "\nInformática Empresarial");
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
            Email.SendEmail(student.Mail, "Actualización de estado", "El estudiante " + student.StudentName + " " + student.LastName + ", ha sido aprobado." +
                "\n\n\n\n" + "Para consultas o mas información ingrese a la direción www.ucr.ac.cr" +
                "\nUniversidad de Costa Rica" +
                "\nInformática Empresarial");
            return Json(StudentDataEF.UpdateStudentStatus(id, "Aprobado"), JsonRequestBehavior.AllowGet);
        }

        public JsonResult StudentDeny(int id)
        {
            var student = StudentDataEF.GetStudentById(id);
            Email.SendEmail(student.Mail, "Actualización de estado","El estudiante " + student.StudentName + " " + student.LastName + ", ha sido rechazado." +
                "\n\n\n\n" + "Para consultas o mas información ingrese a la direción www.ucr.ac.cr" +
                "\nUniversidad de Costa Rica" +
                "\nInformática Empresarial");
            return Json(StudentDataEF.UpdateStudentStatus(id, "Rechazado"), JsonRequestBehavior.AllowGet);
        }

        public JsonResult DeleteStudent(int id)
        {
            return Json(StudentDataEF.DeleteStudent(id), JsonRequestBehavior.AllowGet);
        }
    }
}