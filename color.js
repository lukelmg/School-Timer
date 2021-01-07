var customBackground, customTimerTextActive, customTimerTextDeactive, customAccent,
    customLightShadow, customDarkShadow, customLightShadowDim, customDarkShadowDim;

function changeColors (theme) {
  switch (theme) {
    case 'default':
    customBackground = '#ededed';
    customTimerTextActive = '#575757';
    customTimerTextDeactive = '#bfbfbf';

    customLightShadowDim = '-6px -6px 10px ';
    customLightShadow = 'rgba(255, 255, 255, 0.8), ';
    customDarkShadowDim = '6px 6px 10px ';
    customDarkShadow = 'rgba(0,0,0,0.2)';
      break;
    case 'dark':
    customBackground = '#0a0a0a';
    customTimerTextActive = '#bfbfbf';
    customTimerTextDeactive = '#575757';

    customLightShadowDim = '-6px -6px 10px ';
    customLightShadow = '#14141a, ';
    customDarkShadowDim = '6px 6px 10px ';
    customDarkShadow = 'black';
  }

  document.body.style.backgroundColor = customBackground;

  var timers = document.getElementsByClassName('shadows');
  for (var i = 0; i < timers.length; i++) {
    timers[i].style.boxShadow = customLightShadowDim + customLightShadow + customDarkShadowDim + customDarkShadow;
  }

  localStorage.setItem('customTimerTextActive', customTimerTextActive);
  localStorage.setItem('customTimerTextDeactive', customTimerTextDeactive);

}











function openColor() {
  document.getElementById('colorDiv').style.left = '50%';
  document.getElementById('everythingElse').style.filter = 'blur(2px)';
}

function closeColor() {
  document.getElementById('colorDiv').style.left = '-50%';
  document.getElementById('everythingElse').style.filter = 'blur(0px)';
}
