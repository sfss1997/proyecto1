using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Proyecto.Models
{
    public class LocationDataEF
    {
        public List<GetProvinces_Result> ListAllProvinces()
        {
            using (var context = new Entities())
            {
                return context.SPGetProvinces().ToList();
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


    }
}