using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Proyecto.Models
{
    public class StudentDataEF
    {
        public int Add(Student student, Location location, Users user)
        {
            int resultToReturn;

            using (var context = new Entities())
            {
                resultToReturn = context.InsertUpdateStudent(student.Id,
                                       user.Username,
                                       user.Password,
                                       user.IsAdministrator,
                                       user.Status,
                                       student.StudentCard,
                                       student.StudentName,
                                       student.LastName,
                                       student.Birthday,
                                       student.Mail,
                                       student.Image,
                                       student.RegistrationStatus,
                                       location.ProvinceId,
                                       location.CantonId,
                                       location.DistrictId,
                                       "Insert");
            }
            return resultToReturn;
        }

        public int Update(Student student, Location location, Users user)
        {
            int resultToReturn;

            using (var context = new Entities())
            {
                resultToReturn = context.InsertUpdateStudent(student.Id,
                                       user.Username,
                                       user.Password,
                                       user.IsAdministrator,
                                       user.Status,
                                       student.StudentCard,
                                       student.StudentName,
                                       student.LastName,
                                       student.Birthday,
                                       student.Mail,
                                       student.Image,
                                       student.RegistrationStatus,
                                       location.ProvinceId,
                                       location.CantonId,
                                       location.DistrictId,
                                       "Update");
            }
            return resultToReturn;
        }

        public List<SelectStudent_Result> ListAllStudents()
        {
            using (var context = new Entities())
            {
                var students = context.SelectStudent().ToList();

                return students;

            }
        }

        public GetStudentById_Result GetStudentById(int id)
        {
            using (var context = new Entities())
            {
                var student = context.GetStudentById(id).Single();

                return student;

            }
        }

        

        public List<StudentApproval_Result> ListStudentApproval()
        {
            using (var context = new Entities())
            {
                return context.SPStudentApproval().ToList();
            }
        }


        public int UpdateStudentStatus(int id, String status)
        {
            int resultToReturn;

            using (var context = new Entities())
            {
                resultToReturn = context.UpdateStatusStudent(id, status);
            }
            return resultToReturn;
        }

        public int DeleteStudent(int id)
        {
            int resultToReturn;

            using (var context = new Entities())
            {
                resultToReturn = context.DeleteStudent(id);
            }
            return resultToReturn;
        }


    }
}