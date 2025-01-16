const mongoose = require('mongoose');

const u  = mongoose.Schema({
    username:{
        type : String,
        required : true
    },
    useremail:{
        type : String,
        required : true
    },
    userpassword:{
        type : String,
        required : true
    }
})
const user = mongoose.model("user",u)
module.exports = user;
