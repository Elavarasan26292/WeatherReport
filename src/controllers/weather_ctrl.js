var axios=require('axios');
var weatherlogic=require('../services/weather_service');
var config=require('../../config');
const weather = { 
  getparisweather(req, res) {
    const url=config.weather.url_paris + config.weather.key;
    axios.get(url).then(response => {
      let report_rslt= JSON.parse(JSON.stringify(response.data));
      if(report_rslt && report_rslt.cod=="200"){
        let report_logic=new weatherlogic(report_rslt);
        var result=report_logic.weatherReport();
        return res.status(200).send(result);
      }else{
        return res.status(200).send({code:"404",msg:"Invalid Api credentials"})
      }
  }).catch(error => {
    return res.status(200).send({code:"404",msg:"Unexpected Api Error"})
    });
  }
 }

module.exports= weather;