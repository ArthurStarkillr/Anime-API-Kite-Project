const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const https = require("https");
app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");
})

app.post("/",function(req,res){
  const url = "https://anime-facts-rest-api.herokuapp.com/api/v1/";
  https.get(url, function(response){
    console.log(response);
    response.on("data", function (data) {
     const animeData = JSON.parse(data);
     res.setHeader("Content-Type", "text/html");
     for (var i = 0; i < 13; i++) {
       res.write(
         "<h1> " + "<center>" +
           animeData.data[i].anime_id +
           ":" +
           animeData.data[i].anime_name +
           "<center>" +
           "</h1>"
       );
       res.write("<center><img src=" + animeData.data[i].anime_img + "width='500' height='500'><center>");
     }
     res.send();
   });
  });
});
app.listen(3000,function(){
  console.log("Server on 3000")
});
