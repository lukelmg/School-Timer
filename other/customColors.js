function customColors(currentColor, id) {
  document.getElementById('themeSelector').value = 'custom'
  currentColors[id] = currentColor;
  setAllElementColors();
}

function changeColorPicker() {
  var colorPicker = document.getElementById('colorPicker');
  var element = document.getElementById('custonElement').value;
  colorPicker.value = currentColors[element];
}
