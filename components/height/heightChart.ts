import * as d3 from 'd3';
import * as turf from '@turf/turf';

export class HeightChart {
    elementId: string;

    constructor(elementId: string) {
        this.elementId = elementId;
    }

    showRoute(route: any) {

        var data: { pos: number, ele: number }[] = [];    

        var pos: number = 0;
        var previous: number[] = null;
        route.forEach(f => {
            if (f.geometry.type == "LineString") {
                for (var c = 0; c < f.geometry.coordinates.length; c++) {
                    var coordinate = f.geometry.coordinates[c];

                    data.push({
                        pos: pos,
                        ele: f.geometry.coordinates[0][2]
                    });

                    if (previous != null) {
                        var dist = turf.distance(previous, coordinate) * 1000;
                        pos += dist;
                    }
                    previous = coordinate;
                }

                pos = Number(f.properties.distance);
            }
        });
        
        // clear chart.
        var svg = d3.select("#" + this.elementId)
        svg.selectAll("*").remove();

        if (data.length == 0) return;

        var length = data[data.length - 1].pos;
        var scaleX = 1;
        if (length > 2000) {
            scaleX = 1000;
        }
        var ele = data[data.length - 1].ele;

        // set the dimensions and margins of the graph
        var margin = { top: 20, right: 0, bottom: 20, left: 40 };
        var width: number = 500 - margin.left - margin.right;
        var height: number = 300 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        var totalWidth: number = width + margin.left + margin.right;
        var totalHeight: number = height + margin.top + margin.bottom;

        svg.attr("width", totalWidth)
            .attr("height", totalHeight)
            .attr("viewBox", "0 0 " + totalWidth + " " + totalHeight + "")
            .append("g")
            .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");

        var x = d3.scaleLinear()
            .domain(d3.extent(data, d => d.pos / scaleX))
            .range([margin.left, width - margin.right]);

        var xAxis = g => g
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x).ticks(width / 40).tickSizeOuter(0))
            .call(g => g.select(".tick:last-of-type text").clone()
                .attr("y", -9)
                .attr("text-anchor", "start")
                .attr("font-weight", "bold")
                .text("Km"));
        svg.append("g")
            .call(xAxis);


        var y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.ele)]).nice()
            .range([height - margin.bottom, margin.top])

        var yAxis = g => g
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y).ticks(height / 20).tickPadding(5))
            .call(g => g.select(".tick:last-of-type text").clone()
                .attr("x", 3)
                .attr("text-anchor", "start")
                .attr("font-weight", "bold")
                .text("(m)"));
        svg.append("g")
            .call(yAxis);

        var line = d3.line<{ pos: number, ele: number }>()
            .defined(d => !isNaN(d.ele))
            .x(d => x(d.pos / scaleX))
            .y(d => y(d.ele));

        svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "rgb(134, 154, 184)")
            .attr("stroke-width", 1.5)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("d", line);   


        // // source: https://bl.ocks.org/larsenmtl/e3b8b7c2ca4787f77d78f58d41c3da91
        // var mouseG = svg.append("g")
        //     .attr("class", "mouse-over-effects");
      
        //   mouseG.append("path") // this is the black vertical line to follow mouse
        //     .attr("class", "mouse-line")
        //     .style("stroke", "black")
        //     .style("stroke-width", "1px")
        //     .style("opacity", "0");
            
        //   var lines = document.getElementsByClassName('line');
      
        //   var mousePerLine = mouseG.selectAll('.mouse-per-line')
        //     .data(data)
        //     .enter()
        //     .append("g")
        //     .attr("class", "mouse-per-line");
      
        //   mousePerLine.append("circle")
        //     .attr("r", 7)
        //     .style("stroke", "black")
        //     .style("fill", "none")
        //     .style("stroke-width", "1px")
        //     .style("opacity", "0");
      
        //   mousePerLine.append("text")
        //     .attr("transform", "translate(10,3)");
      
        //   mouseG.append('svg:rect') // append a rect to catch mouse movements on canvas
        //     .attr('width', width) // can't catch mouse events on a g element
        //     .attr('height', height)
        //     .attr('fill', 'none')
        //     .attr('pointer-events', 'all')
        //     .on('mouseout', function() { // on mouse out hide line, circles and text
        //       d3.select(".mouse-line")
        //         .style("opacity", "0");
        //       d3.selectAll(".mouse-per-line circle")
        //         .style("opacity", "0");
        //       d3.selectAll(".mouse-per-line text")
        //         .style("opacity", "0");
        //     })
        //     .on('mouseover', function() { // on mouse in show line, circles and text
        //       d3.select(".mouse-line")
        //         .style("opacity", "1");
        //       d3.selectAll(".mouse-per-line circle")
        //         .style("opacity", "1");
        //       d3.selectAll(".mouse-per-line text")
        //         .style("opacity", "1");
        //     })
        //     .on('mousemove', function(e) { // mouse moving over canvas
        //       var mouse = d3.mouse(e);
        //       d3.select(".mouse-line")
        //         .attr("d", function() {
        //           var d = "M" + mouse[0] + "," + height;
        //           d += " " + mouse[0] + "," + 0;
        //           return d;
        //         });
      
        //       d3.selectAll(".mouse-per-line")
        //         .attr("transform", function(d, i) {
        //           console.log(width/mouse[0])
        //           var xDate = x.invert(mouse[0]),
        //               bisect = d3.bisector(function(d) { return d.date; }).right;
        //               idx = bisect(d.values, xDate);
                  
        //           var beginning = 0,
        //               end = lines[i].getTotalLength(),
        //               target = null;
      
        //           while (true){
        //             target = Math.floor((beginning + end) / 2);
        //             pos = lines[i].getPointAtLength(target);
        //             if ((target === end || target === beginning) && pos.x !== mouse[0]) {
        //                 break;
        //             }
        //             if (pos.x > mouse[0])      end = target;
        //             else if (pos.x < mouse[0]) beginning = target;
        //             else break; //position found
        //           }
                  
        //           d3.select(this).select('text')
        //             .text(y.invert(pos.y).toFixed(2));
                    
        //           return "translate(" + mouse[0] + "," + pos.y +")";
        //         });
        //     });
        //     .on('mouseover', function() { // on mouse in show line, circles and text
        //       d3.select(".mouse-line")
        //         .style("opacity", "1");
        //       d3.selectAll(".mouse-per-line circle")
        //         .style("opacity", "1");
        //       d3.selectAll(".mouse-per-line text")
        //         .style("opacity", "1");
        //     })
        //     .on('mousemove', function(e) { // mouse moving over canvas
        //       var mouse = d3.mouse(e);
        //       d3.select(".mouse-line")
        //         .attr("d", function() {
        //           var d = "M" + mouse[0] + "," + height;
        //           d += " " + mouse[0] + "," + 0;
        //           return d;
        //         });
      
        //       d3.selectAll(".mouse-per-line")
        //         .attr("transform", function(d, i) {
        //           console.log(width/mouse[0])
        //           var xDate = x.invert(mouse[0]),
        //               bisect = d3.bisector(function(d) { return d.date; }).right;
        //               idx = bisect(d.values, xDate);
                  
        //           var beginning = 0,
        //               end = lines[i].getTotalLength(),
        //               target = null;
      
        //           while (true){
        //             target = Math.floor((beginning + end) / 2);
        //             pos = lines[i].getPointAtLength(target);
        //             if ((target === end || target === beginning) && pos.x !== mouse[0]) {
        //                 break;
        //             }
        //             if (pos.x > mouse[0])      end = target;
        //             else if (pos.x < mouse[0]) beginning = target;
        //             else break; //position found
        //           }
                  
        //           d3.select(this).select('text')
        //             .text(y.invert(pos.y).toFixed(2));
                    
        //           return "translate(" + mouse[0] + "," + pos.y +")";
        //         });
        //     });
    }
}