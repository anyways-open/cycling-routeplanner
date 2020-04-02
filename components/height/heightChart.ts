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
    }
}