var ui;

function switchUISounds() {
  if(ui == true) {
    ui = false;
  } else {
    ui = true;
  }
}

function uisounds(name) {
  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

function alarmsounds() {
  
}
