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
        AnzamtechEntities db = new AnzamtechEntities();

        // GET: Admin/Home
        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost, ValidateInput(false)]
        public ActionResult Index(string title, string contentPost, string typeOfNews)
        {
            string path = "";
            if (typeOfNews == "1")
            {
                path = Path.Combine(Server.MapPath(Constants.NEWS_EvWo_FILE_URL), CommonFunction.hashSHA256("XT~|KT") + ".txt");
                ViewBag.typeOfNews = "EvWo";
            }
            else if (typeOfNews == "2")
            {
                path = Path.Combine(Server.MapPath(Constants.NEWS_APKH_FILE_URL), CommonFunction.hashSHA256("XT~|KT") + ".txt");
                ViewBag.typeOfNews = "APKH";
            }
            else if (typeOfNews == "3")
            {
                path = Path.Combine(Server.MapPath(Constants.NEWS_CSSD_FILE_URL), CommonFunction.hashSHA256("XT~|KT") + ".txt");
                ViewBag.typeOfNews = "CSSD";
            }
            else if (typeOfNews == "4")
            {
                path = Path.Combine(Server.MapPath(Constants.NEWS_CHTG_FILE_URL), CommonFunction.hashSHA256("XT~|KT") + ".txt");
                ViewBag.typeOfNews = "CHTG";
            }

            using (var tw = new StreamWriter(path, true))
            {
                tw.WriteLine(contentPost);
            }

            return View("Index");
        }

        [HttpGet]
        public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Login(string username, string password)
        {
            NhanVien nv = db.NhanViens.SingleOrDefault(n => n.TenDN == username && n.MatKhau == password);

            if (nv != null)
            {
                Session["Account"] = nv;

                return RedirectToAction("Index");
            }

            ViewBag.Error = "Username or password is incorrect";
            return View("Login");
        }

        public ActionResult Logout()
        {
            Session.Abandon();
            return RedirectToAction("Login", "Home");
        }
    }
}