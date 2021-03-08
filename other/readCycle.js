function readJsonData()
{
  fetch("/cycle.json")
    .then(response => response.json())
    .then(data => {
      document.getElementById("cycleDayOutput").innerHTML = data.day;
    })
  setTimeout(readJsonData, 100);
}

readJsonData();
