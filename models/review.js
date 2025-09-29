const mongoose=require("mongoose");
const { type } = require("../schema");
const schema=mongoose.Schema;

//  Schema
const ReviewSchema=new schema({
    comment:String,
    rating:{
        type:String,
        min:1,
        max:5,
    },
    createdAt:{
type:Date,
default:Date.now(),
    },
   author:{
    type:schema.Types.ObjectId,
    ref:"user"
   }
})



module.exports=mongoose.model("Review",ReviewSchema);