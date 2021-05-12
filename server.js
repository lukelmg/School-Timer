
var app = require('express')();
const fs = require('fs');

const { exec } = require('child_process');

(function emit() {
  exec('node index.js', (err, stdout, stderr) => {
  if (err) {
    //some err occurred
    console.error(err)
  } else {
   // the *entire* stdout and stderr (buffered)
   console.log(`${stdout}`);
  }
  });
  setTimeout(emit, 60*60*1000);
})();
