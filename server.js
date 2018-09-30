const express=require('express');
const request = require('request');
const util = require('util')
const weather=require('./src/controllers/weather_ctrl');
const weatherConsole=require('./src/services/weather_service');
const configParis=require('./config');
const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  return res.status(200).send('Hello World');
})


request(configParis.weather.url_paris+configParis.weather.key, function (error, response, body) {
  if(body){
  let reports=JSON.parse(body);
if(reports && reports.cod=="200"){
  let report_logic=new weatherConsole(reports);
  console.log(util.inspect(report_logic.weatherReport(), {showHidden: false, depth: null}))
}else{
console.log("Unexpected error occured while getting Weather Report");
}
  }else{
    console.log("Api is not returning any data");
  }
});



app.get('/api/parisweather', weather.getparisweather);
app.listen(3000)
console.log('app running on port ', 3000);
module.exports=app;