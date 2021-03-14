/*

  ----------------------
  PHS cycle day detector
  ----------------------
  By: Luke Gutman 2020

  [dependencies: puppeteer, socket.io, and express]

*/

var mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

var z = require('express')();
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

  var noMonthDay = [];

  var forcast = [];
  var filteredArray = [];

  var combinedTest = [];

  // more filtering that figures what is is today
  for (var i = 0; i < 3; i++) {

    var TodayDate = new Date();
    var d = (TodayDate.getDate()+i).toString();
    var m = mL[TodayDate.getMonth()];

    var filtered;

    for (var e = 0; e < combined.length; e++) {
      noMonthDay[e] = combined[e].slice(2).substring(0, combined[e].length - 3);
      if (combined[e].charAt(0) == ' '){
        combinedTest[e] = combined[e].substring(1);
        if (combinedTest[e].substring(0,1) == d && noMonthDay[e] == m.toString()){
          filtered = combinedTest[e];
        }
      } else {
        if (combined[e].substring(0,2) == d && noMonthDay[e] == m.toString()){
          filtered = combined[e];
          console.log(filtered);
        }
      }
    }
    filteredArray[i] = filtered;
    filtered = [];
  }

  for (var i = 0; i < filteredArray.length; i++) {
    if (filteredArray[i] == undefined || filteredArray[i] == '') {
      filteredArray[i] = 'N/A';
    } else {
      filteredArray[i] = filteredArray[i].slice(-1);
    }
  }

  jsonString = '{"today":"' + filteredArray[0] + '",'
  jsonString = jsonString + '"tomorrow":"' + filteredArray[1] + '",'
  jsonString = jsonString + '"nextDay":"' + filteredArray[2] + '"}'

  console.log(jsonString);
  fs.writeFile('./cycle.json', jsonString, err=> {
    if (err) {
      console.log(err);
    }
  });

  await browser.close();
  setTimeout(test, 5*60*1000); // refreshes every minute
})();


function endsWithNumber( str ){
  return isNaN(str.slice(-1)) ? false : true;
}
