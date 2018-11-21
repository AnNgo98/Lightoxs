using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LightTox.Areas.User.Controllers
{
    public class HomeController : Controller
    {
        // GET: User/Index
        public ActionResult Index()
        {
            return View();
        }
    }
}