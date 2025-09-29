const express = require("express");
const router1 = express.Router();
const user = require("../models/user");
const flash = require("connect-flash");
const WrapAsync = require("../utility/WrapAsync");
const passport = require("passport");
const { saveredirectUrl } = require("../middleware");
const controllerUser=require("../controller/user");
//  signu part 1
router1.get("/signUp",controllerUser.signup1 );

//  signu part 2
router1.post(
  "/signUp",
  WrapAsync(controllerUser.signup2)
);

router1.get("/login",controllerUser.login1);

router1.post(
  "/login",
  saveredirectUrl,
     passport.authenticate("local", {
      failureRedirect: "/login", // fail hone pe
      failureFlash: true, // flash message
    }),
  controllerUser.login2
);

router1.get("/logout",controllerUser.logout);
router1.get("/forget_password",controllerUser.forget1);
router1.post("/forget_password",controllerUser.forget2)

module.exports = router1;
