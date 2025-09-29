const dotenv = require("dotenv");

// .env file load karna
dotenv.config();
console.log(process.env.API_KEY);

//  require express
const express = require("express");
const app = express();

// reqiure folder of listing

//  require mongoose
const mongoose = require("mongoose");

//  require methodoverride
const methodOverride = require("method-override");
//  require path
const path = require("path");
//  reqiure mate
const ejsMate = require("ejs-mate");
app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));
//  creating connection with mongoose

//  static folder like public  --> style.css javascript
app.use(express.static(path.join(__dirname, "public")));

//  require the file  folder router=> file->listing
const listingRouter = require("./router/listing.js");

//  require the file of reviews
const reviewsRouter = require("./router/reviews.js");

//  require the file  folder router=> file->user
const SignLoginRouter=require("./router/user.js")
const { date } = require("joi");
//  require espress session
const session=require("express-session");
const mongostore=require("connect-mongo");

//  require the connect-flash
const flash=require("connect-flash");

//  require passport
const passport=require("passport")
// require localStrategy
const LocalStrategy=require("passport-local");
//  require passportlocalmongoose;
const passportlocalmongoose=require("passport-local-mongoose");

//  require model of user
const user=require("./models/user.js");

let DBURL=process.env.ALTASURL;
const store=mongostore.create({
  mongoUrl:DBURL,
  crypto:{
    secret:process.env.SECRET,
  }
  ,
  touchAfter:24*3600,
})

store.on("error",()=>{
console.log("ERROR IN MONGOSESSION ".error)
});
//  session middleware
const sessionoption={
  store,
  secret:process.env.SECRET,
  resave:false,
  saveUninitialized:true,
  cookie:{
    expire:Date.now()+7*21*60*60*1000,
    maxAge:7*21*60*60*1000,
  }
};

app.use(session(sessionoption));
app.use(flash());



//  middleware passport initialize
app.use(passport.initialize());
app.use(passport.session())
passport.use(new LocalStrategy(user.authenticate()))
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

//  flash ka middleware 
app.use((req,res,next)=>{
  res.locals.success=req.flash("success"); 
  res.locals.error=req.flash("error");
 res.locals.sessionuser=req.user;
 
  next()
})


// require middlwraee of isauthenticated 



// let mongo_url = "mongodb://127.0.0.1:27017/wanderlust";


console.log("data connection link google ",DBURL)
main()
  .then((res) => {
    console.log("succes fully run mongoose");
  })
  .catch((err) => {
    console.log(err);
  });

async function main(params) {
  mongoose.connect(DBURL);
}

//  define port
let port = process.env.PORT;

app.get("/", (req, res) => {
  res.redirect("/listing");
});

// /listing
// app.get("/listing", async (req, res) => {
//   let data1 = new listing({
//     title: "my new villa",
//     description: "by the beatch",
//     price: 24000,
//     location: "galunto,goa",
//     country:"india",
//   });
//   await data1.save().then((result)=>{
//     console.log(result);
//   });

//   console.log("sample was save");
//   res.send("data uploaded");
// });



// //   demo user password topic
// app.get("/demo", async(req,res)=>{
//   const fakeuser=new user({
//     gmail:"mohdaslam@gmail.com",
//     username:"khankhan"
//   })

//   const registerdb=await user.register(fakeuser,"mycode")
//   console.log(registerdb);
//   res.send(registerdb)
// })






// first route  listen

// listing index route

// router file seperator
app.use("/listing", listingRouter);
app.use("/listing/:id/reviews",reviewsRouter);
app.use("",SignLoginRouter);


// app.all("/{*any}", (req, res, next) => {
//   next(new ExpressError(401, "page not get1"));
// });

app.use((err, req, res, next) => {
  // let ststus=401; let message="page not found 1";
  let { status = 405, message = "page not found" } = err;
  console.log(err);

  res.status(status).render("error.ejs", { message });
});

app.listen(port, (req, res) => {
  console.log("run");
});
