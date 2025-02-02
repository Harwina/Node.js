const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: String,
    genre: String,
    description: String,
    releaseDate: Date,
    poster: String,
    isFavorite: { type: Boolean, default: false }
});

module.exports = mongoose.model('Movie', MovieSchema);
