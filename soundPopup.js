function openSoundPanel() {
  document.getElementById('soundDiv').style.left = '50%';
  document.getElementById('everythingElse').style.filter = 'blur(2px)';
  higherSound();
}

function closeSoundPanel() {
  document.getElementById('soundDiv').style.left = '-50%';
  document.getElementById('everythingElse').style.filter = 'blur(0px)';
  boop();
}
