const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("website"));

let projectData = {};

app.post("/add", function (req, res) {
  projectData = req.body

});

app.get("/db", function (req, res) {
  res.send(projectData);
});

const port = 3000;
const server = app.listen(port, () => {
  console.log(`server running on port: ${port}`);
});
