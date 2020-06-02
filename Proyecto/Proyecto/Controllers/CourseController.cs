using Proyecto.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Proyecto.Controllers
{
    public class CourseController : Controller
    {
        // GET: Course
        public ActionResult Index()
        {
            return View();
        }

        CourseDataEF CourseDataEF = new CourseDataEF();

        public JsonResult Add(Course course)
        {
            return Json(CourseDataEF.Add(course), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(Course course)
        {
            return Json(CourseDataEF.Update(course), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetById(int id)
        {
            var course = CourseDataEF.GetCourseById(id);

            return Json(course, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListAllCourses()
        {
            var course = CourseDataEF.ListAllCourses();

            return Json(course, JsonRequestBehavior.AllowGet);
        }

        public JsonResult DeleteCourse(int id)
        {
            return Json(CourseDataEF.DeleteCourse(id), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetStudentCourses(int id)
        {
            var studentCourses = CourseDataEF.GetStudentCourses(id);

            return Json(studentCourses, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetProfessorCourses(int id)
        {
            var professorCourses = CourseDataEF.GetProfessorCourses(id);

            return Json(professorCourses, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetProfessorByIdCourse(int id)
        {
            var professorCourses = CourseDataEF.GetProfessorByIdCourse(id);

            return Json(professorCourses, JsonRequestBehavior.AllowGet);
        }

        public JsonResult AddPublicConsultation(PublicConsultation publicConsultation)
        {
            return Json(CourseDataEF.AddPublicConsultation(publicConsultation), JsonRequestBehavior.AllowGet);
        }

        public JsonResult AddPrivateMessage(PrivateMessage privateMessage)
        {
            return Json(CourseDataEF.AddPrivateMessage(privateMessage), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetPublicConsultation(int courseId, int professorId)
        {
            var publicConsultation = CourseDataEF.GetPublicConsultation(courseId, professorId);

            return Json(publicConsultation, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetPrivateMessage(int courseId, int professorId, int studentId)
        {
            var privateMessage = CourseDataEF.GetPrivateMessage(courseId, professorId, studentId);

            return Json(privateMessage, JsonRequestBehavior.AllowGet);
        }

        public JsonResult AddRepliesPublicConsultation(RepliesPublicConsultation repliesPublicConsultation)
        {
            return Json(CourseDataEF.AddRepliesPublicConsultation(repliesPublicConsultation), JsonRequestBehavior.AllowGet);
        }
    }
}