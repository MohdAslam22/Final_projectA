const express = require("express");
const router1 = express.Router();

const listing = require("../models/listing");
//   reqiure error handing Wrapasync function

const Wrapasync = require("../utility/WrapAsync.js");
const ExpressError = require("../utility/customeeror.js");

// require validation schema handing error customerhandling
const listingSchema = require("../schema");

//  require the connect-flash
const flash = require("connect-flash");

//   middleware function  for validation  new add list form in client side

// require middlwraee of isauthenticated
const { isAuthent, athorized } = require("../middleware.js");

const controllerListing = require("../controller/listing.js");

//  require the user schema
const user = require("../models/user.js");
//  file upload ke reqiur karna pata hai multer
const multer  = require('multer')
const {storage}=require("../cloudconfi.js");

const upload = multer({storage})

const validated = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    throw new ExpressError(403, error);
  } else {
    next();
  }
};

router1.route("/")
// adding part 1
.get(validated, controllerListing.inddex)
// adding part 2
.post(validated,upload.single("image"),Wrapasync(controllerListing.add2));

router1.post("/new/ToFind", async(req,res,next)=>{
  try {
    let{search}=req.body;
  console.log(search);
  let  alllist =await listing.find({title:`${search}`});
 console.log(alllist)
 if(alllist.length==0){
  req.flash("error","no list match from data base")
   return res.redirect("/listing");
 }

 req.flash("success","some data match");

 res.render("listing/index.ejs",{alllist});
    
  } catch (error) {
    next(error)
  }
  



})
//  add new data part 1
router1.get("/new", validated, isAuthent, controllerListing.add1);



router1.route("/:id")
.get(validated, controllerListing.listinginfo)
.put( upload.single("image"),validated, athorized, controllerListing.update2)
.delete(isAuthent, controllerListing.destroy)
//  show data



// //  update part first edit route
router1.get("/:id/edit", validated, isAuthent, controllerListing.update1);



module.exports = router1;
