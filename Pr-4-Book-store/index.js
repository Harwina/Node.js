const express = require('express');
const mongoose = require('mongoose');

const port = 9020;
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

const db = require('./config/database');
const bookstoreModel = require('./models/bookstoreModel');

// Routes
app.get('/', async (req, res) => {
    const books = await bookstoreModel.find({});
    return res.render('table', { books });
});

app.get('/add', (req, res) => {
    return res.render('form');
});

app.post('/adduser', async (req, res) => {
    const { name, price, page, author } = req.body;

    try {
        await bookstoreModel.create({
            BookName: name,
            Price: price,
            BookPages: page,
            BookAuthor: author
        });
        console.log("Book added successfully");
        return res.redirect('/');
    } catch (err) {
        console.log(err);
        return res.send("Error adding book");
    }
});

app.get('/edit/:id', async (req, res) => {
    const book = await bookstoreModel.findById(req.params.id);
    return res.render('edit', { book });
});

app.post('/edit/:id', async (req, res) => {
    const { name, price, page, author } = req.body;

    try {
        await bookstoreModel.findByIdAndUpdate(req.params.id, {
            BookName: name,
            Price: price,
            BookPages: page,
            BookAuthor: author
        });
        console.log("Book updated successfully");
        return res.redirect('/');
    } catch (err) {
        console.log(err);
        return res.send("Error updating book");
    }
});

app.get('/delete/:id', async (req, res) => {
    try {
        await bookstoreModel.findByIdAndDelete(req.params.id);
        console.log("Book deleted successfully");
        return res.redirect('/');
    } catch (err) {
        console.log(err);
        return res.send("Error deleting book");
    }
});

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`Server is running on port ${port}`);
});
