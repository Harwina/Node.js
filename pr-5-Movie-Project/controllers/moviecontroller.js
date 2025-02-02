const Movie = require('../models/Movie');
const fs = require('fs');
const path = require('path');

// View All Movies
exports.viewMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.render('movies/view', { movies });
    } catch (err) {
        res.status(500).send('Error fetching movies');
    }
};

// Render Add Movie Page
exports.addMoviePage = (req, res) => {
    res.render('movies/add');
};

// Add New Movie
exports.addMovie = async (req, res) => {
    try {
        const { title, genre, description, releaseDate } = req.body;
        const posterPath = req.file ? `/uploads/${req.file.filename}` : null;

        await Movie.create({ title, genre, description, releaseDate, poster: posterPath });

        res.redirect('/movies');
    } catch (err) {
        res.status(500).send('Error adding movie');
    }
};

// Mark Movie as Favorite
exports.favoriteMovie = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (movie) {
            movie.isFavorite = !movie.isFavorite;
            await movie.save();
        }
        res.redirect('/movies');
    } catch (err) {
        res.status(500).send('Error updating favorite status');
    }
};

// Delete Movie & Remove Poster
exports.deleteMovie = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (movie.poster) {
            fs.unlinkSync(path.join(__dirname, '../public', movie.poster));
        }
        await Movie.findByIdAndDelete(req.params.id);
        res.redirect('/movies');
    } catch (err) {
        res.status(500).send('Error deleting movie');
    }
};
