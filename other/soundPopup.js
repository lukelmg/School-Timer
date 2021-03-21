function openSoundPanel() {
  document.getElementById('soundDiv').style.left = '50%';
  document.getElementById('everythingElse').style.filter = 'blur(2px)';
  uisounds('higher');
}

function closeSoundPanel() {
  document.getElementById('soundDiv').style.left = '-50%';
  document.getElementById('everythingElse').style.filter = 'blur(0px)';
  uisounds('boop');
}
