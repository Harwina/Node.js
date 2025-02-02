const express = require('express');
const router = express.Router();
const multer = require('multer');
const { viewMovies, addMoviePage, addMovie, favoriteMovie, deleteMovie, } = require('../controllers/moviecontroller');

// Multer Configuration for File Upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Routes
router.get('/', viewMovies);
router.get('/add', addMoviePage);
router.post('/add', upload.single('poster'), addMovie);
router.get('/favorite/:id', favoriteMovie);
router.get('/delete/:id', deleteMovie);


module.exports = router;
