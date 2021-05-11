var uisoundValue;

if(localStorage.getItem('uisounds') == undefined || localStorage.getItem('uisounds') == null) {
  console.log('und')
  uisoundValue = true;
  document.getElementById("uisounds").checked = true;
} else {
  console.log('else')
  uisoundValue = localStorage.getItem('uisounds');
  uisoundValue = (uisoundValue == 'true');
  document.getElementById("uisounds").checked = uisoundValue;
}

function uisound() {
  if (uisoundValue == 'true' || uisoundValue == true) {
    higherSound();
  }
}

function soundHandler() {
  var check = document.getElementById("uisounds").checked;
  uisoundValue = check;

  localStorage.setItem('uisounds', uisoundValue);
}

function higherSound() {
 // var audio = new Audio('sounds/higher.mp3');
 // audio.play();
}

function openSoundPanel() {
  document.getElementById('soundDiv').style.left = '50%';
  document.getElementById('everythingElse').style.filter = 'blur(2px)';
  uisound();
}

function closeSoundPanel() {
  document.getElementById('soundDiv').style.left = '-50%';
  document.getElementById('everythingElse').style.filter = 'blur(0px)';
  uisound();
}


function openStuffPanel() {
  document.getElementById("moreStuff").style.left = "50%";
  document.getElementById("everythingElse").style.filter = "blur(2px)";
  uisound();
}

function closeStuffPanel() {
  document.getElementById("moreStuff").style.left = "-50%";
  document.getElementById("everythingElse").style.filter = "blur(0px)";
  uisound();
}

function requestFeature() {
  var feature;
  var type = prompt(
    "Enter the feature you'd like to see in the next update of schooltimer!",
    ""
  );
  if (type == null || type == "") {
    //txt = "User cancelled the prompt.";
  } else {
    feature = type;

    var xhr = new XMLHttpRequest();
    var myURL =
      "https://maker.ifttt.com/trigger/feature/with/key/bc48cOTCsHu3gBrt1nX1EE?value1=" +
      feature;
    xhr.open("POST", myURL, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(
      JSON.stringify({
        value: "value"
      })
    );
  }
}

function bugReport() {
  var feature;
  var type = prompt(
    "Enter the bug you experienced on School Timer so that I can fix it.",
    ""
  );
  if (type == null || type == "") {
    //txt = "User cancelled the prompt.";
  } else {
    feature = type;
    var xhr = new XMLHttpRequest();
    var myURL =
      "https://maker.ifttt.com/trigger/bug/with/key/bc48cOTCsHu3gBrt1nX1EE?value1=" +
      feature;
    xhr.open("POST", myURL, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(
      JSON.stringify({
        value: "value"
      })
    );
  }
}

var refreshCount = 0;

function readJsonData() {
  refreshCount++;
  if (refreshCount <= 6) {
  document.getElementById("cycleDayOutput").innerHTML = '-';
  
 // fetch("cycle.json", { cache: "reload" })
    
    var data = {
      today: '1'
    };
    
    document.getElementById("cycleDayOutput").innerHTML = data.today;
    
  /*  .then(response => response.json())
    .then(data => {
      if (data.today.slice(-1) == 'E') {
        setNew('E');
      }
      document.getElementById("cycleDayOutput").innerHTML = data.today;

      document.getElementById("cycleDayToday").innerHTML = data.today;
      document.getElementById("cycleDayTomorrow").innerHTML = data.tomorrow;
      document.getElementById("cycleDayNextDay").innerHTML = data.nextDay;
    }); */
  } else {
    alert('you are sending too many requests. stop it. \n \nrefresh your browser if you would like to see an updated cycle day')
  }
}

readJsonData();
