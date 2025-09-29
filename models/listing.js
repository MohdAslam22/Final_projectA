// require mongoose
const mongoose=require("mongoose");
const schema=mongoose.Schema;
const reviews=require("./review.js");
const listingSchema = require("../schema");
const list=new schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
     image:{
        url:String,
        filename:String,
     },
    price:Number,
    location:String,
    country:{
        type:String,
        require:true
    },

   reviews:[
    {
        type:schema.Types.ObjectId,
        ref:"Review"
    },
   ],
   owner:{
    type:schema.Types.ObjectId,
        ref:"user"
   }
});


list.post("findOneAndDelete", async(listing)=>{
    if(listing){
await reviews.deleteMany({_id:{$in:listing.reviews}});
    }
})


const listing= mongoose.model("listing",list);



module.exports=listing;