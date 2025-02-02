const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
require('./config/database');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/movies', require('./routes/movieRoutes'));

const PORT = 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
