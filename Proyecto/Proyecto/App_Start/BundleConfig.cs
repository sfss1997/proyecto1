using System.Web;
using System.Web.Optimization;

namespace Proyecto
{
    public class BundleConfig
    {
        // Para obtener más información sobre las uniones, visite https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Utilice la versión de desarrollo de Modernizr para desarrollar y obtener información. De este modo, estará
            // para la producción, use la herramienta de compilación disponible en https://modernizr.com para seleccionar solo las pruebas que necesite.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-2.8.3*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));

            bundles.Add(new ScriptBundle("~/bundles/datatables").Include(
                      "~/Scripts/datatables.js",
                      "~/Scripts/dataTables.bootstrap.js",
                      "~/Scripts/dataTables.bootstrap4.js",
                      "~/Scripts/dataTables.foundation.js",
                      "~/Scripts/dataTables.jqueryui.js",
                      "~/Scripts/dataTables.semanticui.js",
                      "~/Scripts/jquery.dataTables.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                     "~/Content/datatables.css",
                     "~/Content/dataTables.bootstrap.css",
                     "~/Content/dataTables.bootstrap4.css",
                     "~/Content/dataTables.foundation.css",
                     "~/Content/dataTables.jqueryui.css",
                     "~/Content/dataTables.semanticui.css",
                     "~/Content/jquery.dataTables.css",
                     "~/Content/dataTables.bootstrap4.min.css"));
        }
    }
}
