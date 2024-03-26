const mongoose = require('mongoose');
const initData=require("./data.js");
const Listing = require("../model/listing.js");


main()
.then((res) => {
    console.log("Connected to db");
})

.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/crud');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const initDB = async () => {
    try {
        await Listing.deleteMany({});
        await Listing.insertMany(initData.data);

        console.log("Data was initialized");
    } catch (error) {
        console.error("Initialization error:", error);
    }
}

initDB();