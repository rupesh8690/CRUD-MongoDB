const mongoose=require("mongoose");
const staffSchema=new mongoose.Schema({
    name:String,
    address:String,
    phone:String,
});

//creating model
const Listing=mongoose.model("Listing",staffSchema);
module.exports = Listing;
 // exporting module to index.js
