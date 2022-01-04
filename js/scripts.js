//  $("#navTgl").on("click", function(){
//     $("#wrap").toggleClass('dark-color');
// });
$(document).ready(function(){
  if(80 < $(this).scrollTop()) {
    $('header').addClass('change-color');
    $('header nav li a').addClass('scroll');
} else {
    $('header').removeClass('change-color');
    $('header nav li a').removeClass('scroll');
}
});
$(document).on('scroll', function(){
  if(80 < $(this).scrollTop()) {
      $('header').addClass('change-color');
      $('header nav li a').addClass('scroll');
  } else {
      $('header').removeClass('change-color');
      $('header nav li a').removeClass('scroll');
  }
});
$(document).ready(function(){
  $("#company-logo").mouseover(function(){
    $(".fa-cube").addClass("logo-animation-hover");
  });
  $("#company-logo").mouseout(function(){
    $(".fa-cube").removeClass("logo-animation-hover");
  });
});
new Vue({
  el: '#wrap',
  data: {
      media: [],
      sales: [],
      labels: [],
      datasets:[],
      salesLabels: [],
      salesDatasets:[],
      rankingLabels: [],
      rankingDatasets:[],
      salesRankingLabels: [],
      salesRankingDatasets:[],
      groupingLabels: [],
      groupingDatasets:[],
      salesGroupingLabels: [],
      salesGroupingDatasets:[],
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
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
              beginAtZero: true,
              stepSize: 100
            }
          }
        }
      });
    },
    displaySalesTrend: function(){
      var ctx = document.getElementById('sales-trend-chart').getContext('2d');
      var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: this.salesLabels,
            datasets: this.salesDatasets
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {  
            y: {
              beginAtZero: true,
              ticks: {
                callback: function(value, index, values){
                  return  value +  '€'
                }
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
            x: {
              ticks: {
                stepSize: 20,
                callback: function(value, index, values){
                  return  value +  '%'
                }
              }
            }
          },
          plugins: {
            legend : {
                     display : false
              }
          }
        }
      });
    },
    displaySalesRanking: function(){
      var ctx = document.getElementById('sales-ranking-chart').getContext('2d');
      var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: this.salesRankingLabels,
            datasets: this.salesRankingDatasets
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          scales: {  
            x: {
              ticks: {
                stepSize: 20,
                callback: function(value, index, values){
                  return  value +  '%'
                }
              }
            }
          },
          plugins: {
            legend : {
                     display : false
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
              title: {
                  display: true,
                  text: 'Age',
              },
              ticks: {
                  stepSize: 10
              },
            },
            y: {
              title: {
                display: true,
                text: 'Stay Time',
              },
              beginAtZero: true,
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
    },
    displaySalesGrouping: function(){
      var ctx = document.getElementById('sales-grouping-chart').getContext('2d');
      var myChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            labels: this.salesGroupingLabels,
            datasets: this.salesGroupingDatasets
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              title: {
                  display: true,
                  text: 'Age',
              },
              ticks: {
                  stepSize: 10
              },
            },
            y: {
              title: {
                display: true,
                text: 'Purchase Amount',
              },
              beginAtZero: true,
              ticks: {
                stepSize: 10,
                callback: function(value, index, values){
                  return  value +  '€'
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
      this.media = response.data.media;
      this.sales = response.data.sales;
      this.labels = response.data.trend.labels;
      this.datasets = response.data.trend.datasets;
      this.salesLabels = response.data.salesTrend.labels;
      this.salesDatasets = response.data.salesTrend.datasets;
      this.rankingLabels = response.data.ranking.labels;
      this.rankingDatasets = response.data.ranking.datasets;
      this.salesRankingLabels = response.data.salesRanking.labels;
      this.salesRankingDatasets = response.data.salesRanking.datasets;
      this.groupingLabels = response.data.grouping.labels;
      this.groupingDatasets = response.data.grouping.datasets;
      this.salesGroupingLabels = response.data.salesGrouping.labels;
      this.salesGroupingDatasets = response.data.salesGrouping.datasets;
      this.displayTrend();
      this.displaySalesTrend();
      this.displayRanking();
      this.displaySalesRanking();
      this.displayGrouping();
      this.displaySalesGrouping();
    })
  }
});