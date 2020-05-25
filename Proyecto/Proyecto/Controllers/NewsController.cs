﻿using Proyecto.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Mvc;

namespace Proyecto.Controllers
{
    public class NewsController : Controller
    {
        // GET: News
        public ActionResult Index()
        {
            return View();
        }
        //
        public JsonResult GetNews()
        {
            IEnumerable<News> news = null;

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://localhost:44352/api/news/");
                var responseTask = client.GetAsync("GetNews");
                responseTask.Wait();

                var result = responseTask.Result;

                if (result.IsSuccessStatusCode)
                {
                    var readTask = result.Content.ReadAsAsync<IList<News>>();
                    readTask.Wait();

                    news = readTask.Result;
                }
                else
                {
                    news = Enumerable.Empty<News>();
                    ModelState.AddModelError(String.Empty, "Server error. Please contact administrator");
                }
            }
            return Json(news, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetNewsByTitle(String title)
        {
            News news = null;

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://localhost:44352/api/news/");
                var responseTask = client.GetAsync("GetNewsByTitle/"+title);
                responseTask.Wait();

                var result = responseTask.Result;

                if (result.IsSuccessStatusCode)
                {
                    var readTask = result.Content.ReadAsAsync<News>();
                    readTask.Wait();

                    news = readTask.Result;
                }
                else
                {
                    news = null;
                    ModelState.AddModelError(String.Empty, "Server error. Please contact adminstrator");
                }
            }
            return Json(news, JsonRequestBehavior.AllowGet);
        }

        public JsonResult InsertNews(News news)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://localhost:44352/api/news/");
                try
                {
                    var responseTask = client.GetAsync("InsertNews/" + news);
                    responseTask.Wait();
                }
                catch (AggregateException agg_ex)
                {
                    var ex = agg_ex.InnerExceptions[0];
                }
            }
            return Json(1, JsonRequestBehavior.AllowGet);
        }

        public JsonResult UpdateNews(News news)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://localhost:44352/api/news/");
                try
                {
                    var responseTask = client.GetAsync("UpdateNews/" + news);
                    responseTask.Wait();
                }
                catch (AggregateException agg_ex)
                {
                    var ex = agg_ex.InnerExceptions[0];
                }
            }
            return Json(1, JsonRequestBehavior.AllowGet);
        }

        public JsonResult DeleteNews(int id)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://localhost:44352/api/news/");
                try
                {
                    var responseTask = client.GetAsync("DeleteNews/" + id);
                    responseTask.Wait();
                }
                catch (AggregateException agg_ex)
                {
                    var ex = agg_ex.InnerExceptions[0];
                }
            }
            return Json(1, JsonRequestBehavior.AllowGet);
        }
    }
}