//jshint esversion:6

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});


app.post("/", function(req, res){
    const query = req.body.cityName;
    const appKey = "11646daa38a5739bc590a80e72323dcb";
    const unit = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appKey + "&units=" + unit;

    https.get(url, function(response){
        //console.log(response);
        //console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);

            const temp = weatherData.main.temp;
            console.log(temp);

            const feelsLike = weatherData.main.feels_like;
            console.log(feelsLike);

            const desc = weatherData.weather[0].description;
            console.log(desc);

            const icon = weatherData.weather[0].icon;
            const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"; 

            res.write("<h1>The temperature in " + query + " is currently " + temp + " degrees Celcius</h1>");
            res.write("Feels like " + feelsLike + " degrees Celcius");
            res.write("<h2> The weather is currently " + desc +  ".</h2>");
            res.write("<img src = " + imageURL + " alt='weather icon' height='100'>");

        });
    });
});


app.listen(process.env.PORT || 3000, function(){
    console.log("Server started on port 3000");
});
