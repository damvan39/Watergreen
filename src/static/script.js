
function round(value, precision) {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}
$( document ).ready(async function() {


    document.getElementById('myChart').height = $(window).height()*0.40;
    // document.getElementById('table').setAttribute('data-height',$(window).height()*0.37)
    var ctx = document.getElementById('myChart').getContext('2d');
    var getData = await fetch("graphql", {
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
                return `${d.getDate()}/${d.getMonth() + 1} ${d.getHours()}:${d.getMinutes()}`
            }),
            datasets: [{
                label: 'Temperature',
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
    $('#table').DataTable( {
      responsive:true,
      'pageLength':5,
      data: getData.data.history.map(context => {
              var d = new Date(parseInt(context.loggedAt))
                return {
                    id: context.id.substring(0,7), 
                    loggedAt: `${d.getDate()}/${d.getMonth() + 1} ${d.getHours()}:${d.getMinutes()}`,
                    data: context.data 
                }
    
            }),
      columns: [
        { data: 'data', title:'Temperature' },
        { data: 'loggedAt', title:'loggedAt' },
          { data: 'id', title:"id"},


      ]
  } );

      live()
      setInterval(live, 1500);


})


async function live() {

  document.getElementById('live').firstChild.data = await fetch("graphql", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({query: "{live {data}}"})
}).then(r => r.json()).then(context => {
  return round(context.data.live[0].data, 1)
})


}