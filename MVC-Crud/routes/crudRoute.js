const express = require("express");
const routes = express.Router();
const multer = require("multer");
const path=require("path")
const { viewPage, addPage, addUser, deleteUser, updateUser, editPage } = require("../controllers/crudcontroller");




// Multer Configuration for File Upload
const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        const uniqueId =Math.floor(Math.random()*1000)
        cb(null, `${file.fieldname}-${uniqueId}`);
    }
});

const upload = multer({ storage: storage });

// Routes
routes.get("/", viewPage);
routes.get("/add", addPage);
routes.get("/delete/:id",deleteUser);
routes.get("/edit/:id", editPage);
routes.post("/update/:id", upload.single("image"), updateUser);  // ✅ Correct usage
routes.post("/addUser", upload.single("image"), addUser);  // ✅ Corrected form submission handling


module.exports = routes;
