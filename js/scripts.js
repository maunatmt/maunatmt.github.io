$("#navTgl").on("click", function(){
    $("#wrap").toggleClass("stop-scroll").toggleClass('dark-color');
});
new Vue({
  el: '#app1',
  data: {
      media: [],
      social: [],
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
      }
  },
  mounted: function() {
      var self = this;
      axios
          .get('https://raw.githubusercontent.com/maunatmt/maunatmt.github.io/main/misc/data.json', self.headers)
          .then(function(response) {
              self.media = response.data.media;
              self.social = response.data.social;
          })
          .catch(function(error) {
              console.log('Failed to load.', error);
          })
  }
})

var app = new Vue({
  el: '#trend',
  data: {
    trend: {
      labels: ['Sep,2021', 'Oct,2021', 'Nov,2021'],
      datasets: [{
          label: 'Twitter',
          data: [190, 220, 160],
          borderColor: "rgb(28, 133, 224)",
          lineTension: 0,
          fill: false
      }, {
          label: 'Facebook',
          data: [270, 250, 280],
          borderColor: "rgb(46, 63, 121)",
          lineTension: 0,
          fill: false
      }, {
        label: 'Instagram',
        data: [630, 560, 550],
        borderColor: "rgb(165, 0, 137)",
        lineTension: 0,
        fill: false
      }, {
        label: 'Youtube',
        data: [70, 90, 140],
        borderColor: "rgb(235, 0, 6)",
        lineTension: 0,
        fill: false
      }]
    }
  },
  created () {
    axios
      .get('https://raw.githubusercontent.com/maunatmt/maunatmt.github.io/main/misc/data.json')
      .then(response => {
        // this.trend = response.data.trend;
      })
      .catch(error => {
      console.log(error)
    })
  },
  mounted: function(){
    var ctx = document.getElementById('myChart').getContext('2d');
    var options = {
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }]
      }
  };
    var data = trend;
    var myChart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: options
    });
  }
});