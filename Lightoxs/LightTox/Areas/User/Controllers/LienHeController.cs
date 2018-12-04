using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Lightoxs.Model;

namespace LightTox.Areas.User.Controllers
{
    public class LienHeController : Controller
    {
        // GET: User/LienHe
        [HttpGet]
        public ActionResult Index()
        {

            if (TempData["sendMessage"] != null && TempData["sendMessage"].ToString() != "")
            {
                ViewBag.SendMessage = TempData["sendMessage"].ToString();
            }


            return View();
        }

        [HttpPost]
        public ActionResult Index(TinNhan tinnhan)
        {
            if (ModelState.IsValid)
            {
                using (AnzamtechEntities db = new AnzamtechEntities())
                {
                    db.TinNhans.Add(tinnhan);
                    db.SaveChanges();
                }
            }
            else
            {
                //not ok
            }

            TempData["sendMessage"] = "OK";
            return RedirectToAction("Index");
        }
    }
}