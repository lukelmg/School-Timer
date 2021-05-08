var http = require('http');
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

var finalhandler = require('finalhandler');
var serveStatic = require('serve-static');

var serve = serveStatic("./");

var server = http.createServer(function(req, res) {
  var done = finalhandler(req, res);
  serve(req, res, done);
});

server.listen(8000);

var jsonString;

(function emit() {

  const url = 'http://207.172.232.166:8100/';

  axios.get(url)
    .then(response => {
      jsonString = response.data.slice(6);
      jsonString = jsonString.substring(0, jsonString.length - 7);
      console.log(jsonString);

      fs.writeFile('./cycle.json', jsonString, err => {
        if (err) {
          console.log(err);
        } 
      }); 
    })
    .catch(error => {
      console.log(error);
    })


  setTimeout(emit, 60000);
})();