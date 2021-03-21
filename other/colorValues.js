var defaultTheme = {
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

var darkTheme = {
  background: '#232324',
  accent: '#C52233',
  maintext: '#cfcfcf',
  timertextactive: '#cfcfcf',
  timertextdeactive: '#575757',
  lightshadowdim: '-3px -6px 7px ',
  lightshadow: function() {
    return LightenColor(this.background, 5);
  },
  darkshadowdim: '6px 6px 10px ',
  darkshadow: function() {
    return LightenColor(this.background, -6);
  }
};

var beachTheme = {
  background: '#FFF7EB',
  accent: '#55DDE0',
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

var stealthTheme = {
  background: '#000000',
  accent: '#1c1c1c',
  maintext: '#1c1c1c',
  timertextactive: '#1c1c1c',
  timertextdeactive: '#575757',
  lightshadowdim: '-3px -6px 7px ',
  lightshadow: function() {
    return LightenColor(this.background, 5);
  },
  darkshadowdim: '6px 6px 10px ',
  darkshadow: function() {
    return LightenColor(this.background, -6);
  }
};

var ewwTheme = {
  background: '#050064',
  accent: '#feff33',
  maintext: '#ff2afc',
  timertextactive: '#bfbfbf',
  timertextdeactive: '#575757',
  lightshadowdim: '-6px -6px 10px ',
  lightshadow: function() {
    return LightenColor(this.background, 5);
  },
  darkshadowdim: '6px 6px 10px ',
  darkshadow: function() {
    return LightenColor(this.background, -6);
  }
};
