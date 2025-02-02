const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/yourDBName")
    .then(() => {
        console.log("Database Connected Successfully");
    })
    .catch((err) => {
        console.log("Database Connection Failed:", err);
    });

module.exports = mongoose;
