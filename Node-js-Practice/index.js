const fs = require("fs");
const http = require("http");

const server = http.createServer((req, res) => {
  let fileName = "";

  switch (req.url) {
    case "/":
      fileName = "./home.html";
      break;
    case "/about":
      fileName = "./about.html";
      break;
    case "/contact":
      fileName = "./contact.html";
      break;
    default:
      fileName = "./404.html"; 
  }


  fs.readFile(fileName, (err, pageContent) => {
    if (err) {
      console.log("file not found");
      
    } else {
     
      res.end(pageContent);
    }
  });
});

const port = 8000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
