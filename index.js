const express = require('express');
const app = express();

// Make sure to put this directly after you define your app
// dont change if you want http -> https
// if you want https -> http change !req.secure to req.secure and https to http
app.set('trust proxy', true); // <- required
app.use((req, res, next) => {
  if(!req.secure) return res.redirect('https://' + req.get('host') + req.url);
  next();
});

app.use(express.static(__dirname));

var listener = app.listen(process.env.PORT, function () {
  console.log('Demo app listening on ' + listener.address().port);
});


const axios = require('axios');
const fs = require('fs');
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