const  express=require("express")
 const router=express.Router({mergeParams:true});



 //   reqiure error handing Wrapasync function
 
 const Wrapasync=require("../utility/WrapAsync.js");
 const ExpressError=require("../utility/customeeror.js");

 const {reviewSchema}= require("../schema");
//   require for review  model 
const reviews=require("../models/review.js");
const review = require("../models/review.js");

//  listing schema 
const listing = require("../models/listing");

//  require the  flash
const flash=require("connect-flash");
const { isAuthent, reviewauthor } = require("../middleware.js");

const controllerReviews=require("../controller/reviews.js");

//   middleware function  for validation  review  form in server side like data base 
const validated1=(req,res,next)=>{
  let {error}=reviewSchema.validate(req.body);
  if(error){
    throw new ExpressError(400,error);
  }
  else{
    next();
  }
}




//  review add route

router.post("/" ,isAuthent,validated1,Wrapasync( controllerReviews.addreview))


//  review delete route

router.delete("/:reviewId",controllerReviews.destroyReview)







module.exports=router;