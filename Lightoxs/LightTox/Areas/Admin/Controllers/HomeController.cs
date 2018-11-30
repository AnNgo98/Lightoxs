using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI.WebControls;
using Lightoxs.Model;

namespace LightTox.Areas.Admin.Controllers
{
    public class HomeController : Controller
    {
        // GET: Admin/Home
        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost, ValidateInput(false)]
        public ActionResult SaveNewPost(string title, string contentPost, string typeOfNews)
        {
            string path = Path.Combine(Server.MapPath(Constants.NEWS_CSSD_FILE_URL), CommonFunction.hashSHA256("XT~|KT") + ".txt");

            using (var tw = new StreamWriter(path, true))
            {
                tw.WriteLine(contentPost);
                tw.Close();
            }

            return View();
        }
    }
}