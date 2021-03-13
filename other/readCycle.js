function readJsonData()
{
fetch("cycle.json", {cache: "reload"})
    .then(response => response.json())
    .then(data => {
      document.getElementById("cycleDayOutput").innerHTML = data.today;

      document.getElementById("cycleDayToday").innerHTML = data.today;
      document.getElementById("cycleDayTomorrow").innerHTML = data.tomorrow;
      document.getElementById("cycleDayNextDay").innerHTML = data.nextDay;
    })
  setTimeout(readJsonData, 1000);
}

readJsonData();
