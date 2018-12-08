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

        [HttpGet]
        public ActionResult Index()
        {
            if (TempData["addNewPost"] != null && TempData["addNewPost"].ToString() != "")
            {
                ViewBag.AddNewPost = TempData["addNewPost"].ToString();
            }

            return View();
        }

        [HttpPost, ValidateInput(false)]
        public ActionResult Index(string title, string description, string contentPost, string typeOfNews, string finish)
        {
            NhanVien nv = Session["Account"] as NhanVien;

            BaiViet bv = new BaiViet();
            bv.NhanVien = db.NhanViens.Find(nv.MaNV);
            bv.TenBV = title;
            bv.NgayDang = DateTime.Now;
            bv.DanhMucBaiViet = db.DanhMucBaiViets.Single(n => n.MaDMBV.ToString() == typeOfNews);
            
            string pathNoiDung = "";
            string extensionFileName = "";
            string fileName = CommonFunction.Instance.RemoveUnicode((title + "-" + DateTime.Now.ToString())).Replace(" ", "-");
            

            if (typeOfNews == "1")
            {
                pathNoiDung = Path.Combine(Server.MapPath(Constants.NEWS_EvWo_FILE_URL), fileName + ".txt");
                

                if (Request.Files.Count > 0)
                {
                    var file = Request.Files[0];

                    if (file != null)
                    {
                        string pic = Path.GetFileName(file.FileName);

                        extensionFileName = CommonFunction.Instance.getExtensionFileName(pic);

                        pic = fileName + "-MoTa" + extensionFileName;

                        string pathMoTa = Path.Combine(Server.MapPath(Constants.NEWS_EvWo_IMG_MOTA_URL), pic);

                        file.SaveAs(pathMoTa);

                        bv.MoTa = pic;
                    }
                }

                bv.NgayDienRa = DateTime.Parse(finish);
            }
            else if (typeOfNews == "2")
            {
                pathNoiDung = Path.Combine(Server.MapPath(Constants.NEWS_APKH_FILE_URL), fileName + ".txt");

                if (Request.Files.Count > 0)
                {
                    var file = Request.Files[0];

                    if (file != null)
                    {
                        string pic = Path.GetFileName(file.FileName);

                        extensionFileName = CommonFunction.Instance.getExtensionFileName(pic);

                        pic = fileName + "-MoTa" + extensionFileName;

                        string path = Path.Combine(Server.MapPath(Constants.NEWS_APKH_IMG_MOTA_URL), pic);

                        file.SaveAs(path);

                        bv.MoTa = pic;
                    }
                }

                bv.NgayDienRa = DateTime.Parse(finish);
            }
            else if (typeOfNews == "3")
            {
                pathNoiDung = Path.Combine(Server.MapPath(Constants.NEWS_CSSD_FILE_URL), fileName + ".txt");

                if(description.Length > 320)
                {
                    bv.MoTa = description.Substring(0, 320);
                }
                else
                {
                    bv.MoTa = description;
                }
                    
            }
            
            if (typeOfNews != "4")
            {
                using (var tw = new StreamWriter(pathNoiDung, true))
                {
                    tw.WriteLine(contentPost);
                }
                bv.NoiDung = fileName + ".txt";
            }
            else
            {
                bv.MoTa = "";
                bv.NoiDung = description;
            }

            db.BaiViets.Add(bv);

            db.SaveChanges();

            TempData["addNewPost"] = "OK";

            return RedirectToAction("Index");
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