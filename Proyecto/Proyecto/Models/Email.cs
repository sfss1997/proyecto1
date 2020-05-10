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
    }
}