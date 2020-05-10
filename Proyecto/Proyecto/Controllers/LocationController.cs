using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Proyecto.Models;

namespace Proyecto.Controllers
{
    public class LocationController : Controller
    {
        // GET: Location
        public ActionResult Index()
        {
            return View();
        }

       |LocationDataEF LocationDataEF = new LocationDataEF();

        public JsonResult ListCantonsByIdProvince(int id)
        {
            var cantons = LocationDataEF.ListCantonsByIdProvince(id);

            return Json(cantons, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListDistrictsByIdCanton(int id)
        {
            var districts = LocationDataEF.ListDistrictsByIdCanton(id);

            return Json(districts, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListAllProvinces()
        {
            var provinces = LocationDataEF.ListAllProvinces();

            return Json(provinces, JsonRequestBehavior.AllowGet);
        }
    }
}