function loadDoc(url, cFunction) {
    var xhttp;
    xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        cFunction(this);
      }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
  }
  function setData(url, id) {
    var xhttp;
    xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        xhttpr = this
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
        console.log(data["watert[0].data"])
      }
    };
    xhttp.open("GET", url, true);
    xhttp.send();

  }
  function mainInit() {
    setData("/api/buffer", ["watert",0,"data"])
    setData("/api/buffer", ["watert",1,"data"])
    setData("/api/buffer", ["airt",0,"data"])
    setData("/api/buffer", ["airh",0,"data"])

  }