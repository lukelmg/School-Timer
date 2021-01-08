var customBackground, customTimerTextActive, customTimerTextDeactive, customAccent, customMainTexts,
    customLightShadow, customDarkShadow, customLightShadowDim, customDarkShadowDim;

function changeColors (theme) {
  switch (theme) {
    case 'default':
    customBackground = '#ededed';

    customAccent = '#ff2b40';

    customMainTexts = '#575757';
    customTimerTextActive = '#575757';
    customTimerTextDeactive = '#bfbfbf';

    customLightShadowDim = '-6px -6px 10px ';
    customLightShadow = LightenColor(customBackground, 5);
    customDarkShadowDim = '6px 6px 10px ';
    customDarkShadow = LightenColor(customBackground, -7);
      break;
    case 'dark':
    customBackground = '#151517';

    customAccent = '#C52233';

    customMainTexts = '#cfcfcf'
    customTimerTextActive = '#cfcfcf';
    customTimerTextDeactive = '#575757';

    customLightShadowDim = '-3px -6px 7px ';
    customLightShadow = LightenColor(customBackground, 4);
    customDarkShadowDim = '6px 6px 10px ';
    customDarkShadow = LightenColor(customBackground, -2);
      break;
    case 'beach':
    customBackground = '#FFF7EB';

    customAccent = '#55DDE0';

    customMainTexts = '#575757'
    customTimerTextActive = '#575757';
    customTimerTextDeactive = '#bfbfbf';

    customLightShadowDim = '-6px -6px 10px ';
    customLightShadow = LightenColor(customBackground, 2);
    customDarkShadowDim = '6px 6px 10px ';
    customDarkShadow = LightenColor(customBackground, -5);
      break;
    case 'eww':
    customBackground = '#050064';

    customAccent = '#feff33';

    customMainTexts = '#ff2afc'
    customTimerTextActive = '#bfbfbf';
    customTimerTextDeactive = '#575757';

    customLightShadowDim = '-6px -6px 10px ';
    customLightShadow = LightenColor(customBackground, 6);
    customDarkShadowDim = '6px 6px 10px ';
    customDarkShadow = LightenColor(customBackground, -6);
  }

  setBackgrounds();
  setMainText();
  setAccent();
  setShadows();
  setOtherTexts();
}

function setBackgrounds() {
  document.body.style.backgroundColor = customBackground;

  var popups = document.getElementsByClassName('popup');
  for (var i = 0; i < popups.length; i++) {
    popups[i].style.backgroundColor = customBackground
  }
}

function setMainText() {
  var mainTexts = document.getElementsByTagName('h6');
  for (var i = 0; i < mainTexts.length; i++) {
    mainTexts[i].style.color = customMainTexts;
  }

  var buttons = document.getElementsByTagName('button');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].style.color = customMainTexts;
  }

  var h1s = document.getElementsByTagName('h1');
  for (var i = 0; i < h1s.length; i++) {
    h1s[i].style.color = customMainTexts;
  }

  var radioLabels = document.getElementsByClassName('radioInner');
  for (var i = 0; i < radioLabels.length; i++) {
    radioLabels[0].style.backgroundColor = customMainTexts;
  }
}

function setAccent() {
  var lines = document.getElementsByTagName('hr');
  for (var i = 0; i < lines.length; i++) {
    lines[i].style.borderColor = customAccent;
  }
  document.getElementById('progressInner').style.backgroundColor = customAccent;
  document.getElementById('summerInner').style.backgroundColor = customAccent;
  localStorage.setItem('customAccent', customAccent);
}

function setShadows() {
  var timers = document.getElementsByClassName('shadows');
  for (var i = 0; i < timers.length; i++) {
    timers[i].style.boxShadow = customLightShadowDim + customLightShadow + ', ' + customDarkShadowDim + customDarkShadow;
}

  document.getElementById('schoolOver').style.boxShadow = customLightShadowDim + customLightShadow + ', ' + customDarkShadowDim + customDarkShadow;
}

function setOtherTexts() {
  localStorage.setItem('customTimerTextActive', customTimerTextActive);
  localStorage.setItem('customTimerTextDeactive', customTimerTextDeactive);
}





















function openColor() {
  document.getElementById('colorDiv').style.left = '50%';
  document.getElementById('everythingElse').style.filter = 'blur(2px)';
  document.getElementById('schoolOver').style.filter = 'blur(2px)';
}

function closeColor() {
  document.getElementById('colorDiv').style.left = '-50%';
  document.getElementById('everythingElse').style.filter = 'blur(0px)';
  document.getElementById('schoolOver').style.filter = 'blur(0px)';
}




var LightenColor = function(color, percent) {
    var num = parseInt(color.replace("#",""), 16),
		amt = Math.round(2.55 * percent),
		R = (num >> 16) + amt,
		B = (num >> 8 & 0x00FF) + amt,
		G = (num & 0x0000FF) + amt;

		return '#' + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (B<255?B<1?0:B:255)*0x100 + (G<255?G<1?0:G:255)).toString(16).slice(1);
};
