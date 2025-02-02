const express = require("express");
const port = 8050;

const app = express();

app.set("view engine" , "ejs"); 

const db = require('./config/database');

const UserModel = require('./models/UserModel');
const path = require('path')

app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use(express.urlencoded({ extended: true }));  // ✅ Fixed the issue

app.use("/", require("./routes/indexRoute"));

app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log(`server is start on port :- ${port}`);
    
})