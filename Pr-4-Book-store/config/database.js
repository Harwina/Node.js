const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/bookstore', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected successfully');
});

module.exports = db;
