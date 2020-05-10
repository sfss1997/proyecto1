using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Proyecto.Models
{
    public class ProfessorDataEF
    {
        public int Add(Professor professor, Location location, Users user)
        {
            int resultToReturn;

            using (var context = new Entities())
            {
                resultToReturn = context.SPInsertUpdateProfessor(professor.Id,
                                       user.Username,
                                       user.Password,
                                       user.IsAdministrator,
                                       user.Status,
                                       professor.Name,
                                       professor.LastName,
                                       professor.Mail,
                                       professor.Image,
                                       location.ProvinceId,
                                       location.CantonId,
                                       location.DistrictId,
                                       professor.AcademicDegreeId,
                                       "Insert");
            }
            return resultToReturn;
        }

        public int Update(Professor professor, Location location, Users user)
        {
            int resultToReturn;

            using (var context = new Entities())
            {
                resultToReturn = context.SPInsertUpdateProfessor(professor.Id,
                                       user.Username,
                                       user.Password,
                                       user.IsAdministrator,
                                       user.Status,
                                       professor.Name,
                                       professor.LastName,
                                       professor.Mail,
                                       professor.Image,
                                       location.ProvinceId,
                                       location.CantonId,
                                       location.DistrictId,
                                       professor.AcademicDegreeId,
                                       "Update");
            }
            return resultToReturn;
        }

        public List<SelectProfessor_Result> ListAllProfessors()
        {
            using (var context = new Entities())
            {
                var professors = context.SPSelectProfessor().ToList();

                return professors;

            }
        }

        public GetProfessorById_Result GetProfessorById(int id)
        {
            using (var context = new Entities())
            {
                var professor = context.SPGetProfessorById(id).Single();

                return professor;

            }
        }

        
        public int DeleteProfessor(int id)
        {
            int resultToReturn;

            using (var context = new Entities())
            {
                resultToReturn = context.SPDeleteProfessor(id);
            }
            return resultToReturn;
        }
    }
}