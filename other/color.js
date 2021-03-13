var customBackground, customTimerTextActive, customTimerTextDeactive, customAccent, customMainTexts,
    customLightShadow, customDarkShadow, customLightShadowDim, customDarkShadowDim;

    var LightenColor = function(color, percent) {
        var num = parseInt(color.replace("#",""), 16),
    		amt = Math.round(2.55 * percent),
    		R = (num >> 16) + amt,
    		B = (num >> 8 & 0x00FF) + amt,
    		G = (num & 0x0000FF) + amt;

    		return '#' + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (B<255?B<1?0:B:255)*0x100 + (G<255?G<1?0:G:255)).toString(16).slice(1);
    };

var selectedTheme;

var currentColors = {
  background: '#ededed',
  accent: '#ff2b40',
  maintext: '#575757',
  timertextactive: '#575757',
  timertextdeactive: '#bfbfbf',
  lightshadowdim: '-6px -6px 10px ',
  lightshadow: function() {
    return LightenColor(this.background, 5);
  },
  darkshadowdim: '6px 6px 10px ',
  darkshadow: function() {
    return LightenColor(this.background, -6);
  }
};





function changeColors (theme) {
  switch (theme) {
    case 'default':
    currentColors = defaultTheme;
      break;
    case 'dark':
    currentColors = darkTheme;
      break;
    case 'beach':
    currentColors = beachTheme;
      break;
    case 'eww':
    currentColors = ewwTheme;
      break;
    case 'stealth':
    currentColors = stealthTheme;
  }
  setAllElementColors();
}


function setBackgrounds() {
  document.body.style.backgroundColor = currentColors.background;

  var popups = document.getElementsByClassName('popup');
  for (var i = 0; i < popups.length; i++) {
    popups[i].style.backgroundColor = LightenColor(currentColors.background, 0);
  }
}

function setMainText() {
  var mainTexts = document.getElementsByTagName('h6');
  for (var i = 0; i < mainTexts.length; i++) {
    mainTexts[i].style.color = currentColors.maintext;
  }

  var buttons = document.getElementsByTagName('button');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].style.color = currentColors.maintext;
  }

  var h1s = document.getElementsByTagName('h1');
  for (var i = 0; i < h1s.length; i++) {
    h1s[i].style.color = currentColors.maintext;
  }

  var radioLabels = document.getElementsByClassName('radioInner');
  for (var i = 0; i < radioLabels.length; i++) {
    radioLabels[0].style.backgroundColor = currentColors.maintext;
  }

  var radioLabels = document.getElementsByTagName('select');
  for (var i = 0; i < radioLabels.length; i++) {
    radioLabels[i].style.color = currentColors.maintext;
    radioLabels[i].style.borderColor = currentColors.maintext;
  }

  var active = document.getElementsByClassName('timerText');
  for (var i = 0; i < active.length; i++) {
    active[i].style.color = currentColors.maintext;
  }
}

function setAccent() {
  var lines = document.getElementsByTagName('hr');
  for (var i = 0; i < lines.length; i++) {
    lines[i].style.borderColor = currentColors.accent;
  }
  document.getElementById('progressInner').style.backgroundColor = currentColors.accent;
  document.getElementById('summerInner').style.backgroundColor = currentColors.accent;
}

function setShadows() {
  var timers = document.getElementsByClassName('shadows');
  for (var i = 0; i < timers.length; i++) {
    timers[i].style.boxShadow = currentColors.lightshadowdim + currentColors.lightshadow() + ', ' + currentColors.darkshadowdim + currentColors.darkshadow();
  }
}

function setAllElementColors() {
//  alert(currentColors.background);
  setBackgrounds();
  setMainText();
  setAccent();
  setShadows();
  localStorage.setItem('background', currentColors.background);
  localStorage.setItem('accent', currentColors.accent);
  localStorage.setItem('maintext', currentColors.maintext);
  localStorage.setItem('timertextactive', currentColors.timertextactive);
  localStorage.setItem('timertextdeactive', currentColors.timertextdeactive);
  localStorage.setItem('lightshadowdim', currentColors.lightshadowdim);
  localStorage.setItem('lightshadow', currentColors.lightshadow());
  localStorage.setItem('darkshadowdim', currentColors.darkshadowdim);
  localStorage.setItem('darkshadow', currentColors.darkshadow());
}

getItems();

function getItems() {
  currentColors.background = localStorage.getItem('background');
  currentColors.accent = localStorage.getItem('accent');
  currentColors.maintext = localStorage.getItem('maintext');
  currentColors.timertextactive = localStorage.getItem('timertextactive');
  currentColors.timertextdeactive = localStorage.getItem('timertextdeactive');
  currentColors.lightshadowdim = localStorage.getItem('lightshadowdim');
  //currentColors.lightshadow() = 'return' + localStorage.getItem('lightshadow')';
  currentColors.darkshadowdim = localStorage.getItem('darkshadowdim');
  //currentColors.darkshadow() = localStorage.getItem('darkshadow');


  //currentColors.lightshadow() = localStorage.getItem('lightshadow');

  setAllElementColors();
}




















function openColor() {
  document.getElementById('colorDiv').style.left = '50%';
  document.getElementById('everythingElse').style.filter = 'blur(2px)';
  deepSound();
}

function closeColor() {
  document.getElementById('colorDiv').style.left = '-50%';
  document.getElementById('everythingElse').style.filter = 'blur(0px)';
  closeSound();
}


var currentColors = {
  background: '#ededed',
  accent: '#ff2b40',
  maintext: '#575757',
  timertextactive: '#575757',
  timertextdeactive: '#bfbfbf',
  lightshadowdim: '-6px -6px 10px ',
  lightshadow: function() {
    return LightenColor(this.background, 5);
  },
  darkshadowdim: '6px 6px 10px ',
  darkshadow: function() {
    return LightenColor(this.background, -6);
  }
};
