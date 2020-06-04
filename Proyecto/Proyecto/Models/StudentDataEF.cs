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
                resultToReturn = context.SPInsertUpdateStudent(student.Id,
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
                resultToReturn = context.SPInsertUpdateStudent(student.Id,
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
                var students = context.SPSelectStudent().ToList();

                return students;

            }
        }

        public GetStudentById_Result GetStudentById(int id)
        {
            using (var context = new Entities())
            {
                var student = context.SPGetStudentById(id).Single();

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

        public List<ListStudent_Result> ListStudents()
        {
            using (var context = new Entities())
            {
                var students = context.SPListStudent().ToList();

                return students;

            }
        }

        public int AddSocialNetwork(SocialNetworksStudent socialNetworksStudent)
        {
            int resultToReturn;

            using (var context = new Entities())
            {
                resultToReturn = context.InsertUpdateSocialNetworkStudent(socialNetworksStudent.Id,
                                       socialNetworksStudent.StudentId,
                                       socialNetworksStudent.Url,
                                       socialNetworksStudent.SocialNetworksNameId,
                                       "Insert");
            }
            return resultToReturn;
        }

        public int AddStudentCourse(StudentCourse studentCourse)
        {
            int resultToReturn;

            using (var context = new Entities())
            {
                resultToReturn = context.InsertStudentCourse(studentCourse.StudentId,
                                       studentCourse.CourseId);
            }
            return resultToReturn;
        }

        public List<GetNameSocialNetworks_Result> ListSocialNetworksCatalog()
        {
            using (var context = new Entities())
            {
                var socialNetworks = context.SPGetNameSocialNetworks().ToList();

                return socialNetworks;

            }
        }

        public List<GetSocialNetworksByIdStudent_Result> GetSocialNetworksByIdStudent(int id)
        {
            using (var context = new Entities())
            {
                var socialNetworks = context.SPGetSocialNetworksByIdStudent(id).ToList();

                return socialNetworks;

            }
        }

        public int UpdateImage(Student student)
        {
            int resultToReturn;

            using (var context = new Entities())
            {
                resultToReturn = context.UpdateStudentImage(student.Image, student.Id);
            }
            return resultToReturn;
        }

    }
}