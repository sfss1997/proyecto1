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
    }
}