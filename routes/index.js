var express = require("express"); 
var router = express.Router();
const passport = require('passport')
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");

<<<<<<< HEAD
router.post('/addComplaints',(req,res)=>{
  console.log("on addComplaints")
  let data = req.body
  console.log(data,"data")
  adminHelpers.createComplaints(data).then(async (response) => {
    var complaits = true;
    console.log(response)
     let {user} = req.session ;
      let notifications = await notificationHelper.fetchAllNotifications(); 
      console.log(complaits)
      res.render("user/home", { notificationList: notifications,user,complaits });
=======
const bcrypt = require("bcrypt");
require('../Authentication/Passport-config')
>>>>>>> 76e25c70855dc7b966cc59bf0729cc5b74533167

router.use(passport.initialize());
router.use(passport.session());

let {
    userLogin,
    userHome,
    errors,
    ResolveError
} = require('../Controller/userController')


router.all("/*", function (req, res, next) {
  req.app.locals.layout = "layouts/layout";
  next();
});

router.get('/',userLogin)
router.get('/home',userHome)

router.post('/login', passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/",
  }))
router.post('/ResolveError',ResolveError)
  router.get('/errors',errors)
// router.post('/login',(req,res)=>{
//   console.log(req.body)
// })
  
module.exports = router;

