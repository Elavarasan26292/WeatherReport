var chaiHttp = require('chai-http');
var chai = require('chai');
var app = require('../server.js');
chai.use(chaiHttp);
const expect = chai.expect;


describe('External Api Check', () => {
    var config;
    var datas;
    before(()=> {
        config= require('../config.js');
              });     
    after(()=>{});
      it('Checking the API response', () => {
          let url=config.weather.url_paris+config.weather.key;
        return chai.request(url).get('')
          .then(res => {
              datas=JSON.parse(JSON.stringify(res.body));
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.be.an('object');
          })
      })

      it("Date check",()=>{
        var is_date = function(input) {
          if ( Object.prototype.toString.call(input) === "[object Date]" )
          return true;
          return false;
      };
        function datecheck(value){
          let dt_chk=is_date(new Date(value));
            expect(dt_chk).to.be.true;
      }
      for(let i=0;i<datas.list.length;i++){
        datecheck(datas.list[i].dt_txt);
      }
      });
    })


describe('Weather Report GET API Request', () => {
var app;
before(()=> {
        app= require('../server.js');
          });     
after(()=>{});
     
  it('Checking the API response', () => {
    return chai.request(app).get('/api/parisweather')
      .then(res => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        expect(res.body.report).to.be.an('array');
      })
  })

  it('Checking the API response', () => {
    return chai.request(app).get('/api/parisweather')
      .then(res => {
    expect(res.body.msg).contains('Paris');
  })
})
})