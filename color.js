var customBackground, customTimerTextActive, customTimerTextDeactive, customAccent, customMainTexts,
    customLightShadow, customDarkShadow, customLightShadowDim, customDarkShadowDim;

function changeColors (theme) {
  switch (theme) {
    case 'default':
    customBackground = '#ededed';

    customAccent = 'blue';

    customMainTexts = '#575757';
    customTimerTextActive = '#575757';
    customTimerTextDeactive = '#bfbfbf';

    customLightShadowDim = '-6px -6px 10px ';
    customLightShadow = 'rgba(255, 255, 255, 0.8), ';
    customDarkShadowDim = '6px 6px 10px ';
    customDarkShadow = 'rgba(0,0,0,0.2)';
      break;
    case 'dark':
    customBackground = '#0a0a0a';

    customAccent = 'green';

    customMainTexts = '#575757'
    customTimerTextActive = '#bfbfbf';
    customTimerTextDeactive = '#575757';

    customLightShadowDim = '-6px -6px 10px ';
    customLightShadow = '#14141a, ';
    customDarkShadowDim = '6px 6px 10px ';
    customDarkShadow = 'black';
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
    popups[i].style.backgroundColor = LightenDarkenColor(customBackground, 10);
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
}

function setAccent() {
  var lines = document.getElementsByTagName('hr');
  for (var i = 0; i < lines.length; i++) {
    lines[i].style.borderColor = customAccent;
  }
}

function setShadows() {
  var timers = document.getElementsByClassName('shadows');
  for (var i = 0; i < timers.length; i++) {
    timers[i].style.boxShadow = customLightShadowDim + customLightShadow + customDarkShadowDim + customDarkShadow;
  }
}

function setOtherTexts() {
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




function LightenDarkenColor(col, amt) {

    var usePound = false;

    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }

    var num = parseInt(col,16);

    var r = (num >> 16) + amt;

    if (r > 255) r = 255;
    else if  (r < 0) r = 0;

    var b = ((num >> 8) & 0x00FF) + amt;

    if (b > 255) b = 255;
    else if  (b < 0) b = 0;

    var g = (num & 0x0000FF) + amt;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);

}
