using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class AccountController : Controller
    {
        // GET: User
        // this should be the sign in form?
        public ActionResult Index()
        {
            return View();
        }

        // can jsut be an empty page ??? right now is a details page so have a model for it?
        [HttpGet]
        public ActionResult LogIn()
        {
            return View();
        }

        // should be a details page
        [HttpPost]
        public ActionResult LogIn(string userName, string passWord)
        {
            //call repo method to get account absed on username
            AppUserRepo repo = new AppUserRepo();

            var user = repo.GetUser(userName);          

            if (user == null) {
                ViewBag.Error = "No account with that username";
                return View();
            }
            if (user.passWord != passWord) {
                ViewBag.Error = "Incorrect password";
                return View();
            }

            // pass accounts user ID to details view
            return RedirectToAction("Details", new { userID = user.userID });
        }

        public ActionResult Details(int userID)
        {
            AppUserRepo repo = new AppUserRepo();
            AppUser account = repo.GetAccount(userID);

            return View(account);
        }

        [HttpGet]
        public ActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Create(AppUser newUser)
        {
            AppUserRepo repo = new AppUserRepo();

            if (ModelState.IsValid) {
                repo.AddAccount(newUser);

                return RedirectToAction("Details", new { userID = newUser.userID });
            } else {
                return View();
            }            
        }

        [HttpGet]
        public ActionResult Edit(int userID)
        {
            AppUserRepo repo = new AppUserRepo();
            AppUser account = repo.GetAccount(userID);

            return View(account);
        }

        [HttpPost]
        public ActionResult Edit(AppUser userAccount)
        {
            AppUserRepo repo = new AppUserRepo();

            if (ModelState.IsValid) {
                repo.UpdateAccount(userAccount.userID, userAccount);
                return RedirectToAction("Details", new { userID = userAccount.userID });
            }
            return View();
        }

        [HttpGet]
        public ActionResult Delete(int userID)
        {
            AppUserRepo repo = new AppUserRepo();
            AppUser account = repo.GetAccount(userID);

            return View(account);
        }
        
        // delete and send to home index page
        [HttpPost]
        public ActionResult Delete(AppUser account)
        {
            AppUserRepo repo = new AppUserRepo();
            repo.DeleteAccount(account.userID);
            return RedirectToAction("Index", "Home", new { });
        }
    }
}