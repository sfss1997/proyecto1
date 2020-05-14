using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Proyecto.Models
{
    public class Email
    {
        public void SendEmail(String to, String subject, String body)
        {
            System.Net.Mail.MailMessage mmsg = new System.Net.Mail.MailMessage();
            mmsg.To.Add(to);
            mmsg.Subject = subject;
            mmsg.SubjectEncoding = System.Text.Encoding.UTF8;

            mmsg.Body = body;

            mmsg.BodyEncoding = System.Text.Encoding.UTF8;
            mmsg.IsBodyHtml = false;
            mmsg.From = new System.Net.Mail.MailAddress("infoempresarialucr@gmail.com");

            System.Net.Mail.SmtpClient client = new System.Net.Mail.SmtpClient();

            client.Credentials = new System.Net.NetworkCredential("infoempresarialucr@gmail.com", "nws.2020");
            client.Port = 587;
            client.EnableSsl = true;
            client.Host = "smtp.gmail.com";

            try
            {
                client.Send(mmsg);
            }
            catch (Exception)
            {

                throw;
            }
        }

        //public void SendEmail(String to, String subject, String body)
        //{
        //    System.Net.Mail.MailMessage mmsg = new System.Net.Mail.MailMessage();
        //    mmsg.To.Add(to);
        //    mmsg.Subject = subject;
        //    mmsg.SubjectEncoding = System.Text.Encoding.UTF8;

        //    String htmlString = "<!DOCTYPE html>< html lang = 'en' >< head >< meta charset = 'utf-8' >< title ></ title >" +
        //    "< link rel = 'stylesheet'  href = 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'  integridad = 'SHA384-ggOyR0iXCbMQv3Xipma34MD + dH / 1fQ784 / j6cY / iJTQUOhcWr7x9JvoRxT2MZw1T'  crossorigin = 'anónimo' >" +
        //    "</ head >< body style = 'background-color:lightgray;' >< br >< h5 style = 'margin: 33; padding: 0; ' > Informática Empresarial </ h5 >" +
        //    "< br >< p style = 'margin: 33; padding: 0; ' > " + body + " </ p >< br >< br >< br >< br >< br >< br >< table style = 'max-width:600px;' >" +
        //    "< tr >< th >< div class='pre' style='margin: 33; padding: 0; '>Universidad de Costa Rica<br>Sede del Atlántico<br>Recinto Paraíso<br></div>" +
        //    "</th><th><img src = 'https://medios.ucr.ac.cr/plantillas/ucr_4/imagenes/firma-ucr-ico.png' height= '100' width= '200' style= 'float:right' >" +
        //    "</ th ></ tr ></ table >< div class='pre' style='margin: 33; padding: 0; '>Para consultas o mas información ingrese a la direción www.ucr.ac.cr</div></body></html>";

        //    mmsg.Body = htmlString;
        //    mmsg.IsBodyHtml = true;
        //    mmsg.BodyEncoding = System.Text.Encoding.UTF8;
        //    mmsg.IsBodyHtml = false;
        //    mmsg.From = new System.Net.Mail.MailAddress("infoempresarialucr@gmail.com");

        //    System.Net.Mail.SmtpClient client = new System.Net.Mail.SmtpClient();

        //    client.Credentials = new System.Net.NetworkCredential("infoempresarialucr@gmail.com", "nws.2020");
        //    client.Port = 587;
        //    client.EnableSsl = true;
        //    client.Host = "smtp.gmail.com";

        //    try
        //    {
        //        client.Send(mmsg);
        //    }
        //    catch (Exception)
        //    {

        //        throw;
        //    }
        //}
    }
}