var currentScheduleSelected = 'A';
var numberOfPeriods = 9;

var scheduleArray = ['startTimesA', 'startTimesB', 'startTimesC', 'startTimesD']

var startTimesA = ['' + '07:40', '08:30', '09:15', '10:00', '10:45', '11:30', '12:15', '13:00', '13:50'];
var endTimesA =   ['' + '08:24', '09:09', '09:54', '10:39', '11:24', '12:09', '12:54', '13:44', '14:30'];

var startTimesE = ['' + '09:17', '09:52', '10:30', '11:08', '11:46', '12:24', '13:02', '13:40', '14:17'];
var endTimesE =   ['' + '09:47', '10:25', '11:03', '11:41', '12:19', '12:57', '13:35', '14:12', '14:30'];

var startTimesC = ['' + '07:40', '08:18', '08:54', '09:30', '10:06', '10:42', '11:18', '11:54', '12:30'];
var endTimesC =   ['' + '08:12', '08:48', '09:24', '10:00', '10:36', '11:12', '11:48', '12:24', '13:00'];

var startTimesD = ['' + '09:40', '10:12', '10:42', '11:12', '11:48', '12:24', '13:00', '13:36', '14:06'];
var endTimesD =   ['' + '10:06', '10:36', '11:06', '11:42', '12:18', '12:54', '13:30', '14:00', '14:30'];

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
      header.className = 'timerText';

      var table = document.createElement('table');

      var row1 = document.createElement('tr');

      var startLabel = document.createElement('th');
      var endLabel = document.createElement('th');

      startLabel.innerHTML = 'Start: ';
      startLabel.className = 'thatLabelThing thatStartThing timerText';

      endLabel.innerHTML = 'End: ';
      endLabel.className = 'thatLabelThing thatEndThing timerText';

      var row2 = document.createElement('tr');

      var start = document.createElement('td');
      var end = document.createElement('td');

      start.innerHTML = '00:54:31';
      start.id = i-1 + 'start';
      start.className = 'timerText';

      end.innerHTML = '00:32:31';
      end.id = i-1 + 'end';
      end.className = 'timerText';
      
      row1.appendChild(startLabel);
      row1.appendChild(start);
      row1.appendChild(endLabel);
      row1.appendChild(end)

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

var activeTimers = [];
var filteredActive = [];

setSchedule();

function setNew(sched) {
  currentScheduleSelected = sched;
  setSchedule();
}

function setSchedule() {
  var remSchedual = localStorage.getItem('currentScheduleSelected');
  activeTimers = [];
  /*

  var startTimes = [];
  var endTimes = [];

  var startStatus = [];
  var endStatus = [];

  var remSchedual = localStorage.getItem('currentScheduleSelected');
  if (remSchedual == null || remSchedual == '' || remSchedual == undefined) {
    setNew('A');
  } else {
    currentScheduleSelected = remSchedual;
  }


  */
  selectorSound();
  var order = ['A', 'E', 'C', 'D'];

  switch (currentScheduleSelected) {
  case 'A':
    startTimes = startTimesA;
    endTimes = endTimesA;
    break;
  case 'E':
    startTimes = startTimesE;
    endTimes = endTimesE;
    break;
  case 'C':
     startTimes = startTimesC;
     endTimes = endTimesC;
    break;
  case 'D':
    startTimes = startTimesD;
    endTimes = endTimesD;
  }
  document.getElementById(currentScheduleSelected + 'in').style.display = 'block';
  for (var i = 0; i < order.length; i++) {
    if (order[i] !== currentScheduleSelected) {
      document.getElementById(order[i] + 'in').style.display = 'none';
    }
  }

  localStorage.setItem('currentScheduleSelected', currentScheduleSelected);
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

var doTitle = [];

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
      
      var currentTimer = document.getElementsByClassName('timer');
      
      var theHeight = window.innerHeight;
      
      var startHeight = 0;
      
   // alert(theHeight / 9)

      //currentTimer[i].style.height = (theHeight / 9) + 'px';
      
      startHeight = 0;
      
      if (hh >= 11) {
        document.getElementById(i + 'end').innerHTML = '------------'
        currentTimer[i].style.color = localStorage.getItem('customTimerTextDeactive');
        currentTimer[i].style.border = '0.5vh solid transparent';
        currentTimer[i].style.display = 'none';
            
        var schoolDayProgress = document.getElementById('progressInner');
        schoolDayProgress.style.width = 100 + '%';

        var schoolDayProgressLabel = document.getElementById('dayProgressLabel');
        schoolDayProgressLabel.innerHTML = 100 + '%';
        endStatus[i] = true;
        doTitle[i] = true;
      } else {
        activeTimers[i] = true;
        endStatus[i] = false;
        if (startStatus[i] == true && endStatus[i] == false) {
          var currentTimer = document.getElementsByClassName('timer');
          currentTimer[i].style.border = '0.5vh solid ' + localStorage.getItem('customAccent');
          currentTimer[i].style.color = localStorage.getItem('customTimerTextActive');
          currentTimer[i].style.boxShadow = 'none';
          currentTimer[i].style.display = 'inline-block';
          if ((hh + ':' + mm + ':' + ss) == '00:00:00') {
            document.title = 'School Timer';
          } else {
            document.title = hh + ':' + mm + ':' + ss;
          }
          doTitle[i] = false;
        } else {
          var currentTimer = document.getElementsByClassName('timer');
          currentTimer[i].style.border = '0.5vh solid transparent';
          currentTimer[i].style.color = localStorage.getItem('customTimerTextActive');
          currentTimer[i].style.display = 'inline-block';
          doTitle[i] = true;
        }

        if ((doTitle.every( (val, i, arr) => val === arr[0]) ) == true) {
          document.title = 'School Timer'
        }

        document.getElementById(i + 'end').innerHTML = hh + ':' + mm + ':' + ss;
        
        
        filteredActive = activeTimers.filter(function () { return true });
        
        if ((theHeight / filteredActive.length) > (theHeight / 4)) {
        currentTimer[i].style.height = (theHeight / 4) + 'px';
        } else {
          currentTimer[i].style.height = (theHeight / filteredActive.length) + 'px';
        }
        currentTimer[i].style.borderRadius = (theHeight / filteredActive.length) + 'px';
      

          var supposed = new Date().setHours(startTimes[0].substring(0, 2), startTimes[0].substring(3, 5), 0);

          var nownow = new Date();
          var endSchool = new Date().setHours(endTimes[8].substring(0, 2), endTimes[8].substring(3, 5), 0);
          var diffMs = (endSchool - nownow);

          var supposedVal = endSchool - supposed;

          var percent = (((diffMs / supposedVal * 100)-100)*-1).toFixed(1);

          if (percent == undefined || percent == '' || percent == null) {
            percent = 0;
          } else if (percent > 100) {
            percent = 100;
          } else if (percent < 0) {
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
    var date = new Date();
    var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  
    var ampm
  
    if (hours > 12)
 {
   hours = hours - 12;
 }    time = hours + ":" + minutes;
    document.getElementById("topTime").innerHTML = time;

    bottomTime = ':' + seconds + ' AM';
    document.getElementById('bottomTime').innerHTML = bottomTime;

    setTimeout(grrrr, 10);

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + ' <br>' + yyyy;
    document.getElementById('currentDate').innerHTML = today;

    var testDate = new Date();
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    document.getElementById('currentDay').innerHTML = days[testDate.getDay()];
})();

(function foo() {
  var today = new Date();
  var endSchool = new Date("2021-6-11");
  var diffMs = (endSchool - today); // milliseconds between now & Christmas

  var percent = (((diffMs / 24192000000 * 100)-100)*-1).toFixed(0);

  var yearProgress = document.getElementById('summerInner');
  yearProgress.style.width = percent + '%';

  var yearNumber = document.getElementById('summerNumber');
  yearNumber.innerHTML = percent + '%';

  setTimeout(foo, 1000);
})();
