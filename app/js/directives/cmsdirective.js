'use strict';
angular.module('fantasyApp.directives.cmsdirective', [] )
.directive('ngBargraph', [function($scope){
  // define constants and helpers used for the directive

  return {
      //We restrict its use to an element
      //as usually  <bars-chart> is semantically
      //more understandable
      restrict: 'A',
      //this is important,
      //we don't want to overwrite our directive declaration
      //in the HTML mark-up
      replace: false,
      
      //our data source would be an array
      //passed thru chart-data attribute
      scope: { 
        datajson: '=',
        xaxisName: '=',
        xaxisPos: '=',
        yaxisName: '=',
        yaxisPos: '=',
       

      },
      link: function (scope, element, attrs) {
          // The d3.js code for generation of bar graph. further reading should be done from http://d3js.org/
                          var margin = {top: 20, right: 20, bottom: 30, left: 40},
                              width = 960 - margin.left - margin.right,
                              height = 500 - margin.top - margin.bottom;

                          var formatPercent = d3.format(scope.d3Format); // formatting via angular variable

                          var x = d3.scale.ordinal()
                                 .rangeRoundBands([0, width], .1);

                         var y = d3.scale.linear()
                                 .range([height, 0]);

                         var xAxis = d3.svg.axis()
                                 .scale(x)
                                 .orient("bottom");

                         var yAxis = d3.svg.axis()
                                 .scale(y)
                                 .orient("left")
                                 .tickFormat(formatPercent);

                         var svg = d3.select("#graphContainer").append("svg") // selecting the DOM element by d3.js 
                                                                           // - getting from Angular context   
                             .attr("width", width + margin.left + margin.right)
                             .attr("height", height + margin.top + margin.bottom)
                             .append("g")
                                 .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                        var data_chart = scope.datajson;

                            x.domain(data_chart.map(function(d) { return d.bob; }));
                            y.domain([0, d3.max(data_chart, function(d) { return d.num; })]);

                            svg.append("g")
                                .attr("class", "x axis")
                                .attr("transform", "translate(0," + height + ")")
                                .call(xAxis)
                                .append("text")
                                    .attr("x", scope.xaxisPos/2)
                                    .attr("dx", "-1em")
                                    .style("text-anchor", "end")
                                    .text(scope.xaxisName);
                            // x axis legend setting from angular variables
                            svg.append("g")
                                .attr("class", "y axis")
                                .call(yAxis)
                                .append("text")
                                    .attr("transform", "rotate(-90)")
                                    .attr("y", scope.yaxisPos/2)
                                    .attr("dy", ".71em")
                                    .style("text-anchor", "end")
                                    .text(scope.yaxisName);
                            // y axis legend setting from angular variables
                            svg.selectAll(".bar")
                                .data(data_chart)
                                .enter().append("rect")
                                .attr("class", "bar")
                                .attr("x", function(d) { return x(d.bob)})
                                .attr("width", x.rangeBand())
                                .attr("y", function(d) { return height - d.num ; })
                                .attr("height", function(d) { return (d.num); })

        }
    } //return
}]); // directive