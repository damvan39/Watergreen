
async function Init() {
    document.getElementById('myChart').height = $(window).height()/2;
    var ctx = document.getElementById('myChart').getContext('2d');
    var getData = await fetch(window.location.href.substring(0, window.location.href.length -1 ) + ":4000/graphql", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({query: "{history {id loggedAt data}}"})
    }).then(r => r.json())
   

    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
        
        // The data for our dataset
        data: {
            labels: getData.data.history.map(context => {
                var d = new Date(parseInt(context.loggedAt))
                return `${d.getDate()} / ${d.getMonth() + 1}`
            }),
            datasets: [{
                label: 'My First dataset',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: getData.data.history.map(context => context.data)
            }]
        },
    
        // Configuration options go here
        options: {
            responsive: true,
            maintainAspectRatio:false,
        }
    });
    $('#table').bootstrapTable({
        pagination: true,
        search: true,
        columns: [{
          field: 'id',
          title: 'Measurment ID'
        }, {
          field: 'loggedAt',
          title: 'Time Logged'
        }, {
          field: 'data',
          title: 'Sensor data'
        }],
        data: getData.data.history.map(context => {
            return {
                id: context.id, 
                loggedAt: new Date(parseInt(context.loggedAt)).getDate() + " / " + new Date(parseInt(context.loggedAt)).getMonth(),
                data: context.data 
            }

        })
      })
      live()
      setInterval(live, 3000);

}
$( document ).ready(Init) 

async function live() {

  document.getElementById('live').firstChild.data = await fetch(window.location.href.substring(0, window.location.href.length -1 ) + ":4000/graphql", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({query: "{live {data}}"})
}).then(r => r.json()).then(context => {
  return Math.round(context.data.live[0].data)
})


}