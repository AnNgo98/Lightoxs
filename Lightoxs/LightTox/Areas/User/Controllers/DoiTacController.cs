using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Lightoxs.Areas.User.Controllers
{
    public class DoiTacController : Controller
    {
        private const string doitacURL = @"~/File/DoiTac/";

        // GET: User/DoiTac
        public ViewResult Index()
        {
            return View();
        }

        public ViewResult DoiTac_Details(string nameOfDoiTac)
        {
            string text = System.IO.File.ReadAllText(Server.MapPath(doitacURL + nameOfDoiTac + ".txt"));
            return View((object)text);
        }
    }
}