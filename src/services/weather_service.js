class weather_service{
    constructor(parisWeather) {
        this.parisWeather = parisWeather;
    }
  weatherReport(){
    let today,tomorrow;
  var today_report={};
  var tmrw_report={};
  let month=new Date().getMonth();
  month=month+1;
  today=new Date().getDate() + "-" + month +"-"+ new Date().getFullYear();
    let tmrw_date=new Date(new Date().getTime() + (24 * 60 * 60 * 1000));
    let tmrw_month=tmrw_date.getMonth();
    tmrw_month=tmrw_month+1;
    tomorrow=tmrw_date.getDate() +"-"+ tmrw_month +"-"+ tmrw_date.getFullYear();
  this.parisWeather.list.forEach(element => {
        let wthr_month=new Date(element.dt_txt).getMonth();
        wthr_month=wthr_month+1;
        let dat_format=new Date(element.dt_txt).getDate() + "-" + wthr_month +"-"+ new Date().getFullYear();
        let hours=new Date(element.dt_txt).getHours()
        if(dat_format==today){
          today_report[hours + " Hours"]=element.weather[0].main +" "+element.wind.deg +" degrees";
        }else if(dat_format==tomorrow){
          tmrw_report[hours + " Hours"]=element.weather[0].main+" "+element.wind.deg +" degrees";;
        }
      });
      let rslt={};
      rslt.status="200";
      rslt.msg="Today and Tomorrow's Weather Report in Paris with Time"
      rslt.report=[{"date":today,status:today_report},{"date":tomorrow,status:tmrw_report}];
        return rslt;
    }
}
module.exports=weather_service;