using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Proyecto.Models
{
    public class CourseDataEF
    {
        public int Add(Course course)
        {
            int resultToReturn;

            using (var context = new Entities())
            {
                resultToReturn = context.SPInsertUpdateCourse(
                                       course.Id,
                                       course.Initials,
                                       course.Name,
                                       course.IsActive,
                                       course.Credits,
                                       course.Cycle,
                                       "Insert");
            }
            return resultToReturn;
        }

        public int Update(Course course)
        {
            int resultToReturn;

            using (var context = new Entities())
            {
                resultToReturn = context.SPInsertUpdateCourse(
                                       course.Id,
                                       course.Initials,
                                       course.Name,
                                       course.IsActive,
                                       course.Credits,
                                       course.Cycle,
                                       "Update");
            }
            return resultToReturn;
        }

        public List<SelectCourse_Result> ListAllCourses()
        {
            using (var context = new Entities())
            {
                var courses = context.SPSelectCourse().ToList();

                return courses;

            }
        }

        public GetCourseById_Result GetCourseById(int id)
        {
            using (var context = new Entities())
            {
                var course = context.SPGetCourseById(id).Single();

                return course;

            }
        }


        public int DeleteCourse(int id)
        {
            int resultToReturn;

            using (var context = new Entities())
            {
                resultToReturn = context.SPDeleteCourse(id);
            }
            return resultToReturn;
        }
    }
}