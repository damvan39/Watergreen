
function convertMiliseconds(miliseconds, format) {
    var days, hours, minutes, seconds, total_hours, total_minutes, total_seconds;
    
    total_seconds = parseInt(Math.floor(miliseconds / 1000));
    total_minutes = parseInt(Math.floor(total_seconds / 60));
    total_hours = parseInt(Math.floor(total_minutes / 60));
    days = parseInt(Math.floor(total_hours / 24));
  
    seconds = parseInt(total_seconds % 60);
    minutes = parseInt(total_minutes % 60);
    hours = parseInt(total_hours % 24);
    
    switch(format) {
      case 's':
          return total_seconds;
      case 'm':
          return total_minutes;
      case 'h':
          return total_hours;
      case 'd':
          return days;
      default:
          return { d: days, h: hours, m: minutes, s: seconds };
    }
  };

async function Init() {
    document.getElementById('myChart').height = $(window).height()/2;
    var ctx = document.getElementById('myChart').getContext('2d');
    var getData = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({query: "{history {id loggedAt data}}"})
    }).then(r => r.json())
    console.log(getData)
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
        
        // The data for our dataset
        data: {
            labels: getData.data.history.map(context => {
                console.log(context)
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
    console.log($(window).height())
}
$( document ).ready(Init)
