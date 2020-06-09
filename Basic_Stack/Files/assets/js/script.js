function setData(url, id) {
  var xhttp
  xhttp=new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      identifier_type = id[0]
      identifier_index = id[1]
      identifier_data = id[2]
      
      data = function() {
        x = JSON.parse(xhttp.responseText);
        x = x[identifier_type]
        x = x[identifier_index]
        x = x[identifier_data]
        return x
      }


  document.getElementById(identifier_type+identifier_index).innerHTML = data()
  document.getElementById("status_"+identifier_type+identifier_index).innerHTML = "check_circle"
      }
    };
    xhttp.open("GET", url, true);
    xhttp.send();

  }
function mainInit() {
    console.log("retriving data")
    setData("/api/buffer", ["watert",0,"data"])
    setData("/api/buffer", ["watert",1,"data"])
    setData("/api/buffer", ["airt",0,"data"])
    setData("/api/buffer", ["airh",0,"data"])

}

function graphData(url, id) {
  identifier_type = id[0]
  identifier_index = id[1]
  identifier_data = id[2]
  var xhttp;
  xhttp=new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      x = JSON.parse(xhttp.responseText);
      var res = []
      for (const element of x) {
        y = element[identifier_type]
        y = y[identifier_index]
        y = y[identifier_data]
        res.push(y)
      }
    }
  };
  console.log(xhttp.open("GET", url, true));
  console.log(xhttp.send());

  
}

data = graphData("/api/data_log", ["watert",0,"data"])
console.log(data)
setInterval(mainInit, 2000)

