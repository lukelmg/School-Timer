/*

  ----------------------
  PHS cycle day detector
  ----------------------
  By: Luke Gutman 2020

  [dependencies: puppeteer, socket.io, and express]

*/

var mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

var app = require('express')();
var http = require('http').createServer(app);

const puppeteer = require('puppeteer');
const fs = require('fs');

app.get('/main', function(req, res) {

  var name = 'hello';

  res.render(__dirname + "/index.html", {name:name});

});

var finalDay;
var jsonString;
(async function test()  {
  // set up browser for puppeteer to look at phs website
  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
  const page = await browser.newPage();
  await page.goto('https://phs.parklandsd.org/');

  // get the month from the calendar html element on the site
  const MONTH = await page.evaluate(() => {
    let headingFromWeb = document.querySelectorAll(".fsMonth");
    const headingList = [...headingFromWeb];
    return headingList.map(h => h.innerHTML);
  });

  // get the day from the same calendar
  const DAY = await page.evaluate(() => {
    let headingFromWeb = document.querySelectorAll(".fsDay");
    const headingList = [...headingFromWeb];
    return headingList.map(h => h.innerHTML);
  });

    /* get the event from the calendar for the respective days.
    not all of the events include the cycle days so these
    will have to be sorted out later in the code. */

  const hsEvent = await page.evaluate(() => {
    let headingFromWeb = document.querySelectorAll(".fsCalendarEventLink");
    const headingList = [...headingFromWeb];
    return headingList.map(h => h.innerHTML);
  });

var combined = [];

  // clean up data by slicing, cutting, and alalyzing strings (not efficient but works)

  for (var i = 0; i < MONTH.length; i++) {
    if(hsEvent[i].indexOf("Day") !== -1 && endsWithNumber(hsEvent[i]) == true) {
      combined[i] = DAY[i] + MONTH[i] + "" + hsEvent[i].slice(-1);
    }
  }
  combined = [...new Set(combined)];

  var combined = combined.filter(function (el) {
    return el != null;
  });

  // detecting the current day to see what day it is today

  var TodayDate = new Date();
  var d = (TodayDate.getDate()+0).toString();
  var m = mL[TodayDate.getMonth()];

  var filtered;
  var noMonthDay = [];

  // more filtering that figures what is is today

  for (var e = 0; e < combined.length; e++) {
    noMonthDay[e] = combined[e].slice(2).substring(0, combined[e].length - 3);
    if (combined[e].charAt(0) == ' '){
      combined[e] = combined[e].substring(1);
      if (combined[e].substring(0,1) == d && noMonthDay[e] == m.toString()){
        filtered = combined[e];
      }
    } else {
      if (combined[e].substring(0,2) == d && noMonthDay[e] == m.toString()){
        filtered = combined[e];
      }
    }
  }

  // finally log what exactly it is today

  if (filtered == undefined) {
    console.log('No Cycle Day Today');
    finalDay = 'No Cycle Day Today';
    jsonString = 'N/A';
  } else {
    console.log('Today is Day ' + filtered.slice(-1));
    finalDay = 'Today is Day ' + filtered.slice(-1);
    jsonString = filtered.slice(-1);
  }

  jsonString = '{"day":"' + jsonString + '"}'
  fs.writeFile('./cycle.json', jsonString, err=> {
    if (err) {
      console.log(err);
    }
  });

  await browser.close();
  setTimeout(test, 60000); // refreshes every minute
})();


function endsWithNumber( str ){
  return isNaN(str.slice(-1)) ? false : true;
}
