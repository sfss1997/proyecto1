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

            using (var context = new Entities1())
            {
                resultToReturn = context.InsertUpdateStudent(student.Id,
                                       student.StudentName,
                                       student.LastName,
                                       student.Birthday,
                                       student.Mail,
                                       user.IsAdministrator,
                                       student.Image,
                                       user.Password,
                                       student.RegistrationStatus,
                                       location.ProvinceId,
                                       location.CantonId,
                                       location.DistrictId,
                                       user.Status,
                                       "Insert");
            }
            return resultToReturn;
        }

        public int Update(Student student, Location location, Users user)
        {
            int resultToReturn;

            using (var context = new Entities1())
            {
                resultToReturn = context.InsertUpdateStudent(student.Id,
                                       student.StudentName,
                                       student.LastName,
                                       student.Birthday,
                                       student.Mail,
                                       user.IsAdministrator,
                                       student.Image,
                                       user.Password,
                                       student.RegistrationStatus,
                                       location.ProvinceId,
                                       location.CantonId,
                                       location.DistrictId,
                                       user.Status,
                                       "Update");
            }
            return resultToReturn;
        }

        public List<SelectStudent_Result> ListAllStudents()
        {
            using (var context = new Entities1())
            {
                var students = context.SelectStudent().ToList();

                return students;

            }
        }

        public GetStudentById_Result GetStudentById(String id)
        {
            using (var context = new Entities1())
            {
                var student = context.GetStudentById(id).Single();

                return student;

            }
        }

        public List<GetProvinces_Result> ListAllProvinces()
        {
            using (var context = new Entities1())
            {
                return context.SPGetProvinces().ToList();
            }
        }

        public List<GetCantonsByIdProvince_Result> ListCantonsByIdProvince(int id)
        {

            using (var context = new Entities1())
            {
                var cantons = context.GetCantonsByIdProvince(id).ToList();

                return cantons;

            }

        }

        public List<GetDistrictsByIdCanton_Result> ListDistrictsByIdCanton(int id)
        {

            using (var context = new Entities1())
            {
                var districts = context.GetDistrictsByIdCanton(id).ToList();

                return districts;

            }

        }

        public int UpdateStudentStatus(String id, String status)
        {
            int resultToReturn;

            using (var context = new Entities1())
            {
                resultToReturn = context.UpdateStatusStudent(id, status);
            }
            return resultToReturn;
        }

        public int DeleteStudent(String id)
        {
            int resultToReturn;

            using (var context = new Entities1())
            {
                resultToReturn = context.DeleteStudent(id);
            }
            return resultToReturn;
        }


    }
}