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

        public List<GetStudentCourses_Result> GetStudentCourses(int id)
        {
            using (var context = new Entities())
            {
                var studentCourses = context.SPGetStudentCourses(id).ToList();

                return studentCourses;

            }
        }

        public List<GetProfessorCourses_Result> GetProfessorCourses(int id)
        {
            using (var context = new Entities())
            {
                var professorCourses = context.SPGetProfessorCourses(id).ToList();

                return professorCourses;

            }
        }

        public List<GetProfessorByIdCourse_Result> GetProfessorByIdCourse(int id)
        {
            using (var context = new Entities())
            {
                var professorCourses = context.SPGetProfessorByIdCourse(id).ToList();

                return professorCourses;

            }
        }

        public int AddPublicConsultation(PublicConsultation publicConsultation)
        {
            int resultToReturn;

            using (var context = new Entities())
            {
                resultToReturn = context.InsertPublicConsultation(
                                       publicConsultation.CourseId,
                                       publicConsultation.StudentId,
                                       publicConsultation.ProfessorId,
                                       publicConsultation.Motive,
                                       publicConsultation.DateTime);
            }
            return resultToReturn;
        }


        public int AddRepliesPublicConsultation(RepliesPublicConsultation repliesPublicConsultation)
        {
            int resultToReturn;

            using (var context = new Entities())
            {
                resultToReturn = context.InsertRepliesPublicConsultation(
                                       repliesPublicConsultation.PublicConsultationId,
                                       repliesPublicConsultation.StudentId,
                                       repliesPublicConsultation.ProfessorId,
                                       repliesPublicConsultation.Motive,
                                       repliesPublicConsultation.DateTime);
            }
            return resultToReturn;
        }

        public int AddPrivateMessage(PrivateMessage privateMessage)
        {
            int resultToReturn;

            using (var context = new Entities())
            {
                resultToReturn = context.InsertPrivateMessage(
                                       privateMessage.CourseId,
                                       privateMessage.StudentId,
                                       privateMessage.ProfessorId,
                                       privateMessage.Motive,
                                       privateMessage.DateTime);
            }
            return resultToReturn;
        }

        public List<GetPublicConsultation_Result> GetPublicConsultation(int courseId, int professorId)
        {
            using (var context = new Entities())
            {
                var publicConsultation = context.SPGetPublicConsultation(courseId, professorId).ToList();

                return publicConsultation;

            }
        }

        public List<GetPrivateMessage_Result> GetPrivateMessage(int courseId, int professorId, int studentId)
        {
            using (var context = new Entities())
            {
                var privateMessage = context.SPGetPrivateMessage(courseId, professorId, studentId).ToList();

                return privateMessage;

            }
        }

        public List<GetRepliesPublicConsultation_Result> GetRepliesPublicConsultation(int publicConsultationId)
        {
            using (var context = new Entities())
            {
                var replies = context.SPGetRepliesPublicConsultation(publicConsultationId).ToList();

                return replies;

            }
        }

        public int AddRepliesPrivateMessage(RepliesPrivateMessage repliesPrivateMessage)
        {
            int resultToReturn;

            using (var context = new Entities())
            {
                resultToReturn = context.InsertRepliesPrivateMessage(
                                       repliesPrivateMessage.PrivateMessageId,
                                       repliesPrivateMessage.StudentId,
                                       repliesPrivateMessage.ProfessorId,
                                       repliesPrivateMessage.Motive,
                                       repliesPrivateMessage.DateTime);
            }
            return resultToReturn;
        }

        public List<GetRepliesPrivateMessage_Result> GetRepliesPrivateMessage(int privateMessageId)
        {
            using (var context = new Entities())
            {
                var replies = context.SPGetRepliesPrivateMessage(privateMessageId).ToList();

                return replies;

            }
        }
    }
}