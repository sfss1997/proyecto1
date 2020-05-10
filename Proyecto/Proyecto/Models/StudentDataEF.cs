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

        public List<GetProvinces_Result> ListAllProvinces()
        {
            using (var context = new Entities())
            {
                return context.SPGetProvinces().ToList();
            }
        }

        public List<StudentApproval_Result> ListStudentApproval()
        {
            using (var context = new Entities())
            {
                return context.SPStudentApproval().ToList();
            }
        }

        public List<GetCantonsByIdProvince_Result> ListCantonsByIdProvince(int id)
        {

            using (var context = new Entities())
            {
                var cantons = context.GetCantonsByIdProvince(id).ToList();

                return cantons;

            }

        }

        public List<GetDistrictsByIdCanton_Result> ListDistrictsByIdCanton(int id)
        {

            using (var context = new Entities())
            {
                var districts = context.GetDistrictsByIdCanton(id).ToList();

                return districts;

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