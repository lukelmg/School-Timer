setSidebar();

var itsOkToOpen = false;

const open = document.getElementById('sidebarShow');
const sidebar = document.getElementById('fullSidebar');

function setSidebar() {
  var screenX =  window.innerWidth;
  var screenY =  window.innerHeight;
  var aspect = screenX / screenY;

  timers = document.getElementsByClassName('timer');
  text = document.getElementsByClassName('timerText');

  const theTimers = document.getElementById('timers');

  if (aspect <= 1.15) {
    if (itsOkToOpen == false) {
      document.getElementById('fullSidebar').style.display = 'none';
    }
    document.getElementById('sidebarShow').style.display = 'block';
    for (var i = 0; i < timers.length; i++) {
      timers[i].style.width = '90vw';
      timers[i].style.marginRight = '1vw';
    }
    for (var i = 0; i < text.length; i++) {
      text[i].style.fontSize = '3.5vw';
    }
  } else {
    document.getElementById('fullSidebar').style.display = 'block';
    document.getElementById('sidebarShow').style.display = 'none';
    for (var i = 0; i < timers.length; i++) {
      timers[i].style.width = '55vw';
    }
    for (var i = 0; i < text.length; i++) {
      text[i].style.fontSize = '2.5vw';
    }
    theTimers.style.filter = 'blur(0px)';
    sidebar.style.display = 'none';
    open.style.zIndex = '999';
    open.innerHTML = '<';
  }
  document.querySelector("#everythingElse > h1:nth-child(4)").style.display = 'none';
  document.querySelector("#everythingElse > h1:nth-child(5)").style.display = 'none';
  setTimeout(setSidebar, 50);
}

var state = false;

open.addEventListener('click', event => {
  if (state == false) {
    const timers = document.getElementById('timers');
    itsOkToOpen = true;
    timers.style.position = 'absolute';
    timers.style.zIndex = '-9999';
    timers.style.filter = 'blur(5px)';
  //  timers.style.top = '-9999%'
    sidebar.style.display = 'block';
    open.innerHTML = '>';
    state = true;
  } else {
    state = false;
    const timers = document.getElementById('timers');
    itsOkToOpen = true;
    timers.style.filter = 'blur(0px)';
    sidebar.style.display = 'none';
    open.style.zIndex = '999';
    open.innerHTML = '<';
  }
});
