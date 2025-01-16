const express = require('express');

const port = 9000;

const app = express();

app.set('view engine','ejs');

const db = require('./config/database');

const UserModel = require('./models/UserModel');

app.use(express.urlencoded());

app.get('/',(req,res)=>{
    return res.render('form');
})

app.post('/adduser',(req,res)=>{
    const {name,email,password} = req.body;

    UserModel.create({
        username : name,
        useremail : email,
        userpassword : password
    }).then((record)=>{
        console.log("user create");
        return res.redirect('/');
    }).catch((err)=>{
        console.log(err);
        return false
    })
    
})


app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log(`server is start on port :- ${port}`);
    
})