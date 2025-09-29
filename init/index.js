//  require mongoose
const mongoose = require("mongoose");
const listing = require("../models/listing");
const initdata=require("./data");

//  creating connection with mongoose
let mongo_url = "mongodb://127.0.0.1:27017/wanderlust";
main()
  .then((res) => {
    console.log("succes fully run mongoose");
  })
  .catch((err) => {
    console.log(err);
  });

async function main(params) {
  mongoose.connect(mongo_url);
}

const indb= async()=> {
    await listing.deleteMany({});
   const dat=initdata.data.map((obj)=>({...obj,owner:'689c904538cc88d298fa5624'}))
    console.log(dat)
    await listing.insertMany(dat);
    console.log(" data was save ");

}

indb();

