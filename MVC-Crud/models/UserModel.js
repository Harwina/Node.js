const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    gender: { type: String },
    hobby: { type: [String] },
    city: { type: String },
    image: { type: String }
});

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;
