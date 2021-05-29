var mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const puppeteer = require('puppeteer');
const fs = require('fs');

var finalDay;
var jsonString;

(async () => {

  // set up browser for puppeteer to look at phs website
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless:(process.platform !== "win32")
  });
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0)
  await page.goto('https://phs.parklandsd.org/', {
    waitUntil: 'domcontentloaded'
  });

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

  var elearningTest = [];
  var justElearn = [];

  for (var i = 0; i < MONTH.length; i++) {
    if (hsEvent[i].indexOf("Day") !== -1 && endsWithNumber(hsEvent[i]) == true) {
      elearningTest[i] = DAY[i] + MONTH[i] + '' + hsEvent[i];
    }
  }

  var elearnFilter = elearningTest.filter(function(el) {
    return el != null;
  });

  var TodayDate = new Date();
  var dddd = TodayDate.getDate()+1;

  for (var i = 0; i < elearnFilter.length; i++) {
    if (elearnFilter[i].includes("e-Learning Day") == true) {
      for (var e = 0; e < 3; e++) {
        if (elearnFilter[i].substring(0,2) == (dddd + i)) {
          var number = elearnFilter[i].slice(-1);
          justElearn[i] = number;
        }
      }
    }
  }


  var justElearn2 = justElearn.filter(function(el) {
    return el != null;
  });

  justElearn2 = [...new Set(justElearn2)];

  // clean up data by slicing, cutting, and alalyzing strings (not efficient but works)

  for (var i = 0; i < MONTH.length; i++) {
    if (hsEvent[i].indexOf("Day") !== -1 && endsWithNumber(hsEvent[i]) == true) {
      combined[i] = DAY[i] + MONTH[i] + "" + hsEvent[i].slice(-1);
    }
  }
  combined = [...new Set(combined)];

  var combined = combined.filter(function(el) {
    return el != null;
  });

  // detecting the current day to see what day it is today

  var noMonthDay = [];

  var forcast = [];
  var filteredArray = [];

  var combinedTest = [];

  // more filtering that figures what is is today
  for (var i = 0; i < 3; i++) {

    var d = (TodayDate.getDate() + i).toString();
    var m = mL[TodayDate.getMonth()];

    var filtered;

    for (var e = 0; e < combined.length; e++) {
      noMonthDay[e] = combined[e].slice(2).substring(0, combined[e].length - 3);
      if (combined[e].charAt(0) == ' ') {
        combinedTest[e] = combined[e].substring(1);
        if (combinedTest[e].substring(0, 1) == d && noMonthDay[e] == m.toString()) {
          filtered = combinedTest[e];
        }
      } else {
        if (combined[e].substring(0, 2) == d && noMonthDay[e] == m.toString()) {
          filtered = combined[e];
        }
      }
    }
    filteredArray[i] = filtered;
    filtered = [];
  }

  console.log(filteredArray)
  console.log(justElearn2)

  for (var i = 0; i < filteredArray.length; i++) {
    for (var e = 0; e < justElearn2.length; e++) {
      if (filteredArray[i] != undefined) {
        if (filteredArray[i].slice(-1) == justElearn2[e]) {
          filteredArray[i] = filteredArray[i] + 'E';
        }
      }
    }
  }

  for (var i = 0; i < filteredArray.length; i++) {
    if (filteredArray[i] == undefined || filteredArray[i] == '') {
      filteredArray[i] = 'N/A';
    } else {
      if (filteredArray[i].slice(-1) == 'E') {
        filteredArray[i] = filteredArray[i].slice(-2);
      } else  {
        filteredArray[i] = filteredArray[i].slice(-1);
      }
    }
  }

  jsonString = '{"today":"' + filteredArray[0] + '",'
  jsonString = jsonString + '"tomorrow":"' + filteredArray[1] + '",'
  jsonString = jsonString + '"nextDay":"' + filteredArray[2] + '"}'

  console.log(jsonString);
  fs.writeFile('./cycle.json', jsonString, err => {
    if (err) {
      console.log(err);
    }
  });

  await browser.close();

})();


function endsWithNumber(str) {
  return isNaN(str.slice(-1)) ? false : true;
}

function arrayCompare(_arr1, _arr2) {
    if (
      !Array.isArray(_arr1)
      || !Array.isArray(_arr2)
      || _arr1.length !== _arr2.length
      ) {
        return false;
      }

    // .concat() to not mutate arguments
    const arr1 = _arr1.concat().sort();
    const arr2 = _arr2.concat().sort();

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
         }
    }

    return true;
}
