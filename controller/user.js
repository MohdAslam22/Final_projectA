const user=require("../models/user");
module.exports.signup1=(req, res) => {
  
  res.render("LoginPage/signUp");
};

module.exports.signup2=async (req, res) => {
    try {
      let { gmail, username, password } = req.body;
      const user1 = new user({
        gmail: gmail,
        username: username,
      });

      
      const registeruser = await user.register(user1, password);
      req.login(registeruser,(err)=>{
        if(err){
          return next(err);
        }
        req.flash("success", "welcome to wanderlust");
      res.redirect("/listing");
      })
      
    } catch (err) {
      req.flash("error", `username ${req.body.username} is already registered`);
      res.redirect("/signUp");
    }
  };

  module.exports.login1= (req, res) => {
  res.render("LoginPage/Login");
};

module.exports.login2= async(req, res) => {
    console.log(req.user)
    req.flash("success",
      "you are successfully login")
     
      let redirectUrl=res.locals.redirectUrl||"/listing";
    // res.redirect("/listing"); // success hone pe
     res.redirect(redirectUrl); // success hone pe
  }

  module.exports.logout=(req,res,next)=>{
  req.logOut((err)=>{
if(err){
  return next(err);
}
req.flash("success","you are logout succesful")
res.redirect("/listing");
  })
  
};

module.exports.forget1 =(req,res)=>{
  res.render("LoginPage/forget.ejs")
};

module.exports.forget2= async(req,res,next)=>{
  try {let {username,password}=req.body;
  console.log(username);
  
  let forget= await  user.findOne({username:username});
  if(!forget){
    req.flash("error","user not found");
    return res.redirect("LoginPage/forget.ejs")
  }
  //  password is set
   await forget.setPassword(password);
  await forget.save();
  
  req.flash("success","password reset successfully");
  res.redirect(`/login`)
    
  } catch (error) {
    next(err);
  }
};