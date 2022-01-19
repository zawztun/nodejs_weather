// const express = require('express');
// const bodyParser = require('body-parser');
 
// const app = express();
// //install body-parser
//  app.use(bodyParser.urlencoded({ extended: true }));
// app.get("/", function (req, res) {
//     res.sendFile(__dirname + "/index.html")
// });
// app.post("/", function (req, res) {
//     //req.body.name// form html name
//     // Number
//     const num1 = Number(req.body.num1);
//     const num2 = Number(req.body.num2);
//     const result = num1 + num2;
//     console.log(result);
//     res.send(`<h1>Your Total are ${result}</h1>`)
// });

// app.listen(3000)



const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();
//use body-parser
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
});
app.post("/", function (req, res) {
// res.send(`<h1>Hello World</h1>` no 2 res allowed )
    const query = req.body.cityName;
    const apiId = "e764fb90a15e61b9d734f869dfb476d9";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiId}&units=metric`;

    https.get(url, function (resp) {
        console.log(resp.statusCode);
        resp.on("data", function (data) {
            //server response hexideceman 
            const weatherData = (JSON.parse(data));
            const temp = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;
            const imgUrl = `http://openweathermap.org/img/wn/${icon}@4x.png`;
            const desc = weatherData.weather[0].description; 
           
            res.write(`<h1>The Weather of ${query} is ${desc}</h1>`);
            res.write(`<h1>The Weather of ${query} is ${temp}</h1>`);
            res.write(`<h1><img src = ${imgUrl} alt = " "</h1>`);
  
         })
    })   

})

app.listen(3000, ()=> (console.log("server is running....")))


