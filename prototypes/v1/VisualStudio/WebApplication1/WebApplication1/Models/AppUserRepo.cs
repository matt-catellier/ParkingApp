using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class AppUserRepo
    {

        public IEnumerable<AppUser> GetAll()
        {
            AppDBEntities db = new AppDBEntities();
            return db.AppUsers;           
        }

        public AppUser GetAccount(int userID)
        {
            AppUser account = GetAll()
                                .Where(a => a.userID == userID).FirstOrDefault();

            return account;
        }

        public AppUser GetUser(string userName)
        {
            AppUser account = GetAll()
                                .Where(a => a.userName == userName).FirstOrDefault();

            return account;
        }

        // this will get a new user object created from the page
        public void AddAccount(AppUser newUser)
        {
            AppDBEntities db = new AppDBEntities();

            db.AppUsers.Add(newUser);
            db.SaveChanges();
        }

        public AppUser UpdateAccount(int userID, AppUser updatedAccount)
        {
            AppDBEntities db = new AppDBEntities();

            AppUser account = db.AppUsers.Where(a => a.userID == userID).FirstOrDefault();

            account.userName = updatedAccount.userName;
            account.passWord = updatedAccount.passWord;
            account.firstName = updatedAccount.firstName;
            account.lastName = updatedAccount.lastName;
            account.phoneNumber = updatedAccount.phoneNumber;
            account.birthDate = updatedAccount.birthDate;
            account.emailAddress = updatedAccount.emailAddress;
            account.paymentMethod = updatedAccount.paymentMethod;

            db.SaveChanges();
            return account;

        }

        public void DeleteAccount(int userID)
        {
            AppDBEntities db = new AppDBEntities();

            AppUser account = db.AppUsers.Where(a => a.userID == userID).FirstOrDefault();

            db.AppUsers.Remove(account);
            db.SaveChanges();

        }
    }
}