const express = require("express");
// const bodyParser = require("body-parser");
const app = express();
const port = 3000;

// Use body-parser middleware to handle form data
app.use(express.urlencoded());

// Set EJS as the template/view engine
app.set("view engine", "ejs");

// Array to store user records
let record = [];

// POST route to add user
app.post("/adduser", (req, res) => {
  const { username, userphone } = req.body; // Extract form data
  let obj = { name: username, phone: userphone }; // Create an object
  record.push(obj); // Push the object into the array
  return res.redirect("/"); // Redirect back to the table
});

// GET route to render the table
app.get("/", (req, res) => {
  return res.render("table", { record }); // Render the EJS table template
});

// GET route to render the form
app.get("/form", (req, res) => {
  return res.render("form"); // Render the EJS form template
});

// Start the server
app.listen(port, (err) => {
  if (err) {
    console.log("Error starting the server:", err);
    return;
  }
  console.log(`Server started at http://localhost:${port}`);
});
