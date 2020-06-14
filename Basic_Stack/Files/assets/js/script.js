function setData(url) {
  console.log("starting")
  var xhttp
  xhttp=new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        data = JSON.parse(xhttp.responseText);
        for (var unit in data) {
          unit_d = data[unit]
          if (typeof unit_d == 'object'){
            for (var index in unit_d){
              index_d = unit_d[index]
              query = document.getElementById(unit+index)
              if (query) {
                write = JSON.stringify(index_d["data"])
                document.getElementById(unit+index).innerHTML = write
                document.getElementById("status_"+unit+index).innerHTML = "check_circle"

              }
            }
          }
        }
      }
    }
  xhttp.open("GET", url, true)
  xhttp.send()
  }
  setData("/api/buffer")
  setInterval(function(){ setData("/api/buffer") }, 3000);

// graphs ---------------------------------------------------------------------------------
var xhttp
var resdata = []
var resdate = []
xhttp=new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
// iterate through json object and apply data via element ids that match
    data = JSON.parse(xhttp.responseText);
    console.log(data)
    for (var unit in data) {
      x = data[unit]
      x = x["watert"]
      x = x["1"]
      x =  x["data"]
      if (x != undefined) {
        resdata.push(x)

      }
    }
    for (var unit in data) {
      x = data[unit]
      x = x["time"]
      if (x != undefined){
        x = new Date(x)
        var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        resdate.push(days[x.getDay()])
      }

    }
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: resdate,
          datasets: [{
              label: 'Temperature',
              data: resdata,
              backgroundColor: [
                'rgba(255,255,255,0.2)'
              ],
              borderColor: [
                'rgba(255,255,255,1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
  });
  }
}
xhttp.open("GET", "/api/data_log", true)
xhttp.send()
