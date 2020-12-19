var currentScheduleSelected = 'A';
var numberOfPeriods = 9;

var startTimesA = ['07:40', '08:30', '09:15', '10:00', '10:45', '11:30', '12:15', '13:00', '14:50'];
var endTimesA =   ['08:24', '09:09', '09:54', '10:39', '11:24', '12:09', '12:54', '13:44', '15:30'];

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
      box.className = 'timer';
      box.id = 'firstContainer';

      var schoolTitle = document.createElement('div');
      schoolTitle.id = 'schoolTitle';
      schoolTitle.innerHTML = 'School Timer';

      box.appendChild(schoolTitle);
      container.appendChild(box);

    } else {

      var box = document.createElement('div');
      box.className = 'timer';

      if (i == 1) {
        box.id = 'secondContainer'
      }

      var header = document.createElement('h2');

      header.innerHTML = suffix(i) + ' Period';

      var breakTest = document.createElement('br');

      var table = document.createElement('table');

      var row1 = document.createElement('tr');

      var startLabel = document.createElement('th');
      var endLabel = document.createElement('th');

      startLabel.innerHTML = 'Start';
      endLabel.innerHTML = 'End';

      row1.appendChild(startLabel);
      row1.appendChild(endLabel);

      var row2 = document.createElement('tr');

      var start = document.createElement('td');
      var end = document.createElement('td');

      start.innerHTML = '00:54:31';
      end.innerHTML = '00:32:31';

      row2.appendChild(start);
      row2.appendChild(end);

      table.appendChild(row1);
      table.appendChild(row2);

      box.appendChild(header);
      box.appendChild(breakTest);
      box.appendChild(table);

      container.appendChild(box);

      if (isOdd(i) == 1) {
        var theBreak = document.createElement('br');
        container.appendChild(theBreak);
      }

      $("#firstContainer").css("height", $("#secondContainer").height());
    }
  }
}

(function() {
  var start = new Date;
  start.setHours(23, 0, 0); // 11pm

  function pad(num) {
    return ('0' + parseInt(num)).substr(-2);
  }

  function tick() {
    var now = new Date;
    if (now > start) { // too late, go to tomorrow
      start.setDate(start.getDate() + 1);
    }
    var remain = ((start - now) / 1000);
    var hh = pad((remain / 60 / 60) % 60);
    var mm = pad((remain / 60) % 60);
    var ss = pad(remain % 60);
    document.getElementById('time').innerHTML = hh + ':' + mm + ':' + ss;
    setTimeout(tick, 1000);
  }

  document.addEventListener('DOMContentLoaded', tick);
})();



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
