const listing=require("../models/listing")
module.exports.inddex=async (req, res) => {
  let alllist = await listing.find({});
  // console.log(alllist);
  res.render("listing/index.ejs", { alllist });
};

module.exports.add1=(req, res) => {
  // check karna ki ham login hai ya nhi 
  // if(!req.isAuthenticated()){
  //     req.flash("error","pehle login karo")
  //     return  res.redirect("/login")
  //   }
  res.render("listing/new.ejs");
};

module.exports.add2=async (req, res, next) => {
    
  let url=req.file.path;
  let filename=req.file.filename;
  console.log(url,"..",filename);
    let { title, description,price, location, country } = req.body;
    console.log(req.body);
    console.log(title, description, price, location, country,);
    const user1 = new listing({
      title: title,
      description: description,
      price: price,
      location: location,
      country: country,
      image:{url,filename},
    });
    user1.owner=req.user._id;
   
    
   
    //await listing.insertOne()
    await user1.save();
    console.log(user1);
    req.flash("success","new listing created");
    res.redirect("/listing");
  };

  module.exports.listinginfo=async (req, res) => {
  let { id } = req.params;
  const showall = await listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
  console.log("find by id:", showall);
  if(!showall){
    req.flash("error","listing not exist ");
    res.redirect("/listing");
  }
  else{
    res.render("listing/show.ejs", { showall });
  }
};


module.exports.update1=async (req, res) => {
  let { id } = req.params;
  let fd = await listing.findById(id);
  console.log("find by id:", fd);

  //  original image variable
 let  original=fd.image.url;
 let originalimage=original.replace("upload","upload/ar_1.0,c_fill,h_250/bo_5px_solid_lightblue");
 console.log(original);


  if(!fd){
    req.flash("error","edit listing is not exist");
    res.redirect("/listing")
  }
  else{
    res.render("listing/edit.ejs", { fd ,originalimage});
  }
};


module.exports.update2=async (req, res) => {
  let { id } = req.params;


  let { title, description,  price, location, country } = req.body;
  // command code jo ki authrized ka kam kar rha hai sirf wahi code ko edit kar sakta hai jo login hai jike pass sessionuser hai
//   const authorized = await listing.findById(id);
//   console.log(authorized);
//   if(!authorized.owner._id.equals(res.locals.sessionuser._id)){

// req.flash("error","you have no permission to edit ");
//  return res.redirect(`/listing/${id}`);

//   }
  console.log(title,description);
  let fd = await listing.findByIdAndUpdate(id, {
    title: title,
    description: description,
    price: price,
    location: location,
    country: country,
    
   
  });

  console.log("jjjjjjhkjhjkhkjh",fd);
   if(typeof req.file!="undefined"){
    let url=req.file.path;
  let filename=req.file.filename
  fd.image={url,filename}
  }
  
 await fd.save();
  req.flash("success","edit is successfully done")
  res.redirect(`/listing/${id}`);
};

module.exports.destroy=async (req, res) => {
  let { id } = req.params;
  let del = await listing.findByIdAndDelete(id);
  req.flash("success","Deleteed  the list")
  res.redirect("/listing");
};

