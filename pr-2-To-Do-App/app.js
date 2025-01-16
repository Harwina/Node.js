const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 8000;

let todos = []; // Array to hold the list of tasks

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // To serve static files like CSS
app.set("view engine", "ejs");

// Routes

// Home Page - Display To-Do List
app.get("/", (req, res) => {
    res.render("todo", { todos });
});

// Add Task Form Page
app.get("/form", (req, res) => {
    res.render("form", { todo: null });
});

// Add Task Logic
app.post("/addtask", (req, res) => {
    const { title, description } = req.body;
    if (title && description) {
        const id = todos.length + 1;
        todos.push({ id, title, description, completed: false });
        res.redirect("/");
    } else {
        res.send("All fields are required!");
    }
});

// Mark Task as Completed
app.get("/complete/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find((t) => t.id === id);
    if (todo) {
        todo.completed = true;
    }
    res.redirect("/");
});

// Delete Task
app.get("/delete/:id", (req, res) => {
    const id = parseInt(req.params.id);
    todos = todos.filter((todo) => todo.id !== id);
    res.redirect("/");
});

// Edit Task Form Page
app.get("/edit/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find((t) => t.id === id);
    if (todo) {
        res.render("form", { todo });
    } else {
        res.send("Task not found!");
    }
});

// Update Task Logic
app.post("/edittask/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { title, description } = req.body;
    const index = todos.findIndex((t) => t.id === id);

    if (index !== -1) {
        todos[index].title = title;
        todos[index].description = description;
        res.redirect("/");
    } else {
        res.send("Task not found!");
    }
});

// Start Server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
