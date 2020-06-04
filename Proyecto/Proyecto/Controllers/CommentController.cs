﻿using Newtonsoft.Json;
using Proyecto.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Web.Mvc;

namespace Proyecto.Controllers
{
    public class CommentController : Controller
    {
        // GET: Comment
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetComment(int id)
        {
            IEnumerable<Comment> comments = null;

            using (var client = new HttpClient())
            {
                //client.BaseAddress = new Uri("https://localhost:44352/api/comment/");
                client.BaseAddress = new Uri("https://apinews.azurewebsites.net/api/comment/");         
                var responseTask = client.GetAsync("GetCommentsByIdNews/" + id);
                responseTask.Wait();

                var result = responseTask.Result;

                if (result.IsSuccessStatusCode)
                {
                    var readTask = result.Content.ReadAsAsync<IList<Comment>>();
                    readTask.Wait();

                    comments = readTask.Result;
                }
                else
                {
                    comments = Enumerable.Empty<Comment>();
                    ModelState.AddModelError(String.Empty, "Server error. Please contact adminstrator");
                }
            }
            return Json(comments, JsonRequestBehavior.AllowGet);
        }

        public JsonResult InsertComment(Comment comment)
        {
            using (var client = new HttpClient())
            {
                //client.BaseAddress = new Uri("https://localhost:44352/api/comment/");
                client.BaseAddress = new Uri("https://apinews.azurewebsites.net/api/comment/");
                try
                {
                    var responseTask = client.PostAsJsonAsync<Comment>("PostComment", comment);
                    responseTask.Wait();

                    var result = responseTask.Result;

                    if (result.IsSuccessStatusCode)
                    {
                        var readTask = result.Content.ReadAsAsync<Comment>();
                        readTask.Wait();

                        comment = readTask.Result;
                    }
                }
                catch (AggregateException agg_ex)
                {
                    var ex = agg_ex.InnerExceptions[0];
                }
            }
            return Json(comment, JsonRequestBehavior.AllowGet);
        }

        public JsonResult DeleteComment(int id)
        {
            using (var client = new HttpClient())
            {
                //client.BaseAddress = new Uri("https://localhost:44352/api/comment/");
                client.BaseAddress = new Uri("https://apinews.azurewebsites.net/api/comment/");
                try
                {
                    var responseTask = client.GetAsync("DeleteComment/" + id);
                    responseTask.Wait();
                }
                catch (AggregateException agg_ex)
                {
                    var ex = agg_ex.InnerExceptions[0];
                }
            }
            return Json(1, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetComments()
        {
            IEnumerable<Comment> comments = null;

            using (var client = new HttpClient())
            {
                //client.BaseAddress = new Uri("https://localhost:44352/api/comment/");
                client.BaseAddress = new Uri("https://apinews.azurewebsites.net/api/comment/");
                var responseTask = client.GetAsync("GetComments");
                responseTask.Wait();

                var result = responseTask.Result;

                if (result.IsSuccessStatusCode)
                {
                    var readTask = result.Content.ReadAsAsync<IList<Comment>>();
                    readTask.Wait();

                    comments = readTask.Result;
                }
                else
                {
                    comments = Enumerable.Empty<Comment>();
                    ModelState.AddModelError(String.Empty, "Server error. Please contact administrator");
                }
            }
            return Json(comments, JsonRequestBehavior.AllowGet);
        }
    }


}