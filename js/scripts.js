$("#navTgl").on("click", function(){
    $("#wrap").toggleClass("stop-scroll").toggleClass('dark-color');
});
new Vue({
  el: '#app1',
  data: {
      media: [],
      social: [],
      trend: {},
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
    labels: [],
    datasets:[]
  },
  methods:{
    displayGraph: function(){
      var ctx = document.getElementById('myChart').getContext('2d');
      var myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: this.labels,
          datasets: this.datasets
        }
      });
    }
  },
  mounted: function(){
    axios.get('https://raw.githubusercontent.com/maunatmt/maunatmt.github.io/main/misc/data.json').then(response =>{
      this.datasets = response.data.trend.datasets;
      this.labels = response.data.trend.labels;
      this.displayGraph();
    })
  }
});