setSidebar();

function setSidebar() {
  var screenX =  window.innerWidth;
  var screenY =  window.innerHeight;
  var aspect = screenX / screenY;

  timers = document.getElementsByClassName('timer');
  text = document.getElementsByClassName('timerText');

  if (aspect <= 1.15) {
    document.getElementById('fullSidebar').style.display = 'none';
    for (var i = 0; i < timers.length; i++) {
      timers[i].style.width = '90vw';
    }
    for (var i = 0; i < text.length; i++) {
      text[i].style.fontSize = '3.5vw';
    }
  } else {
    document.getElementById('fullSidebar').style.display = 'block';
    for (var i = 0; i < timers.length; i++) {
      timers[i].style.width = '55vw';
    }
    for (var i = 0; i < text.length; i++) {
      text[i].style.fontSize = '2.5vw';
    }
  }
  setTimeout(setSidebar, 50);
}
