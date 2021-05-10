function openStatsPanel() {
  document.getElementById('moreStats').style.left = '50%';
  document.getElementById('everythingElse').style.filter = 'blur(2px)';
  uisound();
}

function closeStatsPanel() {
  document.getElementById('moreStats').style.left = '-50%';
  document.getElementById('everythingElse').style.filter = 'blur(0px)';
  uisound();
}

var deadlines = [
                 new Date("June 11, 2021 9:20:00").getTime(),
                 new Date("June  1, 2021 14:30:00").getTime(),
                ];

var statNames = [
                 'Last Day of School',
                 'Seniors Last Day',
                ];

const container = document.getElementById('statsDiv');

var deadline = new Date("June 11, 2021 9:20:00").getTime();


for (var i = 0; i < deadlines.length; i++) {
  var label = document.createElement('h4');
  label.innerHTML = statNames[i];
  label.style.display = 'inline-block';
  label.style.fontWeight = 'bold';
  label.style.marginRight = '10px';
  label.style.marginLeft = '0vw';

  var output = document.createElement('h4');
  output.className = 'stat';
  output.id = 'stat' + i;
  output.style.display = 'inline-block';

  container.appendChild(label);
  container.appendChild(output);

  var brrr = document.createElement('br');
  container.appendChild(brrr);
}

function statsHandler() {

  for (var i = 0; i < deadlines.length; i++) {
    var now = new Date().getTime();
    var t = deadlines[i] - now;
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    var hours = Math.floor((t%(1000 * 60 * 60 * 24))/(1000 * 60 * 60));
    var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((t % (1000 * 60)) / 1000);

    document.getElementById('stat' + i).innerHTML = days + ' Days ' + hours + ' Hours ' + minutes + ' Minutes ' + seconds + ' Seconds';
    if (t < 0) {
      document.getElementById('stat' + i) = 'Expired';
    }

  }
  setTimeout(statsHandler, 10);
}


const toggle = document.createElement('button');
toggle.style.position = 'absolute';
toggle.style.top = '0%';
toggle.style.right = '0%';
toggle.style.margin = '0';
toggle.style.padding = '0';
toggle.style.width = '6vw';
toggle.style.height = '6vw';
toggle.style.borderRadius = '0';
toggle.style.borderBottomLeftRadius = '2vw';
toggle.style.fontSize = '200%';
toggle.innerHTML = '&#171;';
toggle.onclick = function() {moveSidebar();}

document.body.appendChild(toggle);

const timers = document.getElementsByClassName('timer');
const text = document.getElementsByClassName('timerText');
const sidebar = document.getElementById('fullSidebar');

var notMoved = true;

var aspect;

setSidebar();
function setSidebar() {
  var screenX =  window.innerWidth;
  var screenY =  window.innerHeight;
  aspect = screenX / screenY;

  if (aspect <= 1.15) {
    if (notMoved == true) {
      sidebar.style.display = 'none';
    }
    toggle.style.display = 'block';
    for (var i = 0; i < timers.length; i++) {
      timers[i].style.width = '90vw';
    }
    for (var i = 0; i < text.length; i++) {
      text[i].style.fontSize = '3.5vw';
    }
  } else {
    sidebar.style.display = 'block';
    toggle.style.display = 'none';
    for (var i = 0; i < timers.length; i++) {
      timers[i].style.width = '55vw';
    }
    for (var i = 0; i < text.length; i++) {
      text[i].style.fontSize = '2.5vw';
    }
  }
  setTimeout(setSidebar, 50);
}

function moveSidebar() {
  if (notMoved == true) {
    sidebar.style.display = 'block';
    document.getElementById('timers').style.display = 'none';
    toggle.style.left = '0%';
    toggle.style.right = '';
    toggle.style.borderBottomLeftRadius = '0';
    toggle.style.borderBottomRightRadius = '2vw';
    toggle.innerHTML = '&#187;';
    notMoved = false;
  } else {
    sidebar.style.display = 'none';
    document.getElementById('timers').style.display = 'block';
    toggle.style.right = '0%';
    toggle.style.left = '';
    toggle.style.borderBottomLeftRadius = '2vw';
    toggle.style.borderBottomRightRadius = '0';
    toggle.innerHTML = '&#171;';
    notMoved = true;
  }
}


var curHour;
var curMin;

(function actualTime() {
    var date = new Date();
    var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

    var ampm;
    var suffix;

    curHour = hours;
    curMin = minutes;

    if (hours > 12) {
      hours = hours - 12;
      suffix = 'PM';
    } else {
      suffix = 'AM';
    }
    var time = hours + ":" + minutes;
    document.getElementById("topTime").innerHTML = time;

    var bottomTime = ':' + seconds + ' ' + suffix;
    document.getElementById('bottomTime').innerHTML = bottomTime;

    setTimeout(actualTime, 10);

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
