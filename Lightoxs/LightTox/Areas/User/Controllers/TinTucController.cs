using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Lightoxs.Model;

namespace LightTox.Areas.User.Controllers
{
    public class TinTucController : Controller
    {
        AnzamtechEntities db = new AnzamtechEntities();

        private const string eventURL = @"~/File/EventWorkshop/";
        private const string apkhURL = @"~/File/AnPhamKhoaHoc/";
        private const string cssdURL = @"~/File/ChamSocSacDep/";

        // GET: User/TinTuc
        public ActionResult EventsWorkshop()
        {
            List<BaiViet> lstBaiViet = db.BaiViets.Where(n => n.DanhMucBaiViet.MaDMBV == 1).OrderByDescending(n => n.MaBV).ToList();
            return View(lstBaiViet);
        }
        public ActionResult EventsWorkshop_Details(int baiVietID)
        {
            BaiViet baiViet = db.BaiViets.Find(baiVietID);

            string text = System.IO.File.ReadAllText(Server.MapPath(eventURL + baiViet.NoiDung));

            ViewBag.NoiDung = (object)text;

            return View(baiViet);
        }

        public ViewResult AnPhamKhoaHoc()
        {
            List<BaiViet> lstBaiViet = db.BaiViets.Where(n => n.DanhMucBaiViet.MaDMBV == 2).OrderByDescending(n => n.MaBV).ToList();
            return View(lstBaiViet);
        }

        public ViewResult AnPhamKhoaHoc_Details(int baiVietID)
        {
            BaiViet baiViet = db.BaiViets.Find(baiVietID);

            string text = System.IO.File.ReadAllText(Server.MapPath(apkhURL + baiViet.NoiDung));

            ViewBag.NoiDung = (object)text;

            return View(baiViet);
        }

        [HttpGet]
        public ViewResult ChamSocSacDep()
        {
            ViewBag.Page = 1;

            int page = 1;

            if (Request.QueryString["page"] != null)
            {
                ViewBag.Page = Request.QueryString["page"];
                page = Convert.ToInt32(Request.QueryString["page"]);
            }

            float totalPost = (db.BaiViets.Where(n => n.DanhMucBaiViet.MaDMBV == 3).ToList()).Count / 5;

            if (totalPost > (int)totalPost)
            {
                ViewBag.Total = (int)totalPost + 1;
            }
            else
            {
                ViewBag.Total = (int)totalPost;
            }

            List<BaiViet> lstBaiViet = db.BaiViets.Where(n => n.DanhMucBaiViet.MaDMBV == 3).OrderByDescending(n => n.MaBV).Skip((page - 1) * 5).Take(5).ToList();
            return View(lstBaiViet);
        }

        public ViewResult ChamSocSacDep_Details(int baiVietID)
        {
            BaiViet baiViet = db.BaiViets.Find(baiVietID);

            string text = System.IO.File.ReadAllText(Server.MapPath(cssdURL + baiViet.NoiDung));

            ViewBag.NoiDung = (object)text;

            return View(baiViet);
        }

        public ViewResult CauHoiThuongGap()
        {
            List<BaiViet> lstBaiViet = db.BaiViets.Where(n => n.DanhMucBaiViet.MaDMBV == 4).OrderByDescending(n => n.MaBV).ToList();

            return View(lstBaiViet);
        }
    }
}