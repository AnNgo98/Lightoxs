using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LightTox.Areas.User.Controllers
{
    public class TinTucController : Controller
    {
        // GET: User/TinTuc
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult DSTinTuc(int page, int count)
        {
            return Json("", JsonRequestBehavior.AllowGet);
        }
    }
}