const express = require('express')
const app = express()
const port=3000

const path = require('path')
app.use(express.static('public'))
app.use(express.static(path.join(__dirname, 'public')))

const ejsMate = require('ejs-mate'); // Add this line to import ejsMate
// use ejs-locals for all ejs templates:
app.engine('ejs', ejsMate);


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

// mongodb connection


const mongoose = require('mongoose');


main().then((res) => {
  console.log("Connected to DB");
})
.catch(err => console.log(err));

app.use(express.urlencoded( {extended: true}));
app.use(express.json());

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/crud');
 // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const Listing=require("./model/listing.js");

var methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.get('/list', async (req, res) => {
  const allListing=await Listing.find({});

    res.render("./listing/index.ejs",{allListing});
  })
  
  app.get("/new", (req,res) => {
    res.render("./listing/new.ejs");
  })

  app.post("/listing", async (req,res) => {
       // Create a new Listing instance
  const newListing=new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/list");


 
  })

  app.get("/listing/:id/delete", async (req,res) => {
    let {id} =req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/list");
  })

  app.get("/listing/:id/edit", async (req,res) => {
    let {id} =req.params;
    const result=await Listing.findById(id);
    res.render("./listing/edit.ejs", {result});




  })
  
  app.put("/listing/:id", async (req,res) => {
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect("/list")


  })
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })