﻿using Proyecto.Models;
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

        public JsonResult GetPrivateMessage(int courseId, int professorId)
        {
            var privateMessage = CourseDataEF.GetPrivateMessage(courseId, professorId);

            return Json(privateMessage, JsonRequestBehavior.AllowGet);
        }

        public JsonResult AddRepliesPublicConsultation(RepliesPublicConsultation repliesPublicConsultation)
        {
            return Json(CourseDataEF.AddRepliesPublicConsultation(repliesPublicConsultation), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetRepliesPublicConsultation(int id)
        {
            var replies = CourseDataEF.GetRepliesPublicConsultation(id);

            return Json(replies, JsonRequestBehavior.AllowGet);
        }

        public JsonResult AddRepliesPrivateMessage(RepliesPrivateMessage repliesPrivateMessage)
        {
            return Json(CourseDataEF.AddRepliesPrivateMessage(repliesPrivateMessage), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetRepliesPrivateMessage(int id)
        {
            var replies = CourseDataEF.GetRepliesPrivateMessage(id);

            return Json(replies, JsonRequestBehavior.AllowGet);
        }

        public JsonResult AddAppointment(Appointment appointment)
        {
            return Json(CourseDataEF.AddAppointment(appointment), JsonRequestBehavior.AllowGet);
        }

        public JsonResult UpdateStatusAppointment(Appointment appointment)
        {
            return Json(CourseDataEF.UpdateStatusAppointment(appointment), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAppointment(int studentId, int professorId, int courseId)
        {
            var appointment = CourseDataEF.GetAppointment(studentId, professorId, courseId);

            return Json(appointment, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAppointmentById(int id)
        {
            var appointment = CourseDataEF.GetAppointmentById(id);

            return Json(appointment, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAppointmentProfessor(int professorId, int courseId)
        {
            var appointment = CourseDataEF.GetAppointmentProfessor(professorId, courseId);

            return Json(appointment, JsonRequestBehavior.AllowGet);
        }
    }
}