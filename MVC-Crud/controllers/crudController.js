const UserModel = require("../models/UserModel")

const addPage = (req,res) => {
    return res.render('crud/add')
}

const viewPage = async (req, res) => {
    try {
        const users = await UserModel.find({});
        res.render("crud/view", { 
            record:users 
        });
    } catch (err) {
        console.log(err);
        return false
    }
};
const fs = require("fs");  // Import File System module
const path = require("path");

const deleteUser = async (req, res) => {
    try {
        // Find user by ID
        const user = await UserModel.findById(req.params.id);

        // If user has an image, delete the file
        if (user && user.image) {
            const imagePath = path.join(__dirname, "..", user.image); // Get full path
            if (fs.existsSync(imagePath)) {  // Check if file exists
                fs.unlinkSync(imagePath);  // Delete file
            }
        }

        // Delete user from the database
        await UserModel.findByIdAndDelete(req.params.id);

        console.log("User and image deleted successfully");
        res.redirect("/crud");
    } catch (err) {
        console.log("Error deleting user:", err);
    }
};


const addUser= async(req,res)=>{
    try {
        const { name, email, password, gender, hobby, city } = req.body;
        await UserModel.create({
            name:name,
            email:email,
            password:password,
            gender:gender,
            hobby:hobby,
            city:city,
            image: req.file ? `/uploads/${req.file.filename}` : null

        })
    
       console.log("data add")
        return res.redirect("/crud");
    } catch (err) {
        console.log(err);
        return false
    }
}
// Show Edit Page
const editPage = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        if (!user) return res.redirect("/crud");

        res.render("crud/edit", { user });
    } catch (err) {
        console.log(err);
    }
};

// Update User
const updateUser = async (req, res) => {
    try {
        const { name, email, password, gender, hobby, city } = req.body;
        const user = await UserModel.findById(req.params.id);

        if (!user) {
            console.log("User not found");
            return res.redirect("/crud");
        }

        let imagePath = user.image;  // Keep old image if no new image uploaded

        // If new image is uploaded, delete the old one
        if (req.file) {
            if (user.image) {
                const oldImagePath = path.join(__dirname, "..", user.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);  // ✅ Deletes old image
                }
            }
            imagePath = `/uploads/${req.file.filename}`;  // ✅ Save new image path
        }

        // Update user details
        await UserModel.findByIdAndUpdate(req.params.id, {
            name,
            email,
            password,
            gender,
            hobby,
            city,
            image: imagePath
        });

        console.log("User updated successfully");
        return res.redirect("/crud");
    } catch (err) {
        console.log("Error updating user:", err);
    }
};

module.exports = {
    viewPage,addPage,addUser,deleteUser, editPage, updateUser
}