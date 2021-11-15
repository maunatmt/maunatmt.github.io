$("#navTgl").on("click", function(){
    $("#wrap").toggleClass("stop-scroll").toggleClass('dark-color');
});
var app = new Vue({
  el: '#app',
  data: {
      media: [],
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
          })
          .catch(function(error) {
              console.log('Failed to load.', error);
          })
  }
})

var margin = {
  top: 30, 
  right: 30, 
  bottom: 30, 
  left: 80
};

var size = {
width: 300 - margin.left - margin.right,
height: 150 - margin.top - margin.bottom
}

var data = [
  {'publishedDate': '2017-01-07','rank': 14},
  {'publishedDate': '2017-01-16','rank': 13},
  {'publishedDate': '2017-01-23','rank': 7},
  {'publishedDate': '2017-01-30','rank': 10}
];

var data2 = [
  {'publishedDate': '2017-01-07','rank': 6},
  {'publishedDate': '2017-01-16','rank': 6},
  {'publishedDate': '2017-01-23','rank': 4},
  {'publishedDate': '2017-01-30','rank': 18}
];

var svg = d3.select("#simple-chart")
.append("svg")
.attr("width", size.width + margin.left + margin.right)
.attr("height", size.height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var xScale = d3.scaleTime()
.domain([new Date(data[0].publishedDate),new Date(data[data.length - 1].publishedDate)])
.range([0,size.width]);

var yScale = d3.scaleLinear()
.domain([1,22])
.range([size.height,0]);

// svg.append("g")
//   .call(
//     d3.axisLeft(yScale)
//       .ticks(5)
//    )
  // .append("text")
  // .attr("text-anchor", "middle")
  // .attr("fill", "black")
  // .attr("x",-50)
  // .attr("y",size.height/2)
  // .attr("font-size", "10pt")
  // .text("Sales");

svg.append("g")
.attr("transform", "translate(0," + size.height + ")")
.call(
  d3.axisBottom(xScale)
    .tickFormat(d3.timeFormat("%m-%d"))
 )
 .append("text")
 .attr("stroke","gray");
var line = d3.line()
  .x(function(d,i) { return xScale(new Date(d.publishedDate)); })
  .y(function(d,i) { return yScale(d.rank); });
svg.append("path")
  .datum(data)
  .attr("d",line)
  .attr("stroke-width", 3)
  .attr("stroke","dodgerblue")
  .attr("fill","none");
svg.append("path")
  .datum(data2)
  .attr("d",line)
  .attr("stroke","gray")
  .attr("fill","none");