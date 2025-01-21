const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    BookName: {
        type: String,
        required: true
    },
    Price: {
        type: String,
        required: true
    },
    BookPages: {
        type: String,
        required: true
    },
    BookAuthor: {
        type: String,
        required: true
    }
});

const Bookstore = mongoose.model('Bookstore', bookSchema);
module.exports = Bookstore;
