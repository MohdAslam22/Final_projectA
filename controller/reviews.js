const listing=require("../models/listing");
const reviews=require("../models/review");
module.exports.addreview=async(req,res)=>{
  let {id}= req.params;
  console.log(id);
   const list=  await listing.findById(id)
   let newreview= new reviews(req.body.review);


console.log(newreview);
list.reviews.push(newreview);
newreview.author=req.user._id;
console.log("t ",newreview)

await newreview.save();
 const reviewsata=await list.save();


//   const list= await listing.findById(id)
// let{rating,comment}=req.body;


  
//    const pus1=new review({
//     rating:rating,
//     comment:comment
   
//    })

//    await pus1.save();

//    list.reviews.push(pus1);

//    await list.save();
// console.log(list);
req.flash("success","review added")
res.redirect(`/listing/${id}`);
  
};

module.exports.destroyReview=async(req,res)=>{

  let{id,reviewId}=req.params;
  await listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});

  await reviews.findByIdAndDelete(reviewId);
req.flash("success","review delete")
res.redirect(`/listing/${id}`);
  // res.sen("this is working");
};