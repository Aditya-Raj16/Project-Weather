const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")
const app = express();
require('dotenv').config();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/" , function(req , res){
    res.sendFile(__dirname + "/index.html");
})


app.post("/" , function(req , res){
    const query = req.body.cityname;
    const apikey = process.env.API_KEY;
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=" + unit;


    https.get(url , function(response){
        response.on("data" , function(data){
            const weatherdata = JSON.parse(data);
            const temp = weatherdata.main.temp;
            const feelslike = weatherdata.main.feels_like;
            const maxtemp = weatherdata.main.temp_max;
            const mintemp = weatherdata.main.temp_min;
            const pressure = (weatherdata.main.pressure)/760;
            const humidity = weatherdata.main.humidity;
            const visibility = (weatherdata.visibility)/1000;
            const windspeed = weatherdata.wind.speed;
            const windegree = weatherdata.wind.deg;
            const sunrise = weatherdata.sys.sunrise;
            const sunset = weatherdata.sys.sunset;
            const weatherdes = weatherdata.weather[0].description;
            const icon = weatherdata.weather[0].icon;
            const imgurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            
            res.write("<h1>TEMPERATURES</h1>");
            res.write("<h3>The Temperature in " + query + " is " + temp + " &#176C.</h3>");
            res.write("<p>Feels Like " + feelslike + " &#176C, Maximum Temperature " + maxtemp + " &#176C, Minimum Temperature " + mintemp + " &#176C <p>");

            res.write("<h1>WEATHER</h1>");
            res.write("<h3>The weather of " + query + " is " + weatherdes + "</h3>");
            res.write("<img src=" + imgurl + ">");
            res.write("<p>Pressure " + pressure + " atm, Humidity " + humidity + "%, Visibility " + visibility + " km </p>");

            res.write("<h1>WIND</h1>");
            res.write("<p>Wind Speed " + windspeed + " Kmph, Wind Degree " + windegree + "&#176 </p>");

            res.write("<h1>SUN</h1>");
            res.write("<p>Sun Rise " + sunrise + " , Sun Set " + sunset + " </p>");

            res.send();
        })
    });

})

app.listen(3000 , function(){
    console.log("server is running on port 3000");
})


