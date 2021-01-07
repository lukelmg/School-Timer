var customBackground, customTimerBackground, customTimerText, customLightShadow, customDarkShadow, customAccent;

function changeColors (theme) {
  switch (theme) {
    case 'default':
    customBackground = '#ededed'
      break;
    case 'dark':
    customBackground = '#151b23';
  }

  document.body.style.backgroundColor = customBackground;


}
