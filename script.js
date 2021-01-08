var currentScheduleSelected = 'A';
var numberOfPeriods = 9;

var scheduleArray = ['startTimesA', 'startTimesB', 'startTimesC', 'startTimesD']

var startTimesA = ['' + '07:40', '08:30', '09:15', '10:00', '10:45', '11:30', '12:15', '13:00', '13:50'];
var endTimesA =   ['' + '08:24', '09:09', '09:54', '10:39', '11:24', '12:09', '12:54', '13:44', '14:30'];

var startTimesC = [];
var endTimesC = [];

var startTimesD = [];
var endTimesD = [];

create();

function create() {
  var container = document.getElementById('timers');
  while (container.hasChildNodes()) {
    container.removeChild(container.lastChild);
  }

  for (var i = 0; i < numberOfPeriods + 1; i++) {

    if (i == 0) {
      var box = document.createElement('div');
      box.id = 'firstContainer';

      var schoolTitle = document.createElement('div');
      schoolTitle.id = 'schoolTitle';
      schoolTitle.innerHTML = 'School Timer';

      box.appendChild(schoolTitle);
      container.appendChild(box);

    } else {

      var box = document.createElement('div');
      box.className = 'timer  shadows';

      if (i == 1) {
        box.id = 'secondContainer'
      }

      var header = document.createElement('h2');

      header.innerHTML = suffix(i) + ' Period';

      var table = document.createElement('table');

      var row1 = document.createElement('tr');

      var startLabel = document.createElement('th');
      var endLabel = document.createElement('th');

      startLabel.innerHTML = 'Start';
      startLabel.className = 'thatLabelThing'

      endLabel.innerHTML = 'End';
      endLabel.className = 'thatLabelThing thatEndThing'

      row1.appendChild(startLabel);
      row1.appendChild(endLabel);

      var row2 = document.createElement('tr');

      var start = document.createElement('td');
      var end = document.createElement('td');

      start.innerHTML = '00:54:31';
      start.id = i-1 + 'start';

      end.innerHTML = '00:32:31';
      end.id = i-1 + 'end';

      row2.appendChild(start);
      row2.appendChild(end);

      table.appendChild(row1);
      table.appendChild(row2);

      box.appendChild(header);
    //  box.appendChild(breakTest);
      box.appendChild(table);

      container.appendChild(box);

        var theBreak = document.createElement('br');
        container.appendChild(theBreak);


      $("#firstContainer").css("height", $("#secondContainer").height() + 20);
    }
  }
}

var startTimes = [];
var endTimes = [];

var startStatus = [];
var endStatus = [];

setSchedule();

function setSchedule() {
  switch (currentScheduleSelected) {
  case 'A':
    startTimes = startTimesA;
    endTimes = endTimesA;
    break;
  case 'B':
    startTimes = startTimesB;
    endTimes = endTimesB;
    break;
  case 'C':
     startTimes = startTimesC;
     endTimes = endTimesC;
    break;
  case 'D':
    startTimes = startTimesD;
    endTimes = endTimesD;
  }
}

(function() {

  var start = new Date;

  function tick() {

    for (var i = 0; i < numberOfPeriods; i++) {
      start.setHours(startTimes[i].substring(0, 2), startTimes[i].substring(3, 5), 0);

      var now = new Date;
      if (now > start) { // too late, go to tomorrow
        start.setDate(start.getDate() + 1);
      }

      var remain = ((start - now) / 1000);
      var hh = pad((remain / 60 / 60) % 60);
      var mm = pad((remain / 60) % 60);
      var ss = pad(remain % 60);

      if (hh >= 24) {
        hh = hh - 24;
      }

      if (hh < 10) {
        hh = '0' + hh;
      }

      if (hh >= 10) {
        document.getElementById(i + 'start').innerHTML = '------------';
        startStatus[i] = true;
      } else {
        document.getElementById(i + 'start').innerHTML = hh + ':' + mm + ':' + ss;
        startStatus[i] = false;
      }
    }
    setTimeout(tick, 10);
  }


  function tick2() {

    for (var i = 0; i < numberOfPeriods; i++) {
      start.setHours(endTimes[i].substring(0, 2), endTimes[i].substring(3, 5), 0);

      var now = new Date;
      if (now > start) { // too late, go to tomorrow
        start.setDate(start.getDate() + 1);
      }

      var remain = ((start - now) / 1000);
      var hh = pad((remain / 60 / 60) % 60);
      var mm = pad((remain / 60) % 60);
      var ss = pad(remain % 60);

      if (hh >=24) {
        hh = hh - 24;
      }

      if (hh < 10) {
        hh = '0' + hh;
      }

      if (hh >= 11) {
        document.getElementById(i + 'end').innerHTML = '------------';
        var currentTimer = document.getElementsByClassName('timer');
        currentTimer[i].style.color = localStorage.getItem('customTimerTextDeactive');
        currentTimer[i].style.border = 'none';
      } else {
        if (startStatus[i] == true) {
          var currentTimer = document.getElementsByClassName('timer');
          currentTimer[i].style.border = '3px solid #E94A35';
          currentTimer[i].style.color = localStorage.getItem('customTimerTextActive');
        } else {
          var currentTimer = document.getElementsByClassName('timer');
          currentTimer[i].style.border = 'none';
          currentTimer[i].style.color = localStorage.getItem('customTimerTextActive');
        }
        document.getElementById(i + 'end').innerHTML = hh + ':' + mm + ':' + ss;

          var supposed = new Date().setHours(startTimes[0].substring(0, 2), startTimes[0].substring(3, 5), 0);

          var nownow = new Date();
          var endSchool = new Date().setHours(endTimes[8].substring(0, 2), endTimes[8].substring(3, 5), 0);
          var diffMs = (endSchool - nownow);

          var supposedVal = endSchool - supposed;

          var percent = (((diffMs / supposedVal * 100)-100)*-1).toFixed(2);

          if (percent == undefined || percent == '' || percent == null) {
            percent = 0;
          }

          var schoolDayProgress = document.getElementById('progressInner');
          schoolDayProgress.style.width = percent + '%';

          var schoolDayProgressLabel = document.getElementById('dayProgressLabel');
          schoolDayProgressLabel.innerHTML = percent + '%';
    }
  }

    setTimeout(tick2, 10);
  }

  document.addEventListener('DOMContentLoaded', tick);
  document.addEventListener('DOMContentLoaded', tick2);
})();


function pad(num) {
  return ('0' + parseInt(num)).substr(-2);
}


function suffix(i) {
  var j = i % 10,
    k = i % 100;
  if (j == 1 && k != 11) {
    return i + 'st';
  }
  if (j == 2 && k != 12) {
    return i + 'nd';
  }
  if (j == 3 && k != 13) {
    return i + 'rd';
  }
  return i + 'th';
}

function isOdd(num) { return num % 2;}

(function grrrr() {
    var d = new Date();
    var n = d.toLocaleString([], { hour: '2-digit', minute: '2-digit', second: '2-digit'});
    document.getElementById("currentTime").innerHTML = n;
    setTimeout(grrrr, 10);

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    document.getElementById('currentDate').innerHTML = today;

    var testDate = new Date();
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    document.getElementById('currentDay').innerHTML = days[testDate.getDay()];
})();

(function foo() {
  var today = new Date();
  var endSchool = new Date("2021-6-11");
  var diffMs = (endSchool - today); // milliseconds between now & Christmas

  var percent = (((diffMs / 24192000000 * 100)-100)*-1).toFixed(2);

  var yearProgress = document.getElementById('summerInner');
  yearProgress.style.width = percent + '%';

  var yearNumber = document.getElementById('summerNumber');
  yearNumber.innerHTML = percent + '%';

  setTimeout(foo, 1000);
})();
