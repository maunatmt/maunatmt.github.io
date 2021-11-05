var app = new Vue({
  el: '#app',
  data: {
      vtuber: [],
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
          .get('./misc/data.json', self.headers)
          .then(function(response) {
              self.vtuber = response.data.vtuber;
          })
          .catch(function(error) {
              console.log('Failed to load.', error);
          })
  }
})

// 1. データの準備
var dataset = [
  [5, 20],
  [480, 90],
  [250, 50],
  [100, 33],
  [330, 95],
  [410, 12],
  [475, 44],
  [25, 67],
  [85, 21],
  [220, 88]
];

var width = 400; // グラフの幅
var height = 300; // グラフの高さ
var margin = { "top": 30, "bottom": 60, "right": 30, "left": 60 };

// 2. SVG領域の設定
var svg = d3.select("#simple-chart").append("svg").attr("width", width).attr("height", height);

// 3. 軸スケールの設定
var xScale = d3.scaleLinear()
  .domain([0, d3.max(dataset, function(d) { return d[0]; })])
  .range([margin.left, width - margin.right]);

var yScale = d3.scaleLinear()
  .domain([0, d3.max(dataset, function(d) { return d[1]; })])
  .range([height - margin.bottom, margin.top]);

// 4. 軸の表示
var axisx = d3.axisBottom(xScale).ticks(5);
var axisy = d3.axisLeft(yScale).ticks(5);

svg.append("g")
  .attr("transform", "translate(" + 0 + "," + (height - margin.bottom) + ")")
  .call(axisx)
  .append("text")
  .attr("fill", "black")
  .attr("x", (width - margin.left - margin.right) / 2 + margin.left)
  .attr("y", 35)
  .attr("text-anchor", "middle")
  .attr("font-size", "10pt")
  .attr("font-weight", "bold")
  .text("X Label");

svg.append("g")
  .attr("transform", "translate(" + margin.left + "," + 0 + ")")
  .call(axisy)
  .append("text")
  .attr("fill", "black")
  .attr("x", -(height - margin.top - margin.bottom) / 2 - margin.top)
  .attr("y", -35)
  .attr("transform", "rotate(-90)")
  .attr("text-anchor", "middle")
  .attr("font-weight", "bold")
  .attr("font-size", "10pt")
  .text("Y Label");

// 5. プロットの表示
svg.append("g")
  .selectAll("circle")
  .data(dataset)
  .enter()
  .append("circle")
  .attr("cx", function(d) { return xScale(d[0]); })
  .attr("cy", function(d) { return yScale(d[1]); })
  .attr("fill", "steelblue")
  .attr("r", 4);