$("#navTgl").on("click", function(){
    $("#wrap").toggleClass("stop-scroll").toggleClass('dark-color');
});
new Vue({
  el: '#figures',
  data: {
      media: [],
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
              // self.groupingLabels = response.data.grouping.label
              self.groupingDatasets = response.data.grouping
          })
          .catch(function(error) {
              console.log('Failed to load.', error);
          })
  }
})

new Vue({
  el: '#chart',
  data: {
    labels: [],
    datasets:[],
    rankingLabels: [],
    rankingDatasets:[],
    groupingLabels: [],
    groupingDatasets:[],
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      "Access-Control-Allow-Origin": "*",
    }
  },
  methods:{
    displayTrend: function(){
      var ctx = document.getElementById('trend-chart').getContext('2d');
      var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: this.labels,
            datasets: this.datasets
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {  
            y: {
                ticks: {
                  stepSize: 100
                }
              }
          }
        }
      });
    },
    displayRanking: function(){
      var ctx = document.getElementById('ranking-chart').getContext('2d');
      var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: this.rankingLabels,
            datasets: this.rankingDatasets
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          scales: {  
            y: {
              ticks: {
                stepSize: 10
              }
            }
          }
        }
      });
    },
    displayGrouping: function(){
      var ctx = document.getElementById('grouping-chart').getContext('2d');
      var myChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            labels: this.groupingLabels,
            datasets: this.groupingDatasets
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              scaleLabel: {
                  display: true,
                  labelString: 'Age',
              },
              ticks: {
                  stepSize: 10
              },
            },
            y: {
              scaleLabel: {
                display: true,
                labelString: 'Stay Time',
              },
              ticks: {
                stepSize: 10,
                callback: function(value, index, values){
                  return  value +  'min'
                }
              }
            }
          }
        }
      });
    }
  },
  mounted: function(){
    axios.get('https://raw.githubusercontent.com/maunatmt/maunatmt.github.io/main/misc/data.json', self.headers).then(response =>{
      this.datasets = response.data.trend.datasets;
      this.labels = response.data.trend.labels;
      this.rankingLabels = response.data.ranking.labels;
      this.rankingDatasets = response.data.ranking.datasets;
      this.groupingLabels = response.data.grouping.labels;
      this.groupingDatasets = response.data.grouping.datasets;
      this.displayTrend();
      this.displayRanking();
      this.displayGrouping();
    })
  }
});