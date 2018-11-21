using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LightTox.Areas.User.Controllers
{
    public class TinTucController : Controller
    {
        private const string eventURL = @"~/File/EventWorkshop/Event_";
        private const string apkhURL = @"~/File/AnPhamKhoaHoc/APKH_";
        private const string cssdURL = @"~/File/ChamSocSacDep/CSSD_";

        // GET: User/TinTuc
        public ActionResult EventsWorkshop()
        {
            return View();
        }
        public ActionResult EventsWorkshop_Details(int numOfEvents)
        {
            string text = System.IO.File.ReadAllText(Server.MapPath(eventURL + numOfEvents + ".txt"));
            return View((object)text);
        }

        public ViewResult AnPhamKhoaHoc()
        {
            return View();
        }

        public ViewResult AnPhamKhoaHoc_Details(int numOfAPKH)
        {
            string text = System.IO.File.ReadAllText(Server.MapPath(apkhURL + numOfAPKH + ".txt"));
            return View((object)text);
        }

        public ViewResult ChamSocSacDep()
        {
            return View();
        }

        public ViewResult ChamSocSacDep_Details(int numOfCSSD)
        {
            string text = System.IO.File.ReadAllText(Server.MapPath(cssdURL + numOfCSSD + ".txt"));
            return View((object)text);
        }

        public ViewResult CauHoiThuongGap()
        {
            return View();
        }
    }
}