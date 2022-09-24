const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const anime_name = req.body.AnimeName;
  const fact_id = Math.floor(Math.random() * 8) + 1;
  const url = "https://anime-facts-rest-api.herokuapp.com/api/v1/" + anime_name + "/" + fact_id + "";
  https.get(url, function (response) {
    console.log(response.statuscode);
    response.on("data", function (data) {
      const animeData = JSON.parse(data);
      res.setHeader("Content-Type", "text/html");
      res.write("<center>" + "<h1>" + fact_id + "</h1>"+"</center>");
      res.write("<center>"+"<h1>" + animeData.data.fact + "</h1>"+"</center>");
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000.");
});
