const listing=require("./models/listing");
const reviews = require("./models/review");

 module.exports.isAuthent=(req,res,next) =>{
    if(!req.isAuthenticated()){
       
        req.session.redirectUrl=req.originalUrl;
         console.log("orininalurl",req.originalUrl)
         console.log("path",req.path)
        req.flash("error","login karo pehle ")
         return  res.redirect("/login");
        


    }
    next();
}

module.exports.saveredirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
        console.log("redirecturl",res.locals.redirectUrl);
       
    }
    next();
}

 
//  authorized jike pass access hai wahi edit or kar sakta hai
module.exports.athorized= async(req,res,next)=>{
  let { id } = req.params;
      const authorized = await listing.findById(id);
  console.log(authorized);
  if(!authorized.owner._id.equals(res.locals.sessionuser._id)){

req.flash("error","you have no permission to edit ");
 return res.redirect(`/listing/${id}`);

  }
  next();
}


