using Proyecto.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Proyecto.Controllers
{

    public class HomeController : Controller
    {
        StudentDataEF StudentDataEF = new StudentDataEF();
        public ActionResult Index()
        {
            return View();
        }
       
        public void SendEmail(String to, String subject, String body)
        {
            System.Net.Mail.MailMessage mmsg = new System.Net.Mail.MailMessage();
            mmsg.To.Add(to);
            mmsg.Subject = subject;
            mmsg.SubjectEncoding = System.Text.Encoding.UTF8;

            mmsg.Body = body;

            mmsg.BodyEncoding = System.Text.Encoding.UTF8;
            mmsg.IsBodyHtml = false;
            mmsg.From = new System.Net.Mail.MailAddress("infoempresarialucr@gmail.com");

            System.Net.Mail.SmtpClient client = new System.Net.Mail.SmtpClient();

            client.Credentials = new System.Net.NetworkCredential("infoempresarialucr@gmail.com", "nws.2020");
            client.Port = 587;
            client.EnableSsl = true;
            client.Host = "smtp.gmail.com";

            try
            {
                client.Send(mmsg);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public JsonResult Add(Student student, Location location, Users user)
        {
            SendEmail(student.Mail, "New user", student.StudentName + ", you have been successfully added, pending approval");
            return Json(StudentDataEF.Add(student, location, user), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(Student student, Location location, Users user)
        {
            return Json(StudentDataEF.Add(student, location, user), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetById(String id)
        {
            var student = StudentDataEF.GetStudentById(id);

            return Json(student, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListAllStudents()
        {
            var student = StudentDataEF.ListAllStudents();

            return Json(student, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListAllProvinces()
        {
            var provinces = StudentDataEF.ListAllProvinces();

            return Json(provinces, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListStudentApproval()
        {
            var students = StudentDataEF.ListStudentApproval();

            return Json(students, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListCantonsByIdProvince(int id)
        {
            var cantons = StudentDataEF.ListCantonsByIdProvince(id);

            return Json(cantons, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListDistrictsByIdCanton(int id)
        {
            var districts = StudentDataEF.ListDistrictsByIdCanton(id);

            return Json(districts, JsonRequestBehavior.AllowGet);
        }

        public JsonResult UpdateStudentStatus(String id, String status)
        {
            var student = StudentDataEF.GetStudentById(id);
            SendEmail(student.Mail, "Status Update", student.Name+ ", you have been "+status);
            return Json(StudentDataEF.UpdateStudentStatus(id, status), JsonRequestBehavior.AllowGet);
        }

        public JsonResult DeleteStudent(String id)
        {
            return Json(StudentDataEF.DeleteStudent(id), JsonRequestBehavior.AllowGet);
        }
    }

}