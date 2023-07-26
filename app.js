const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/" , function(req , res){
    res.sendFile(__dirname + "/index.html");
})


app.post("/" , function(req , res){
    const query = req.body.cityname;
    const apikey = "5dec43bd7ac280661f3f1fba99ba6520";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=" + unit;


    https.get(url , function(response){
        response.on("data" , function(data){
            const weatherdata = JSON.parse(data);
            const temp = weatherdata.main.temp;
            const weatherdes = weatherdata.weather[0].description;
            const icon = weatherdata.weather[0].icon;
            const imgurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1>The Temperature in " + query + " is " + temp + " Degree Celsius.</h1>");
            res.write("<p>The weather of " + query + " is " + weatherdes + "</p>");
            res.write("<img src=" + imgurl + ">");
            res.send();
        })
    });


})

app.listen(3000 , function(){
    console.log("server is running on port 3000");
})


