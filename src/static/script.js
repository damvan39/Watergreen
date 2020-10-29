
function onLoad () {
    document.getElementById('myChart').height = $(window).height()/2;
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
        
        // responsiveAnimationDuration: 20,
        // maintainAspectRatio:false,
    
        // The data for our dataset
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'My First dataset',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [0, 10, 5, 2, 20, 30, 45]
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
