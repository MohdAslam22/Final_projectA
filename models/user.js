const mongoose=require("mongoose");
const schema=mongoose.Schema;
const passportlocalmongoose=require("passport-local-mongoose");


//  creating schema
const userschema= new schema({
    gmail:{
        type:String,
        required:true
    },
})


userschema.plugin(passportlocalmongoose);
module.exports=mongoose.model("user",userschema);