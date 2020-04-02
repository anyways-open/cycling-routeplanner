import * as d3 from 'd3';

export class HeightChart {
    elementId: string;

    constructor(elementId: string) {
        this.elementId = elementId;
    }

    showRoute(route: any) {

        // set the dimensions and margins of the graph
        var margin = { top: 20, right: 30, bottom: 20, left: 20 },
            width = 460 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        var totalWidth: number = width + margin.left + margin.right;
        var totalHeight: number = height + margin.top + margin.bottom;
        var svg = d3.select("#" + this.elementId)
            .attr("width", totalWidth)
            .attr("height", totalHeight)
            .attr("viewBox", "0 0 " + totalWidth + " " + totalHeight + "")
            .append("g")
            .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");

        var x = d3.scaleUtc()
            .domain(d3.extent(this.data, d => d.date))
            .range([margin.left, width - margin.right]);
        console.log(x);

        var xAxis = g => g
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
        svg.append("g")
            .call(xAxis);

        var y = d3.scaleLinear()
            .domain([0, d3.max(this.data, d => d.value)]).nice()
            .range([height - margin.bottom, margin.top])

        var yAxis = g => g
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y))
            .call(g => g.select(".domain").remove())
            .call(g => g.select(".tick:last-of-type text").clone()
                .attr("x", 3)
                .attr("text-anchor", "start")
                .attr("font-weight", "bold")
                .text("€ Close"));
        svg.append("g")
            .call(yAxis);

        var line = d3.line<{date: Date, value: number}>()
            .defined(d => !isNaN(d.value))
            .x(d => x(d.date))
            .y(d => y(d.value));

        svg.append("path")
            .datum(this.data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("d", line);   
    }

    data: {date: Date, value: number}[] = [
        {
            "date": new Date("2007-04-23T00:00:00.000Z"),
            "value": 93.24
        },
        {
            "date": new Date("2007-04-24T00:00:00.000Z"),
            "value": 95.35
        },
        {
            "date": new Date("2007-04-25T00:00:00.000Z"),
            "value": 98.84
        },
        {
            "date": new Date("2007-04-26T00:00:00.000Z"),
            "value": 99.92
        },
        {
            "date": new Date("2007-04-29T00:00:00.000Z"),
            "value": 99.8
        },
        {
            "date": new Date("2007-05-01T00:00:00.000Z"),
            "value": 99.47
        },
        {
            "date": new Date("2007-05-02T00:00:00.000Z"),
            "value": 100.39
        },
        {
            "date": new Date("2007-05-03T00:00:00.000Z"),
            "value": 100.4
        },
        {
            "date": new Date("2007-05-04T00:00:00.000Z"),
            "value": 100.81
        },
        {
            "date": new Date("2007-05-07T00:00:00.000Z"),
            "value": 103.92
        },
        {
            "date": new Date("2007-05-08T00:00:00.000Z"),
            "value": 105.06
        },
        {
            "date": new Date("2007-05-09T00:00:00.000Z"),
            "value": 106.88
        },
        {
            "date": new Date("2007-05-09T00:00:00.000Z"),
            "value": 107.34
        },
        {
            "date": new Date("2007-05-10T00:00:00.000Z"),
            "value": 108.74
        },
        {
            "date": new Date("2007-05-13T00:00:00.000Z"),
            "value": 109.36
        },
        {
            "date": new Date("2007-05-14T00:00:00.000Z"),
            "value": 107.52
        },
        {
            "date": new Date("2007-05-15T00:00:00.000Z"),
            "value": 107.34
        },
        {
            "date": new Date("2007-05-16T00:00:00.000Z"),
            "value": 109.44
        },
        {
            "date": new Date("2007-05-17T00:00:00.000Z"),
            "value": 110.02
        },
        {
            "date": new Date("2007-05-20T00:00:00.000Z"),
            "value": 111.98
        },
        {
            "date": new Date("2007-05-21T00:00:00.000Z"),
            "value": 113.54
        },
        {
            "date": new Date("2007-05-22T00:00:00.000Z"),
            "value": 112.89
        },
        {
            "date": new Date("2007-05-23T00:00:00.000Z"),
            "value": 110.69
        },
        {
            "date": new Date("2007-05-24T00:00:00.000Z"),
            "value": 113.62
        },
        {
            "date": new Date("2007-05-28T00:00:00.000Z"),
            "value": 114.35
        },
        {
            "date": new Date("2007-05-29T00:00:00.000Z"),
            "value": 118.77
        },
        {
            "date": new Date("2007-05-30T00:00:00.000Z"),
            "value": 121.19
        },
        {
            "date": new Date("2007-06-01T00:00:00.000Z"),
            "value": 118.4
        },
        {
            "date": new Date("2007-06-04T00:00:00.000Z"),
            "value": 121.33
        },
        {
            "date": new Date("2007-06-05T00:00:00.000Z"),
            "value": 122.67
        },
        {
            "date": new Date("2007-06-06T00:00:00.000Z"),
            "value": 123.64
        },
        {
            "date": new Date("2007-06-07T00:00:00.000Z"),
            "value": 124.07
        },
        {
            "date": new Date("2007-06-08T00:00:00.000Z"),
            "value": 124.49
        },
        {
            "date": new Date("2007-06-10T00:00:00.000Z"),
            "value": 120.19
        },
        {
            "date": new Date("2007-06-11T00:00:00.000Z"),
            "value": 120.38
        },
        {
            "date": new Date("2007-06-12T00:00:00.000Z"),
            "value": 117.5
        },
        {
            "date": new Date("2007-06-13T00:00:00.000Z"),
            "value": 118.75
        },
        {
            "date": new Date("2007-06-14T00:00:00.000Z"),
            "value": 120.5
        },
        {
            "date": new Date("2007-06-17T00:00:00.000Z"),
            "value": 125.09
        },
        {
            "date": new Date("2007-06-18T00:00:00.000Z"),
            "value": 123.66
        },
        {
            "date": new Date("2007-06-19T00:00:00.000Z"),
            "value": 121.55
        },
        {
            "date": new Date("2007-06-20T00:00:00.000Z"),
            "value": 123.9
        },
        {
            "date": new Date("2007-06-21T00:00:00.000Z"),
            "value": 123
        },
        {
            "date": new Date("2007-06-24T00:00:00.000Z"),
            "value": 122.34
        },
        {
            "date": new Date("2007-06-25T00:00:00.000Z"),
            "value": 119.65
        },
        {
            "date": new Date("2007-06-26T00:00:00.000Z"),
            "value": 121.89
        },
        {
            "date": new Date("2007-06-27T00:00:00.000Z"),
            "value": 120.56
        },
        {
            "date": new Date("2007-06-28T00:00:00.000Z"),
            "value": 122.04
        },
        {
            "date": new Date("2007-07-02T00:00:00.000Z"),
            "value": 121.26
        },
        {
            "date": new Date("2007-07-03T00:00:00.000Z"),
            "value": 127.17
        },
        {
            "date": new Date("2007-07-05T00:00:00.000Z"),
            "value": 132.75
        },
        {
            "date": new Date("2007-07-06T00:00:00.000Z"),
            "value": 132.3
        },
        {
            "date": new Date("2007-07-09T00:00:00.000Z"),
            "value": 130.33
        },
        {
            "date": new Date("2007-07-09T00:00:00.000Z"),
            "value": 132.35
        },
        {
            "date": new Date("2007-07-10T00:00:00.000Z"),
            "value": 132.39
        },
        {
            "date": new Date("2007-07-11T00:00:00.000Z"),
            "value": 134.07
        },
        {
            "date": new Date("2007-07-12T00:00:00.000Z"),
            "value": 137.73
        },
        {
            "date": new Date("2007-07-15T00:00:00.000Z"),
            "value": 138.1
        },
        {
            "date": new Date("2007-07-16T00:00:00.000Z"),
            "value": 138.91
        },
        {
            "date": new Date("2007-07-17T00:00:00.000Z"),
            "value": 138.12
        },
        {
            "date": new Date("2007-07-18T00:00:00.000Z"),
            "value": 140
        },
        {
            "date": new Date("2007-07-19T00:00:00.000Z"),
            "value": 143.75
        },
        {
            "date": new Date("2007-07-22T00:00:00.000Z"),
            "value": 143.7
        },
        {
            "date": new Date("2007-07-23T00:00:00.000Z"),
            "value": 134.89
        },
        {
            "date": new Date("2007-07-24T00:00:00.000Z"),
            "value": 137.26
        },
        {
            "date": new Date("2007-07-25T00:00:00.000Z"),
            "value": 146
        },
        {
            "date": new Date("2007-07-26T00:00:00.000Z"),
            "value": 143.85
        },
        {
            "date": new Date("2007-07-29T00:00:00.000Z"),
            "value": 141.43
        },
        {
            "date": new Date("2007-07-30T00:00:00.000Z"),
            "value": 131.76
        },
        {
            "date": new Date("2007-08-01T00:00:00.000Z"),
            "value": 135
        },
        {
            "date": new Date("2007-08-02T00:00:00.000Z"),
            "value": 136.49
        },
        {
            "date": new Date("2007-08-03T00:00:00.000Z"),
            "value": 131.85
        },
        {
            "date": new Date("2007-08-06T00:00:00.000Z"),
            "value": 135.25
        },
        {
            "date": new Date("2007-08-07T00:00:00.000Z"),
            "value": 135.03
        },
        {
            "date": new Date("2007-08-08T00:00:00.000Z"),
            "value": 134.01
        },
        {
            "date": new Date("2007-08-09T00:00:00.000Z"),
            "value": 126.39
        },
        {
            "date": new Date("2007-08-09T00:00:00.000Z"),
            "value": 125
        },
        {
            "date": new Date("2007-08-12T00:00:00.000Z"),
            "value": 127.79
        },
        {
            "date": new Date("2007-08-13T00:00:00.000Z"),
            "value": 124.03
        },
        {
            "date": new Date("2007-08-14T00:00:00.000Z"),
            "value": 119.9
        },
        {
            "date": new Date("2007-08-15T00:00:00.000Z"),
            "value": 117.05
        },
        {
            "date": new Date("2007-08-16T00:00:00.000Z"),
            "value": 122.06
        },
        {
            "date": new Date("2007-08-19T00:00:00.000Z"),
            "value": 122.22
        },
        {
            "date": new Date("2007-08-20T00:00:00.000Z"),
            "value": 127.57
        },
        {
            "date": new Date("2007-08-21T00:00:00.000Z"),
            "value": 132.51
        },
        {
            "date": new Date("2007-08-22T00:00:00.000Z"),
            "value": 131.07
        },
        {
            "date": new Date("2007-08-23T00:00:00.000Z"),
            "value": 135.3
        },
        {
            "date": new Date("2007-08-26T00:00:00.000Z"),
            "value": 132.25
        },
        {
            "date": new Date("2007-08-27T00:00:00.000Z"),
            "value": 126.82
        },
        {
            "date": new Date("2007-08-28T00:00:00.000Z"),
            "value": 134.08
        },
        {
            "date": new Date("2007-08-29T00:00:00.000Z"),
            "value": 136.25
        },
        {
            "date": new Date("2007-08-30T00:00:00.000Z"),
            "value": 138.48
        },
        {
            "date": new Date("2007-09-04T00:00:00.000Z"),
            "value": 144.16
        },
        {
            "date": new Date("2007-09-05T00:00:00.000Z"),
            "value": 136.76
        },
        {
            "date": new Date("2007-09-06T00:00:00.000Z"),
            "value": 135.01
        },
        {
            "date": new Date("2007-09-07T00:00:00.000Z"),
            "value": 131.77
        },
        {
            "date": new Date("2007-09-09T00:00:00.000Z"),
            "value": 136.71
        },
        {
            "date": new Date("2007-09-10T00:00:00.000Z"),
            "value": 135.49
        },
        {
            "date": new Date("2007-09-11T00:00:00.000Z"),
            "value": 136.85
        },
        {
            "date": new Date("2007-09-12T00:00:00.000Z"),
            "value": 137.2
        },
        {
            "date": new Date("2007-09-13T00:00:00.000Z"),
            "value": 138.81
        },
        {
            "date": new Date("2007-09-16T00:00:00.000Z"),
            "value": 138.41
        },
        {
            "date": new Date("2007-09-17T00:00:00.000Z"),
            "value": 140.92
        },
        {
            "date": new Date("2007-09-18T00:00:00.000Z"),
            "value": 140.77
        },
        {
            "date": new Date("2007-09-19T00:00:00.000Z"),
            "value": 140.31
        },
        {
            "date": new Date("2007-09-20T00:00:00.000Z"),
            "value": 144.15
        },
        {
            "date": new Date("2007-09-23T00:00:00.000Z"),
            "value": 148.28
        },
        {
            "date": new Date("2007-09-24T00:00:00.000Z"),
            "value": 153.18
        },
        {
            "date": new Date("2007-09-25T00:00:00.000Z"),
            "value": 152.77
        },
        {
            "date": new Date("2007-09-26T00:00:00.000Z"),
            "value": 154.5
        },
        {
            "date": new Date("2007-09-27T00:00:00.000Z"),
            "value": 153.47
        },
        {
            "date": new Date("2007-10-01T00:00:00.000Z"),
            "value": 156.34
        },
        {
            "date": new Date("2007-10-02T00:00:00.000Z"),
            "value": 158.45
        },
        {
            "date": new Date("2007-10-03T00:00:00.000Z"),
            "value": 157.92
        },
        {
            "date": new Date("2007-10-04T00:00:00.000Z"),
            "value": 156.24
        },
        {
            "date": new Date("2007-10-05T00:00:00.000Z"),
            "value": 161.45
        },
        {
            "date": new Date("2007-10-08T00:00:00.000Z"),
            "value": 167.91
        },
        {
            "date": new Date("2007-10-09T00:00:00.000Z"),
            "value": 167.86
        },
        {
            "date": new Date("2007-10-09T00:00:00.000Z"),
            "value": 166.79
        },
        {
            "date": new Date("2007-10-10T00:00:00.000Z"),
            "value": 162.23
        },
        {
            "date": new Date("2007-10-11T00:00:00.000Z"),
            "value": 167.25
        },
        {
            "date": new Date("2007-10-14T00:00:00.000Z"),
            "value": 166.98
        },
        {
            "date": new Date("2007-10-15T00:00:00.000Z"),
            "value": 169.58
        },
        {
            "date": new Date("2007-10-16T00:00:00.000Z"),
            "value": 172.75
        },
        {
            "date": new Date("2007-10-17T00:00:00.000Z"),
            "value": 173.5
        },
        {
            "date": new Date("2007-10-18T00:00:00.000Z"),
            "value": 170.42
        },
        {
            "date": new Date("2007-10-21T00:00:00.000Z"),
            "value": 174.36
        },
        {
            "date": new Date("2007-10-22T00:00:00.000Z"),
            "value": 186.16
        },
        {
            "date": new Date("2007-10-23T00:00:00.000Z"),
            "value": 185.93
        },
        {
            "date": new Date("2007-10-24T00:00:00.000Z"),
            "value": 182.78
        },
        {
            "date": new Date("2007-10-25T00:00:00.000Z"),
            "value": 184.7
        },
        {
            "date": new Date("2007-10-28T00:00:00.000Z"),
            "value": 185.09
        },
        {
            "date": new Date("2007-10-29T00:00:00.000Z"),
            "value": 187
        },
        {
            "date": new Date("2007-10-30T00:00:00.000Z"),
            "value": 189.95
        },
        {
            "date": new Date("2007-11-01T00:00:00.000Z"),
            "value": 187.44
        },
        {
            "date": new Date("2007-11-02T00:00:00.000Z"),
            "value": 187.87
        },
        {
            "date": new Date("2007-11-05T00:00:00.000Z"),
            "value": 186.18
        },
        {
            "date": new Date("2007-11-06T00:00:00.000Z"),
            "value": 191.79
        },
        {
            "date": new Date("2007-11-07T00:00:00.000Z"),
            "value": 186.3
        },
        {
            "date": new Date("2007-11-08T00:00:00.000Z"),
            "value": 175.47
        },
        {
            "date": new Date("2007-11-09T00:00:00.000Z"),
            "value": 165.37
        },
        {
            "date": new Date("2007-11-11T00:00:00.000Z"),
            "value": 153.76
        },
        {
            "date": new Date("2007-11-12T00:00:00.000Z"),
            "value": 169.96
        },
        {
            "date": new Date("2007-11-13T00:00:00.000Z"),
            "value": 166.11
        },
        {
            "date": new Date("2007-11-14T00:00:00.000Z"),
            "value": 164.3
        },
        {
            "date": new Date("2007-11-15T00:00:00.000Z"),
            "value": 166.39
        },
        {
            "date": new Date("2007-11-18T00:00:00.000Z"),
            "value": 163.95
        },
        {
            "date": new Date("2007-11-19T00:00:00.000Z"),
            "value": 168.85
        },
        {
            "date": new Date("2007-11-20T00:00:00.000Z"),
            "value": 168.46
        },
        {
            "date": new Date("2007-11-22T00:00:00.000Z"),
            "value": 171.54
        },
        {
            "date": new Date("2007-11-25T00:00:00.000Z"),
            "value": 172.54
        },
        {
            "date": new Date("2007-11-26T00:00:00.000Z"),
            "value": 174.81
        },
        {
            "date": new Date("2007-11-27T00:00:00.000Z"),
            "value": 180.22
        },
        {
            "date": new Date("2007-11-28T00:00:00.000Z"),
            "value": 184.29
        },
        {
            "date": new Date("2007-11-29T00:00:00.000Z"),
            "value": 182.22
        },
        {
            "date": new Date("2007-12-03T00:00:00.000Z"),
            "value": 178.86
        },
        {
            "date": new Date("2007-12-04T00:00:00.000Z"),
            "value": 179.81
        },
        {
            "date": new Date("2007-12-05T00:00:00.000Z"),
            "value": 185.5
        },
        {
            "date": new Date("2007-12-06T00:00:00.000Z"),
            "value": 189.95
        },
        {
            "date": new Date("2007-12-07T00:00:00.000Z"),
            "value": 194.3
        },
        {
            "date": new Date("2007-12-09T00:00:00.000Z"),
            "value": 194.21
        },
        {
            "date": new Date("2007-12-10T00:00:00.000Z"),
            "value": 188.54
        },
        {
            "date": new Date("2007-12-11T00:00:00.000Z"),
            "value": 190.86
        },
        {
            "date": new Date("2007-12-12T00:00:00.000Z"),
            "value": 191.83
        },
        {
            "date": new Date("2007-12-13T00:00:00.000Z"),
            "value": 190.39
        },
        {
            "date": new Date("2007-12-16T00:00:00.000Z"),
            "value": 184.4
        },
        {
            "date": new Date("2007-12-17T00:00:00.000Z"),
            "value": 182.98
        },
        {
            "date": new Date("2007-12-18T00:00:00.000Z"),
            "value": 183.12
        },
        {
            "date": new Date("2007-12-19T00:00:00.000Z"),
            "value": 187.21
        },
        {
            "date": new Date("2007-12-20T00:00:00.000Z"),
            "value": 193.91
        },
        {
            "date": new Date("2007-12-23T00:00:00.000Z"),
            "value": 198.8
        },
        {
            "date": new Date("2007-12-25T00:00:00.000Z"),
            "value": 198.95
        },
        {
            "date": new Date("2007-12-26T00:00:00.000Z"),
            "value": 198.57
        },
        {
            "date": new Date("2007-12-27T00:00:00.000Z"),
            "value": 199.83
        },
        {
            "date": new Date("2007-12-30T00:00:00.000Z"),
            "value": 198.08
        },
        {
            "date": new Date("2008-01-02T00:00:00.000Z"),
            "value": 194.84
        },
        {
            "date": new Date("2008-01-03T00:00:00.000Z"),
            "value": 194.93
        },
        {
            "date": new Date("2008-01-04T00:00:00.000Z"),
            "value": 180.05
        },
        {
            "date": new Date("2008-01-07T00:00:00.000Z"),
            "value": 177.64
        },
        {
            "date": new Date("2008-01-08T00:00:00.000Z"),
            "value": 171.25
        },
        {
            "date": new Date("2008-01-09T00:00:00.000Z"),
            "value": 179.4
        },
        {
            "date": new Date("2008-01-09T00:00:00.000Z"),
            "value": 178.02
        },
        {
            "date": new Date("2008-01-10T00:00:00.000Z"),
            "value": 172.69
        },
        {
            "date": new Date("2008-01-13T00:00:00.000Z"),
            "value": 178.78
        },
        {
            "date": new Date("2008-01-14T00:00:00.000Z"),
            "value": 169.04
        },
        {
            "date": new Date("2008-01-15T00:00:00.000Z"),
            "value": 159.64
        },
        {
            "date": new Date("2008-01-16T00:00:00.000Z"),
            "value": 160.89
        },
        {
            "date": new Date("2008-01-17T00:00:00.000Z"),
            "value": 161.36
        },
        {
            "date": new Date("2008-01-21T00:00:00.000Z"),
            "value": 155.64
        },
        {
            "date": new Date("2008-01-22T00:00:00.000Z"),
            "value": 139.07
        },
        {
            "date": new Date("2008-01-23T00:00:00.000Z"),
            "value": 135.6
        },
        {
            "date": new Date("2008-01-24T00:00:00.000Z"),
            "value": 130.01
        },
        {
            "date": new Date("2008-01-27T00:00:00.000Z"),
            "value": 130.01
        },
        {
            "date": new Date("2008-01-28T00:00:00.000Z"),
            "value": 131.54
        },
        {
            "date": new Date("2008-01-29T00:00:00.000Z"),
            "value": 132.18
        },
        {
            "date": new Date("2008-01-30T00:00:00.000Z"),
            "value": 135.36
        },
        {
            "date": new Date("2008-02-01T00:00:00.000Z"),
            "value": 133.75
        },
        {
            "date": new Date("2008-02-04T00:00:00.000Z"),
            "value": 131.65
        },
        {
            "date": new Date("2008-02-05T00:00:00.000Z"),
            "value": 129.36
        },
        {
            "date": new Date("2008-02-06T00:00:00.000Z"),
            "value": 122
        },
        {
            "date": new Date("2008-02-07T00:00:00.000Z"),
            "value": 121.24
        },
        {
            "date": new Date("2008-02-08T00:00:00.000Z"),
            "value": 125.48
        },
        {
            "date": new Date("2008-02-10T00:00:00.000Z"),
            "value": 129.45
        },
        {
            "date": new Date("2008-02-11T00:00:00.000Z"),
            "value": 124.86
        },
        {
            "date": new Date("2008-02-12T00:00:00.000Z"),
            "value": 129.4
        },
        {
            "date": new Date("2008-02-13T00:00:00.000Z"),
            "value": 127.46
        },
        {
            "date": new Date("2008-02-14T00:00:00.000Z"),
            "value": 124.63
        },
        {
            "date": new Date("2008-02-18T00:00:00.000Z"),
            "value": 122.18
        },
        {
            "date": new Date("2008-02-19T00:00:00.000Z"),
            "value": 123.82
        },
        {
            "date": new Date("2008-02-20T00:00:00.000Z"),
            "value": 121.54
        },
        {
            "date": new Date("2008-02-21T00:00:00.000Z"),
            "value": 119.46
        },
        {
            "date": new Date("2008-02-24T00:00:00.000Z"),
            "value": 119.74
        },
        {
            "date": new Date("2008-02-25T00:00:00.000Z"),
            "value": 119.15
        },
        {
            "date": new Date("2008-02-26T00:00:00.000Z"),
            "value": 122.96
        },
        {
            "date": new Date("2008-02-27T00:00:00.000Z"),
            "value": 129.91
        },
        {
            "date": new Date("2008-02-28T00:00:00.000Z"),
            "value": 125.02
        },
        {
            "date": new Date("2008-03-03T00:00:00.000Z"),
            "value": 121.73
        },
        {
            "date": new Date("2008-03-04T00:00:00.000Z"),
            "value": 124.62
        },
        {
            "date": new Date("2008-03-05T00:00:00.000Z"),
            "value": 124.49
        },
        {
            "date": new Date("2008-03-06T00:00:00.000Z"),
            "value": 120.93
        },
        {
            "date": new Date("2008-03-07T00:00:00.000Z"),
            "value": 122.25
        },
        {
            "date": new Date("2008-03-09T00:00:00.000Z"),
            "value": 119.69
        },
        {
            "date": new Date("2008-03-10T00:00:00.000Z"),
            "value": 127.35
        },
        {
            "date": new Date("2008-03-11T00:00:00.000Z"),
            "value": 126.03
        },
        {
            "date": new Date("2008-03-12T00:00:00.000Z"),
            "value": 127.94
        },
        {
            "date": new Date("2008-03-13T00:00:00.000Z"),
            "value": 126.61
        },
        {
            "date": new Date("2008-03-16T00:00:00.000Z"),
            "value": 126.73
        },
        {
            "date": new Date("2008-03-17T00:00:00.000Z"),
            "value": 132.82
        },
        {
            "date": new Date("2008-03-18T00:00:00.000Z"),
            "value": 129.67
        },
        {
            "date": new Date("2008-03-19T00:00:00.000Z"),
            "value": 133.27
        },
        {
            "date": new Date("2008-03-23T00:00:00.000Z"),
            "value": 139.53
        },
        {
            "date": new Date("2008-03-24T00:00:00.000Z"),
            "value": 140.98
        },
        {
            "date": new Date("2008-03-25T00:00:00.000Z"),
            "value": 145.06
        },
        {
            "date": new Date("2008-03-26T00:00:00.000Z"),
            "value": 140.25
        },
        {
            "date": new Date("2008-03-27T00:00:00.000Z"),
            "value": 143.01
        },
        {
            "date": new Date("2008-03-30T00:00:00.000Z"),
            "value": 143.5
        },
        {
            "date": new Date("2008-04-01T00:00:00.000Z"),
            "value": 149.53
        },
        {
            "date": new Date("2008-04-02T00:00:00.000Z"),
            "value": 147.49
        },
        {
            "date": new Date("2008-04-03T00:00:00.000Z"),
            "value": 151.61
        },
        {
            "date": new Date("2008-04-04T00:00:00.000Z"),
            "value": 153.08
        },
        {
            "date": new Date("2008-04-07T00:00:00.000Z"),
            "value": 155.89
        },
        {
            "date": new Date("2008-04-08T00:00:00.000Z"),
            "value": 152.84
        },
        {
            "date": new Date("2008-04-09T00:00:00.000Z"),
            "value": 151.44
        },
        {
            "date": new Date("2008-04-09T00:00:00.000Z"),
            "value": 154.55
        },
        {
            "date": new Date("2008-04-10T00:00:00.000Z"),
            "value": 147.14
        },
        {
            "date": new Date("2008-04-13T00:00:00.000Z"),
            "value": 147.78
        },
        {
            "date": new Date("2008-04-14T00:00:00.000Z"),
            "value": 148.38
        },
        {
            "date": new Date("2008-04-15T00:00:00.000Z"),
            "value": 153.7
        },
        {
            "date": new Date("2008-04-16T00:00:00.000Z"),
            "value": 154.49
        },
        {
            "date": new Date("2008-04-17T00:00:00.000Z"),
            "value": 161.04
        },
        {
            "date": new Date("2008-04-20T00:00:00.000Z"),
            "value": 168.16
        },
        {
            "date": new Date("2008-04-21T00:00:00.000Z"),
            "value": 160.2
        },
        {
            "date": new Date("2008-04-22T00:00:00.000Z"),
            "value": 162.89
        },
        {
            "date": new Date("2008-04-23T00:00:00.000Z"),
            "value": 168.94
        },
        {
            "date": new Date("2008-04-24T00:00:00.000Z"),
            "value": 169.73
        },
        {
            "date": new Date("2008-04-27T00:00:00.000Z"),
            "value": 172.24
        },
        {
            "date": new Date("2008-04-28T00:00:00.000Z"),
            "value": 175.05
        },
        {
            "date": new Date("2008-04-29T00:00:00.000Z"),
            "value": 173.95
        },
        {
            "date": new Date("2008-05-01T00:00:00.000Z"),
            "value": 180
        },
        {
            "date": new Date("2008-05-02T00:00:00.000Z"),
            "value": 180.94
        },
        {
            "date": new Date("2008-05-05T00:00:00.000Z"),
            "value": 184.73
        },
        {
            "date": new Date("2008-05-06T00:00:00.000Z"),
            "value": 186.66
        },
        {
            "date": new Date("2008-05-07T00:00:00.000Z"),
            "value": 182.59
        },
        {
            "date": new Date("2008-05-08T00:00:00.000Z"),
            "value": 185.06
        },
        {
            "date": new Date("2008-05-09T00:00:00.000Z"),
            "value": 183.45
        },
        {
            "date": new Date("2008-05-11T00:00:00.000Z"),
            "value": 188.16
        },
        {
            "date": new Date("2008-05-12T00:00:00.000Z"),
            "value": 189.96
        },
        {
            "date": new Date("2008-05-13T00:00:00.000Z"),
            "value": 186.26
        },
        {
            "date": new Date("2008-05-14T00:00:00.000Z"),
            "value": 189.73
        },
        {
            "date": new Date("2008-05-15T00:00:00.000Z"),
            "value": 187.62
        },
        {
            "date": new Date("2008-05-18T00:00:00.000Z"),
            "value": 183.6
        },
        {
            "date": new Date("2008-05-19T00:00:00.000Z"),
            "value": 185.9
        },
        {
            "date": new Date("2008-05-20T00:00:00.000Z"),
            "value": 178.19
        },
        {
            "date": new Date("2008-05-21T00:00:00.000Z"),
            "value": 177.05
        },
        {
            "date": new Date("2008-05-22T00:00:00.000Z"),
            "value": 181.17
        },
        {
            "date": new Date("2008-05-26T00:00:00.000Z"),
            "value": 186.43
        },
        {
            "date": new Date("2008-05-27T00:00:00.000Z"),
            "value": 187.01
        },
        {
            "date": new Date("2008-05-28T00:00:00.000Z"),
            "value": 186.69
        },
        {
            "date": new Date("2008-05-29T00:00:00.000Z"),
            "value": 188.75
        },
        {
            "date": new Date("2008-06-02T00:00:00.000Z"),
            "value": 186.1
        },
        {
            "date": new Date("2008-06-03T00:00:00.000Z"),
            "value": 185.37
        },
        {
            "date": new Date("2008-06-04T00:00:00.000Z"),
            "value": 185.19
        },
        {
            "date": new Date("2008-06-05T00:00:00.000Z"),
            "value": 189.43
        },
        {
            "date": new Date("2008-06-06T00:00:00.000Z"),
            "value": 185.64
        },
        {
            "date": new Date("2008-06-09T00:00:00.000Z"),
            "value": 181.61
        },
        {
            "date": new Date("2008-06-09T00:00:00.000Z"),
            "value": 185.64
        },
        {
            "date": new Date("2008-06-10T00:00:00.000Z"),
            "value": 180.81
        },
        {
            "date": new Date("2008-06-11T00:00:00.000Z"),
            "value": 173.26
        },
        {
            "date": new Date("2008-06-12T00:00:00.000Z"),
            "value": 172.37
        },
        {
            "date": new Date("2008-06-15T00:00:00.000Z"),
            "value": 176.84
        },
        {
            "date": new Date("2008-06-16T00:00:00.000Z"),
            "value": 181.43
        },
        {
            "date": new Date("2008-06-17T00:00:00.000Z"),
            "value": 178.75
        },
        {
            "date": new Date("2008-06-18T00:00:00.000Z"),
            "value": 180.9
        },
        {
            "date": new Date("2008-06-19T00:00:00.000Z"),
            "value": 175.27
        },
        {
            "date": new Date("2008-06-22T00:00:00.000Z"),
            "value": 173.16
        },
        {
            "date": new Date("2008-06-23T00:00:00.000Z"),
            "value": 173.25
        },
        {
            "date": new Date("2008-06-24T00:00:00.000Z"),
            "value": 177.39
        },
        {
            "date": new Date("2008-06-25T00:00:00.000Z"),
            "value": 168.26
        },
        {
            "date": new Date("2008-06-26T00:00:00.000Z"),
            "value": 170.09
        },
        {
            "date": new Date("2008-06-29T00:00:00.000Z"),
            "value": 167.44
        },
        {
            "date": new Date("2008-07-01T00:00:00.000Z"),
            "value": 174.68
        },
        {
            "date": new Date("2008-07-02T00:00:00.000Z"),
            "value": 168.18
        },
        {
            "date": new Date("2008-07-03T00:00:00.000Z"),
            "value": 170.12
        },
        {
            "date": new Date("2008-07-07T00:00:00.000Z"),
            "value": 175.16
        },
        {
            "date": new Date("2008-07-08T00:00:00.000Z"),
            "value": 179.55
        },
        {
            "date": new Date("2008-07-09T00:00:00.000Z"),
            "value": 174.25
        },
        {
            "date": new Date("2008-07-09T00:00:00.000Z"),
            "value": 176.63
        },
        {
            "date": new Date("2008-07-10T00:00:00.000Z"),
            "value": 172.58
        },
        {
            "date": new Date("2008-07-13T00:00:00.000Z"),
            "value": 173.88
        },
        {
            "date": new Date("2008-07-14T00:00:00.000Z"),
            "value": 169.64
        },
        {
            "date": new Date("2008-07-15T00:00:00.000Z"),
            "value": 172.81
        },
        {
            "date": new Date("2008-07-16T00:00:00.000Z"),
            "value": 171.81
        },
        {
            "date": new Date("2008-07-17T00:00:00.000Z"),
            "value": 165.15
        },
        {
            "date": new Date("2008-07-20T00:00:00.000Z"),
            "value": 166.29
        },
        {
            "date": new Date("2008-07-21T00:00:00.000Z"),
            "value": 162.02
        },
        {
            "date": new Date("2008-07-22T00:00:00.000Z"),
            "value": 166.26
        },
        {
            "date": new Date("2008-07-23T00:00:00.000Z"),
            "value": 159.03
        },
        {
            "date": new Date("2008-07-24T00:00:00.000Z"),
            "value": 162.12
        },
        {
            "date": new Date("2008-07-27T00:00:00.000Z"),
            "value": 154.4
        },
        {
            "date": new Date("2008-07-28T00:00:00.000Z"),
            "value": 157.08
        },
        {
            "date": new Date("2008-07-29T00:00:00.000Z"),
            "value": 159.88
        },
        {
            "date": new Date("2008-07-30T00:00:00.000Z"),
            "value": 158.95
        },
        {
            "date": new Date("2008-08-01T00:00:00.000Z"),
            "value": 156.66
        },
        {
            "date": new Date("2008-08-04T00:00:00.000Z"),
            "value": 153.23
        },
        {
            "date": new Date("2008-08-05T00:00:00.000Z"),
            "value": 160.64
        },
        {
            "date": new Date("2008-08-06T00:00:00.000Z"),
            "value": 164.19
        },
        {
            "date": new Date("2008-08-07T00:00:00.000Z"),
            "value": 163.57
        },
        {
            "date": new Date("2008-08-08T00:00:00.000Z"),
            "value": 169.55
        },
        {
            "date": new Date("2008-08-10T00:00:00.000Z"),
            "value": 173.56
        },
        {
            "date": new Date("2008-08-11T00:00:00.000Z"),
            "value": 176.73
        },
        {
            "date": new Date("2008-08-12T00:00:00.000Z"),
            "value": 179.3
        },
        {
            "date": new Date("2008-08-13T00:00:00.000Z"),
            "value": 179.32
        },
        {
            "date": new Date("2008-08-14T00:00:00.000Z"),
            "value": 175.74
        },
        {
            "date": new Date("2008-08-17T00:00:00.000Z"),
            "value": 175.39
        },
        {
            "date": new Date("2008-08-18T00:00:00.000Z"),
            "value": 173.53
        },
        {
            "date": new Date("2008-08-19T00:00:00.000Z"),
            "value": 175.84
        },
        {
            "date": new Date("2008-08-20T00:00:00.000Z"),
            "value": 174.29
        },
        {
            "date": new Date("2008-08-21T00:00:00.000Z"),
            "value": 176.79
        },
        {
            "date": new Date("2008-08-24T00:00:00.000Z"),
            "value": 172.55
        },
        {
            "date": new Date("2008-08-25T00:00:00.000Z"),
            "value": 173.64
        },
        {
            "date": new Date("2008-08-26T00:00:00.000Z"),
            "value": 174.67
        },
        {
            "date": new Date("2008-08-27T00:00:00.000Z"),
            "value": 173.74
        },
        {
            "date": new Date("2008-08-28T00:00:00.000Z"),
            "value": 169.53
        },
        {
            "date": new Date("2008-09-02T00:00:00.000Z"),
            "value": 166.19
        },
        {
            "date": new Date("2008-09-03T00:00:00.000Z"),
            "value": 166.96
        },
        {
            "date": new Date("2008-09-04T00:00:00.000Z"),
            "value": 161.22
        },
        {
            "date": new Date("2008-09-05T00:00:00.000Z"),
            "value": 160.18
        },
        {
            "date": new Date("2008-09-08T00:00:00.000Z"),
            "value": 157.92
        },
        {
            "date": new Date("2008-09-09T00:00:00.000Z"),
            "value": 151.68
        },
        {
            "date": new Date("2008-09-09T00:00:00.000Z"),
            "value": 151.61
        },
        {
            "date": new Date("2008-09-10T00:00:00.000Z"),
            "value": 152.65
        },
        {
            "date": new Date("2008-09-11T00:00:00.000Z"),
            "value": 148.94
        },
        {
            "date": new Date("2008-09-14T00:00:00.000Z"),
            "value": 140.36
        },
        {
            "date": new Date("2008-09-15T00:00:00.000Z"),
            "value": 139.88
        },
        {
            "date": new Date("2008-09-16T00:00:00.000Z"),
            "value": 127.83
        },
        {
            "date": new Date("2008-09-17T00:00:00.000Z"),
            "value": 134.09
        },
        {
            "date": new Date("2008-09-18T00:00:00.000Z"),
            "value": 140.91
        },
        {
            "date": new Date("2008-09-21T00:00:00.000Z"),
            "value": 131.05
        },
        {
            "date": new Date("2008-09-22T00:00:00.000Z"),
            "value": 126.84
        },
        {
            "date": new Date("2008-09-23T00:00:00.000Z"),
            "value": 128.71
        },
        {
            "date": new Date("2008-09-24T00:00:00.000Z"),
            "value": 131.93
        },
        {
            "date": new Date("2008-09-25T00:00:00.000Z"),
            "value": 128.24
        },
        {
            "date": new Date("2008-09-28T00:00:00.000Z"),
            "value": 105.26
        },
        {
            "date": new Date("2008-09-29T00:00:00.000Z"),
            "value": 113.66
        },
        {
            "date": new Date("2008-10-01T00:00:00.000Z"),
            "value": 109.12
        },
        {
            "date": new Date("2008-10-02T00:00:00.000Z"),
            "value": 100.1
        },
        {
            "date": new Date("2008-10-03T00:00:00.000Z"),
            "value": 97.07
        },
        {
            "date": new Date("2008-10-06T00:00:00.000Z"),
            "value": 98.14
        },
        {
            "date": new Date("2008-10-07T00:00:00.000Z"),
            "value": 89.16
        },
        {
            "date": new Date("2008-10-08T00:00:00.000Z"),
            "value": 89.79
        },
        {
            "date": new Date("2008-10-09T00:00:00.000Z"),
            "value": 88.74
        },
        {
            "date": new Date("2008-10-09T00:00:00.000Z"),
            "value": 96.8
        },
        {
            "date": new Date("2008-10-12T00:00:00.000Z"),
            "value": 110.26
        },
        {
            "date": new Date("2008-10-13T00:00:00.000Z"),
            "value": 104.08
        },
        {
            "date": new Date("2008-10-14T00:00:00.000Z"),
            "value": 97.95
        },
        {
            "date": new Date("2008-10-15T00:00:00.000Z"),
            "value": 101.89
        },
        {
            "date": new Date("2008-10-16T00:00:00.000Z"),
            "value": 97.4
        },
        {
            "date": new Date("2008-10-19T00:00:00.000Z"),
            "value": 98.44
        },
        {
            "date": new Date("2008-10-20T00:00:00.000Z"),
            "value": 91.49
        },
        {
            "date": new Date("2008-10-21T00:00:00.000Z"),
            "value": 96.87
        },
        {
            "date": new Date("2008-10-22T00:00:00.000Z"),
            "value": 98.23
        },
        {
            "date": new Date("2008-10-23T00:00:00.000Z"),
            "value": 96.38
        },
        {
            "date": new Date("2008-10-26T00:00:00.000Z"),
            "value": 92.09
        },
        {
            "date": new Date("2008-10-27T00:00:00.000Z"),
            "value": 99.91
        },
        {
            "date": new Date("2008-10-28T00:00:00.000Z"),
            "value": 104.55
        },
        {
            "date": new Date("2008-10-29T00:00:00.000Z"),
            "value": 111.04
        },
        {
            "date": new Date("2008-10-30T00:00:00.000Z"),
            "value": 107.59
        },
        {
            "date": new Date("2008-11-03T00:00:00.000Z"),
            "value": 106.96
        },
        {
            "date": new Date("2008-11-04T00:00:00.000Z"),
            "value": 110.99
        },
        {
            "date": new Date("2008-11-05T00:00:00.000Z"),
            "value": 103.3
        },
        {
            "date": new Date("2008-11-06T00:00:00.000Z"),
            "value": 99.1
        },
        {
            "date": new Date("2008-11-07T00:00:00.000Z"),
            "value": 98.24
        },
        {
            "date": new Date("2008-11-09T00:00:00.000Z"),
            "value": 95.88
        },
        {
            "date": new Date("2008-11-10T00:00:00.000Z"),
            "value": 94.77
        },
        {
            "date": new Date("2008-11-11T00:00:00.000Z"),
            "value": 90.12
        },
        {
            "date": new Date("2008-11-12T00:00:00.000Z"),
            "value": 96.44
        },
        {
            "date": new Date("2008-11-13T00:00:00.000Z"),
            "value": 90.24
        },
        {
            "date": new Date("2008-11-16T00:00:00.000Z"),
            "value": 88.14
        },
        {
            "date": new Date("2008-11-17T00:00:00.000Z"),
            "value": 89.91
        },
        {
            "date": new Date("2008-11-18T00:00:00.000Z"),
            "value": 86.29
        },
        {
            "date": new Date("2008-11-19T00:00:00.000Z"),
            "value": 80.49
        },
        {
            "date": new Date("2008-11-20T00:00:00.000Z"),
            "value": 82.58
        },
        {
            "date": new Date("2008-11-23T00:00:00.000Z"),
            "value": 92.95
        },
        {
            "date": new Date("2008-11-24T00:00:00.000Z"),
            "value": 90.8
        },
        {
            "date": new Date("2008-11-25T00:00:00.000Z"),
            "value": 95
        },
        {
            "date": new Date("2008-11-26T00:00:00.000Z"),
            "value": 95
        },
        {
            "date": new Date("2008-11-27T00:00:00.000Z"),
            "value": 92.67
        },
        {
            "date": new Date("2008-12-01T00:00:00.000Z"),
            "value": 88.93
        },
        {
            "date": new Date("2008-12-02T00:00:00.000Z"),
            "value": 92.47
        },
        {
            "date": new Date("2008-12-03T00:00:00.000Z"),
            "value": 95.9
        },
        {
            "date": new Date("2008-12-04T00:00:00.000Z"),
            "value": 91.41
        },
        {
            "date": new Date("2008-12-05T00:00:00.000Z"),
            "value": 94
        },
        {
            "date": new Date("2008-12-08T00:00:00.000Z"),
            "value": 99.72
        },
        {
            "date": new Date("2008-12-09T00:00:00.000Z"),
            "value": 100.06
        },
        {
            "date": new Date("2008-12-09T00:00:00.000Z"),
            "value": 98.21
        },
        {
            "date": new Date("2008-12-10T00:00:00.000Z"),
            "value": 95
        },
        {
            "date": new Date("2008-12-11T00:00:00.000Z"),
            "value": 98.27
        },
        {
            "date": new Date("2008-12-14T00:00:00.000Z"),
            "value": 94.75
        },
        {
            "date": new Date("2008-12-15T00:00:00.000Z"),
            "value": 95.43
        },
        {
            "date": new Date("2008-12-16T00:00:00.000Z"),
            "value": 89.16
        },
        {
            "date": new Date("2008-12-17T00:00:00.000Z"),
            "value": 89.43
        },
        {
            "date": new Date("2008-12-18T00:00:00.000Z"),
            "value": 90
        },
        {
            "date": new Date("2008-12-21T00:00:00.000Z"),
            "value": 85.74
        },
        {
            "date": new Date("2008-12-22T00:00:00.000Z"),
            "value": 86.38
        },
        {
            "date": new Date("2008-12-23T00:00:00.000Z"),
            "value": 85.04
        },
        {
            "date": new Date("2008-12-24T00:00:00.000Z"),
            "value": 85.04
        },
        {
            "date": new Date("2008-12-25T00:00:00.000Z"),
            "value": 85.81
        },
        {
            "date": new Date("2008-12-28T00:00:00.000Z"),
            "value": 86.61
        },
        {
            "date": new Date("2008-12-29T00:00:00.000Z"),
            "value": 86.29
        },
        {
            "date": new Date("2008-12-30T00:00:00.000Z"),
            "value": 85.35
        },
        {
            "date": new Date("2009-01-01T00:00:00.000Z"),
            "value": 85.35
        },
        {
            "date": new Date("2009-01-02T00:00:00.000Z"),
            "value": 90.75
        },
        {
            "date": new Date("2009-01-05T00:00:00.000Z"),
            "value": 94.58
        },
        {
            "date": new Date("2009-01-06T00:00:00.000Z"),
            "value": 93.02
        },
        {
            "date": new Date("2009-01-07T00:00:00.000Z"),
            "value": 91.01
        },
        {
            "date": new Date("2009-01-08T00:00:00.000Z"),
            "value": 92.7
        },
        {
            "date": new Date("2009-01-09T00:00:00.000Z"),
            "value": 90.58
        },
        {
            "date": new Date("2009-01-11T00:00:00.000Z"),
            "value": 88.66
        },
        {
            "date": new Date("2009-01-12T00:00:00.000Z"),
            "value": 87.71
        },
        {
            "date": new Date("2009-01-13T00:00:00.000Z"),
            "value": 85.33
        },
        {
            "date": new Date("2009-01-14T00:00:00.000Z"),
            "value": 83.38
        },
        {
            "date": new Date("2009-01-15T00:00:00.000Z"),
            "value": 82.33
        },
        {
            "date": new Date("2009-01-19T00:00:00.000Z"),
            "value": 78.2
        },
        {
            "date": new Date("2009-01-20T00:00:00.000Z"),
            "value": 82.83
        },
        {
            "date": new Date("2009-01-21T00:00:00.000Z"),
            "value": 88.36
        },
        {
            "date": new Date("2009-01-22T00:00:00.000Z"),
            "value": 88.36
        },
        {
            "date": new Date("2009-01-25T00:00:00.000Z"),
            "value": 89.64
        },
        {
            "date": new Date("2009-01-26T00:00:00.000Z"),
            "value": 90.73
        },
        {
            "date": new Date("2009-01-27T00:00:00.000Z"),
            "value": 94.2
        },
        {
            "date": new Date("2009-01-28T00:00:00.000Z"),
            "value": 93
        },
        {
            "date": new Date("2009-01-29T00:00:00.000Z"),
            "value": 90.13
        },
        {
            "date": new Date("2009-02-02T00:00:00.000Z"),
            "value": 91.51
        },
        {
            "date": new Date("2009-02-03T00:00:00.000Z"),
            "value": 92.98
        },
        {
            "date": new Date("2009-02-04T00:00:00.000Z"),
            "value": 93.55
        },
        {
            "date": new Date("2009-02-05T00:00:00.000Z"),
            "value": 96.46
        },
        {
            "date": new Date("2009-02-06T00:00:00.000Z"),
            "value": 99.72
        },
        {
            "date": new Date("2009-02-09T00:00:00.000Z"),
            "value": 102.51
        },
        {
            "date": new Date("2009-02-09T00:00:00.000Z"),
            "value": 97.83
        },
        {
            "date": new Date("2009-02-10T00:00:00.000Z"),
            "value": 96.82
        },
        {
            "date": new Date("2009-02-11T00:00:00.000Z"),
            "value": 99.27
        },
        {
            "date": new Date("2009-02-12T00:00:00.000Z"),
            "value": 99.16
        },
        {
            "date": new Date("2009-02-16T00:00:00.000Z"),
            "value": 94.53
        },
        {
            "date": new Date("2009-02-17T00:00:00.000Z"),
            "value": 94.37
        },
        {
            "date": new Date("2009-02-18T00:00:00.000Z"),
            "value": 90.64
        },
        {
            "date": new Date("2009-02-19T00:00:00.000Z"),
            "value": 91.2
        },
        {
            "date": new Date("2009-02-22T00:00:00.000Z"),
            "value": 86.95
        },
        {
            "date": new Date("2009-02-23T00:00:00.000Z"),
            "value": 90.25
        },
        {
            "date": new Date("2009-02-24T00:00:00.000Z"),
            "value": 91.16
        },
        {
            "date": new Date("2009-02-25T00:00:00.000Z"),
            "value": 89.19
        },
        {
            "date": new Date("2009-02-26T00:00:00.000Z"),
            "value": 89.31
        },
        {
            "date": new Date("2009-03-02T00:00:00.000Z"),
            "value": 87.94
        },
        {
            "date": new Date("2009-03-03T00:00:00.000Z"),
            "value": 88.37
        },
        {
            "date": new Date("2009-03-04T00:00:00.000Z"),
            "value": 91.17
        },
        {
            "date": new Date("2009-03-05T00:00:00.000Z"),
            "value": 88.84
        },
        {
            "date": new Date("2009-03-06T00:00:00.000Z"),
            "value": 85.3
        },
        {
            "date": new Date("2009-03-09T00:00:00.000Z"),
            "value": 83.11
        },
        {
            "date": new Date("2009-03-09T00:00:00.000Z"),
            "value": 88.63
        },
        {
            "date": new Date("2009-03-10T00:00:00.000Z"),
            "value": 92.68
        },
        {
            "date": new Date("2009-03-11T00:00:00.000Z"),
            "value": 96.35
        },
        {
            "date": new Date("2009-03-12T00:00:00.000Z"),
            "value": 95.93
        },
        {
            "date": new Date("2009-03-15T00:00:00.000Z"),
            "value": 95.42
        },
        {
            "date": new Date("2009-03-16T00:00:00.000Z"),
            "value": 99.66
        },
        {
            "date": new Date("2009-03-17T00:00:00.000Z"),
            "value": 101.52
        },
        {
            "date": new Date("2009-03-18T00:00:00.000Z"),
            "value": 101.62
        },
        {
            "date": new Date("2009-03-19T00:00:00.000Z"),
            "value": 101.59
        },
        {
            "date": new Date("2009-03-22T00:00:00.000Z"),
            "value": 107.66
        },
        {
            "date": new Date("2009-03-23T00:00:00.000Z"),
            "value": 106.5
        },
        {
            "date": new Date("2009-03-24T00:00:00.000Z"),
            "value": 106.49
        },
        {
            "date": new Date("2009-03-25T00:00:00.000Z"),
            "value": 109.87
        },
        {
            "date": new Date("2009-03-26T00:00:00.000Z"),
            "value": 106.85
        },
        {
            "date": new Date("2009-03-29T00:00:00.000Z"),
            "value": 104.49
        },
        {
            "date": new Date("2009-03-30T00:00:00.000Z"),
            "value": 105.12
        },
        {
            "date": new Date("2009-04-01T00:00:00.000Z"),
            "value": 108.69
        },
        {
            "date": new Date("2009-04-02T00:00:00.000Z"),
            "value": 112.71
        },
        {
            "date": new Date("2009-04-03T00:00:00.000Z"),
            "value": 115.99
        },
        {
            "date": new Date("2009-04-06T00:00:00.000Z"),
            "value": 118.45
        },
        {
            "date": new Date("2009-04-07T00:00:00.000Z"),
            "value": 115
        },
        {
            "date": new Date("2009-04-08T00:00:00.000Z"),
            "value": 116.32
        },
        {
            "date": new Date("2009-04-09T00:00:00.000Z"),
            "value": 119.57
        },
        {
            "date": new Date("2009-04-09T00:00:00.000Z"),
            "value": 119.57
        },
        {
            "date": new Date("2009-04-12T00:00:00.000Z"),
            "value": 120.22
        },
        {
            "date": new Date("2009-04-13T00:00:00.000Z"),
            "value": 118.31
        },
        {
            "date": new Date("2009-04-14T00:00:00.000Z"),
            "value": 117.64
        },
        {
            "date": new Date("2009-04-15T00:00:00.000Z"),
            "value": 121.45
        },
        {
            "date": new Date("2009-04-16T00:00:00.000Z"),
            "value": 123.42
        },
        {
            "date": new Date("2009-04-19T00:00:00.000Z"),
            "value": 120.5
        },
        {
            "date": new Date("2009-04-20T00:00:00.000Z"),
            "value": 121.76
        },
        {
            "date": new Date("2009-04-21T00:00:00.000Z"),
            "value": 121.51
        },
        {
            "date": new Date("2009-04-22T00:00:00.000Z"),
            "value": 125.4
        },
        {
            "date": new Date("2009-04-23T00:00:00.000Z"),
            "value": 123.9
        },
        {
            "date": new Date("2009-04-26T00:00:00.000Z"),
            "value": 124.73
        },
        {
            "date": new Date("2009-04-27T00:00:00.000Z"),
            "value": 123.9
        },
        {
            "date": new Date("2009-04-28T00:00:00.000Z"),
            "value": 125.14
        },
        {
            "date": new Date("2009-04-29T00:00:00.000Z"),
            "value": 125.83
        },
        {
            "date": new Date("2009-05-01T00:00:00.000Z"),
            "value": 127.24
        },
        {
            "date": new Date("2009-05-04T00:00:00.000Z"),
            "value": 132.07
        },
        {
            "date": new Date("2009-05-05T00:00:00.000Z"),
            "value": 132.71
        },
        {
            "date": new Date("2009-05-06T00:00:00.000Z"),
            "value": 132.5
        },
        {
            "date": new Date("2009-05-07T00:00:00.000Z"),
            "value": 129.06
        },
        {
            "date": new Date("2009-05-08T00:00:00.000Z"),
            "value": 129.19
        },
        {
            "date": new Date("2009-05-10T00:00:00.000Z"),
            "value": 129.57
        },
        {
            "date": new Date("2009-05-11T00:00:00.000Z"),
            "value": 124.42
        },
        {
            "date": new Date("2009-05-12T00:00:00.000Z"),
            "value": 119.49
        },
        {
            "date": new Date("2009-05-13T00:00:00.000Z"),
            "value": 122.95
        },
        {
            "date": new Date("2009-05-14T00:00:00.000Z"),
            "value": 122.42
        },
        {
            "date": new Date("2009-05-17T00:00:00.000Z"),
            "value": 126.65
        },
        {
            "date": new Date("2009-05-18T00:00:00.000Z"),
            "value": 127.45
        },
        {
            "date": new Date("2009-05-19T00:00:00.000Z"),
            "value": 125.87
        },
        {
            "date": new Date("2009-05-20T00:00:00.000Z"),
            "value": 124.18
        },
        {
            "date": new Date("2009-05-21T00:00:00.000Z"),
            "value": 122.5
        },
        {
            "date": new Date("2009-05-25T00:00:00.000Z"),
            "value": 130.78
        },
        {
            "date": new Date("2009-05-26T00:00:00.000Z"),
            "value": 133.05
        },
        {
            "date": new Date("2009-05-27T00:00:00.000Z"),
            "value": 135.07
        },
        {
            "date": new Date("2009-05-28T00:00:00.000Z"),
            "value": 135.81
        },
        {
            "date": new Date("2009-06-01T00:00:00.000Z"),
            "value": 139.35
        },
        {
            "date": new Date("2009-06-02T00:00:00.000Z"),
            "value": 139.49
        },
        {
            "date": new Date("2009-06-03T00:00:00.000Z"),
            "value": 140.95
        },
        {
            "date": new Date("2009-06-04T00:00:00.000Z"),
            "value": 143.74
        },
        {
            "date": new Date("2009-06-05T00:00:00.000Z"),
            "value": 144.67
        },
        {
            "date": new Date("2009-06-08T00:00:00.000Z"),
            "value": 143.85
        },
        {
            "date": new Date("2009-06-09T00:00:00.000Z"),
            "value": 142.72
        },
        {
            "date": new Date("2009-06-09T00:00:00.000Z"),
            "value": 140.25
        },
        {
            "date": new Date("2009-06-10T00:00:00.000Z"),
            "value": 139.95
        },
        {
            "date": new Date("2009-06-11T00:00:00.000Z"),
            "value": 136.97
        },
        {
            "date": new Date("2009-06-14T00:00:00.000Z"),
            "value": 136.09
        },
        {
            "date": new Date("2009-06-15T00:00:00.000Z"),
            "value": 136.35
        },
        {
            "date": new Date("2009-06-16T00:00:00.000Z"),
            "value": 135.58
        },
        {
            "date": new Date("2009-06-17T00:00:00.000Z"),
            "value": 135.88
        },
        {
            "date": new Date("2009-06-18T00:00:00.000Z"),
            "value": 139.48
        },
        {
            "date": new Date("2009-06-21T00:00:00.000Z"),
            "value": 137.37
        },
        {
            "date": new Date("2009-06-22T00:00:00.000Z"),
            "value": 134.01
        },
        {
            "date": new Date("2009-06-23T00:00:00.000Z"),
            "value": 136.22
        },
        {
            "date": new Date("2009-06-24T00:00:00.000Z"),
            "value": 139.86
        },
        {
            "date": new Date("2009-06-25T00:00:00.000Z"),
            "value": 142.44
        },
        {
            "date": new Date("2009-06-28T00:00:00.000Z"),
            "value": 141.97
        },
        {
            "date": new Date("2009-06-29T00:00:00.000Z"),
            "value": 142.43
        },
        {
            "date": new Date("2009-07-01T00:00:00.000Z"),
            "value": 142.83
        },
        {
            "date": new Date("2009-07-02T00:00:00.000Z"),
            "value": 140.02
        },
        {
            "date": new Date("2009-07-03T00:00:00.000Z"),
            "value": 140.02
        },
        {
            "date": new Date("2009-07-06T00:00:00.000Z"),
            "value": 138.61
        },
        {
            "date": new Date("2009-07-07T00:00:00.000Z"),
            "value": 135.4
        },
        {
            "date": new Date("2009-07-08T00:00:00.000Z"),
            "value": 137.22
        },
        {
            "date": new Date("2009-07-09T00:00:00.000Z"),
            "value": 136.36
        },
        {
            "date": new Date("2009-07-09T00:00:00.000Z"),
            "value": 138.52
        },
        {
            "date": new Date("2009-07-12T00:00:00.000Z"),
            "value": 142.34
        },
        {
            "date": new Date("2009-07-13T00:00:00.000Z"),
            "value": 142.27
        },
        {
            "date": new Date("2009-07-14T00:00:00.000Z"),
            "value": 146.88
        },
        {
            "date": new Date("2009-07-15T00:00:00.000Z"),
            "value": 147.52
        },
        {
            "date": new Date("2009-07-16T00:00:00.000Z"),
            "value": 151.75
        },
        {
            "date": new Date("2009-07-19T00:00:00.000Z"),
            "value": 152.91
        },
        {
            "date": new Date("2009-07-20T00:00:00.000Z"),
            "value": 151.51
        },
        {
            "date": new Date("2009-07-21T00:00:00.000Z"),
            "value": 156.74
        },
        {
            "date": new Date("2009-07-22T00:00:00.000Z"),
            "value": 157.82
        },
        {
            "date": new Date("2009-07-23T00:00:00.000Z"),
            "value": 159.99
        },
        {
            "date": new Date("2009-07-26T00:00:00.000Z"),
            "value": 160.1
        },
        {
            "date": new Date("2009-07-27T00:00:00.000Z"),
            "value": 160
        },
        {
            "date": new Date("2009-07-28T00:00:00.000Z"),
            "value": 160.03
        },
        {
            "date": new Date("2009-07-29T00:00:00.000Z"),
            "value": 162.79
        },
        {
            "date": new Date("2009-07-30T00:00:00.000Z"),
            "value": 163.39
        },
        {
            "date": new Date("2009-08-03T00:00:00.000Z"),
            "value": 166.43
        },
        {
            "date": new Date("2009-08-04T00:00:00.000Z"),
            "value": 165.55
        },
        {
            "date": new Date("2009-08-05T00:00:00.000Z"),
            "value": 165.11
        },
        {
            "date": new Date("2009-08-06T00:00:00.000Z"),
            "value": 163.91
        },
        {
            "date": new Date("2009-08-07T00:00:00.000Z"),
            "value": 165.51
        },
        {
            "date": new Date("2009-08-09T00:00:00.000Z"),
            "value": 164.72
        },
        {
            "date": new Date("2009-08-11T00:00:00.000Z"),
            "value": 165.31
        },
        {
            "date": new Date("2009-08-12T00:00:00.000Z"),
            "value": 168.42
        },
        {
            "date": new Date("2009-08-13T00:00:00.000Z"),
            "value": 166.78
        },
        {
            "date": new Date("2009-08-16T00:00:00.000Z"),
            "value": 159.59
        },
        {
            "date": new Date("2009-08-17T00:00:00.000Z"),
            "value": 164
        },
        {
            "date": new Date("2009-08-18T00:00:00.000Z"),
            "value": 164.6
        },
        {
            "date": new Date("2009-08-19T00:00:00.000Z"),
            "value": 166.33
        },
        {
            "date": new Date("2009-08-20T00:00:00.000Z"),
            "value": 169.22
        },
        {
            "date": new Date("2009-08-23T00:00:00.000Z"),
            "value": 169.06
        },
        {
            "date": new Date("2009-08-24T00:00:00.000Z"),
            "value": 169.4
        },
        {
            "date": new Date("2009-08-25T00:00:00.000Z"),
            "value": 167.41
        },
        {
            "date": new Date("2009-08-26T00:00:00.000Z"),
            "value": 169.45
        },
        {
            "date": new Date("2009-08-27T00:00:00.000Z"),
            "value": 170.05
        },
        {
            "date": new Date("2009-08-30T00:00:00.000Z"),
            "value": 168.21
        },
        {
            "date": new Date("2009-09-01T00:00:00.000Z"),
            "value": 165.3
        },
        {
            "date": new Date("2009-09-02T00:00:00.000Z"),
            "value": 165.18
        },
        {
            "date": new Date("2009-09-03T00:00:00.000Z"),
            "value": 166.55
        },
        {
            "date": new Date("2009-09-04T00:00:00.000Z"),
            "value": 170.31
        },
        {
            "date": new Date("2009-09-08T00:00:00.000Z"),
            "value": 172.93
        },
        {
            "date": new Date("2009-09-09T00:00:00.000Z"),
            "value": 171.14
        },
        {
            "date": new Date("2009-09-09T00:00:00.000Z"),
            "value": 172.56
        },
        {
            "date": new Date("2009-09-10T00:00:00.000Z"),
            "value": 172.16
        },
        {
            "date": new Date("2009-09-13T00:00:00.000Z"),
            "value": 173.72
        },
        {
            "date": new Date("2009-09-14T00:00:00.000Z"),
            "value": 175.16
        },
        {
            "date": new Date("2009-09-15T00:00:00.000Z"),
            "value": 181.87
        },
        {
            "date": new Date("2009-09-16T00:00:00.000Z"),
            "value": 184.55
        },
        {
            "date": new Date("2009-09-17T00:00:00.000Z"),
            "value": 185.02
        },
        {
            "date": new Date("2009-09-20T00:00:00.000Z"),
            "value": 184.02
        },
        {
            "date": new Date("2009-09-21T00:00:00.000Z"),
            "value": 184.48
        },
        {
            "date": new Date("2009-09-22T00:00:00.000Z"),
            "value": 185.5
        },
        {
            "date": new Date("2009-09-23T00:00:00.000Z"),
            "value": 183.82
        },
        {
            "date": new Date("2009-09-24T00:00:00.000Z"),
            "value": 182.37
        },
        {
            "date": new Date("2009-09-27T00:00:00.000Z"),
            "value": 186.15
        },
        {
            "date": new Date("2009-09-28T00:00:00.000Z"),
            "value": 185.38
        },
        {
            "date": new Date("2009-09-29T00:00:00.000Z"),
            "value": 185.35
        },
        {
            "date": new Date("2009-10-01T00:00:00.000Z"),
            "value": 180.86
        },
        {
            "date": new Date("2009-10-02T00:00:00.000Z"),
            "value": 184.9
        },
        {
            "date": new Date("2009-10-05T00:00:00.000Z"),
            "value": 186.02
        },
        {
            "date": new Date("2009-10-06T00:00:00.000Z"),
            "value": 190.01
        },
        {
            "date": new Date("2009-10-07T00:00:00.000Z"),
            "value": 190.25
        },
        {
            "date": new Date("2009-10-08T00:00:00.000Z"),
            "value": 189.27
        },
        {
            "date": new Date("2009-10-09T00:00:00.000Z"),
            "value": 190.47
        },
        {
            "date": new Date("2009-10-11T00:00:00.000Z"),
            "value": 190.81
        },
        {
            "date": new Date("2009-10-12T00:00:00.000Z"),
            "value": 190.02
        },
        {
            "date": new Date("2009-10-13T00:00:00.000Z"),
            "value": 191.29
        },
        {
            "date": new Date("2009-10-14T00:00:00.000Z"),
            "value": 190.56
        },
        {
            "date": new Date("2009-10-15T00:00:00.000Z"),
            "value": 188.05
        },
        {
            "date": new Date("2009-10-18T00:00:00.000Z"),
            "value": 189.86
        },
        {
            "date": new Date("2009-10-19T00:00:00.000Z"),
            "value": 198.76
        },
        {
            "date": new Date("2009-10-20T00:00:00.000Z"),
            "value": 204.92
        },
        {
            "date": new Date("2009-10-21T00:00:00.000Z"),
            "value": 205.2
        },
        {
            "date": new Date("2009-10-22T00:00:00.000Z"),
            "value": 203.94
        },
        {
            "date": new Date("2009-10-25T00:00:00.000Z"),
            "value": 202.48
        },
        {
            "date": new Date("2009-10-26T00:00:00.000Z"),
            "value": 197.37
        },
        {
            "date": new Date("2009-10-27T00:00:00.000Z"),
            "value": 192.4
        },
        {
            "date": new Date("2009-10-28T00:00:00.000Z"),
            "value": 196.35
        },
        {
            "date": new Date("2009-10-29T00:00:00.000Z"),
            "value": 188.5
        },
        {
            "date": new Date("2009-11-02T00:00:00.000Z"),
            "value": 189.31
        },
        {
            "date": new Date("2009-11-03T00:00:00.000Z"),
            "value": 188.75
        },
        {
            "date": new Date("2009-11-04T00:00:00.000Z"),
            "value": 190.81
        },
        {
            "date": new Date("2009-11-05T00:00:00.000Z"),
            "value": 194.03
        },
        {
            "date": new Date("2009-11-06T00:00:00.000Z"),
            "value": 194.34
        },
        {
            "date": new Date("2009-11-09T00:00:00.000Z"),
            "value": 201.46
        },
        {
            "date": new Date("2009-11-09T00:00:00.000Z"),
            "value": 202.98
        },
        {
            "date": new Date("2009-11-10T00:00:00.000Z"),
            "value": 203.25
        },
        {
            "date": new Date("2009-11-11T00:00:00.000Z"),
            "value": 201.99
        },
        {
            "date": new Date("2009-11-12T00:00:00.000Z"),
            "value": 204.45
        },
        {
            "date": new Date("2009-11-15T00:00:00.000Z"),
            "value": 206.63
        },
        {
            "date": new Date("2009-11-16T00:00:00.000Z"),
            "value": 207
        },
        {
            "date": new Date("2009-11-17T00:00:00.000Z"),
            "value": 205.96
        },
        {
            "date": new Date("2009-11-18T00:00:00.000Z"),
            "value": 200.51
        },
        {
            "date": new Date("2009-11-19T00:00:00.000Z"),
            "value": 199.92
        },
        {
            "date": new Date("2009-11-22T00:00:00.000Z"),
            "value": 205.88
        },
        {
            "date": new Date("2009-11-23T00:00:00.000Z"),
            "value": 204.44
        },
        {
            "date": new Date("2009-11-24T00:00:00.000Z"),
            "value": 204.19
        },
        {
            "date": new Date("2009-11-25T00:00:00.000Z"),
            "value": 204.19
        },
        {
            "date": new Date("2009-11-26T00:00:00.000Z"),
            "value": 200.59
        },
        {
            "date": new Date("2009-11-29T00:00:00.000Z"),
            "value": 199.91
        },
        {
            "date": new Date("2009-12-01T00:00:00.000Z"),
            "value": 196.97
        },
        {
            "date": new Date("2009-12-02T00:00:00.000Z"),
            "value": 196.23
        },
        {
            "date": new Date("2009-12-03T00:00:00.000Z"),
            "value": 196.48
        },
        {
            "date": new Date("2009-12-04T00:00:00.000Z"),
            "value": 193.32
        },
        {
            "date": new Date("2009-12-07T00:00:00.000Z"),
            "value": 188.95
        },
        {
            "date": new Date("2009-12-08T00:00:00.000Z"),
            "value": 189.87
        },
        {
            "date": new Date("2009-12-09T00:00:00.000Z"),
            "value": 197.8
        },
        {
            "date": new Date("2009-12-09T00:00:00.000Z"),
            "value": 196.43
        },
        {
            "date": new Date("2009-12-10T00:00:00.000Z"),
            "value": 194.67
        },
        {
            "date": new Date("2009-12-13T00:00:00.000Z"),
            "value": 196.98
        },
        {
            "date": new Date("2009-12-14T00:00:00.000Z"),
            "value": 194.17
        },
        {
            "date": new Date("2009-12-15T00:00:00.000Z"),
            "value": 195.03
        },
        {
            "date": new Date("2009-12-16T00:00:00.000Z"),
            "value": 191.86
        },
        {
            "date": new Date("2009-12-17T00:00:00.000Z"),
            "value": 195.43
        },
        {
            "date": new Date("2009-12-20T00:00:00.000Z"),
            "value": 198.23
        },
        {
            "date": new Date("2009-12-21T00:00:00.000Z"),
            "value": 200.36
        },
        {
            "date": new Date("2009-12-22T00:00:00.000Z"),
            "value": 202.1
        },
        {
            "date": new Date("2009-12-23T00:00:00.000Z"),
            "value": 209.04
        },
        {
            "date": new Date("2009-12-24T00:00:00.000Z"),
            "value": 209.04
        },
        {
            "date": new Date("2009-12-27T00:00:00.000Z"),
            "value": 211.61
        },
        {
            "date": new Date("2009-12-28T00:00:00.000Z"),
            "value": 209.1
        },
        {
            "date": new Date("2009-12-29T00:00:00.000Z"),
            "value": 211.64
        },
        {
            "date": new Date("2009-12-30T00:00:00.000Z"),
            "value": 210.73
        },
        {
            "date": new Date("2010-01-01T00:00:00.000Z"),
            "value": 210.73
        },
        {
            "date": new Date("2010-01-04T00:00:00.000Z"),
            "value": 214.01
        },
        {
            "date": new Date("2010-01-05T00:00:00.000Z"),
            "value": 214.38
        },
        {
            "date": new Date("2010-01-06T00:00:00.000Z"),
            "value": 210.97
        },
        {
            "date": new Date("2010-01-07T00:00:00.000Z"),
            "value": 210.58
        },
        {
            "date": new Date("2010-01-08T00:00:00.000Z"),
            "value": 211.98
        },
        {
            "date": new Date("2010-01-10T00:00:00.000Z"),
            "value": 210.11
        },
        {
            "date": new Date("2010-01-11T00:00:00.000Z"),
            "value": 207.72
        },
        {
            "date": new Date("2010-01-12T00:00:00.000Z"),
            "value": 210.65
        },
        {
            "date": new Date("2010-01-13T00:00:00.000Z"),
            "value": 209.43
        },
        {
            "date": new Date("2010-01-14T00:00:00.000Z"),
            "value": 205.93
        },
        {
            "date": new Date("2010-01-17T00:00:00.000Z"),
            "value": 205.93
        },
        {
            "date": new Date("2010-01-18T00:00:00.000Z"),
            "value": 215.04
        },
        {
            "date": new Date("2010-01-19T00:00:00.000Z"),
            "value": 211.72
        },
        {
            "date": new Date("2010-01-20T00:00:00.000Z"),
            "value": 208.07
        },
        {
            "date": new Date("2010-01-21T00:00:00.000Z"),
            "value": 197.75
        },
        {
            "date": new Date("2010-01-24T00:00:00.000Z"),
            "value": 203.08
        },
        {
            "date": new Date("2010-01-25T00:00:00.000Z"),
            "value": 205.94
        },
        {
            "date": new Date("2010-01-26T00:00:00.000Z"),
            "value": 207.88
        },
        {
            "date": new Date("2010-01-27T00:00:00.000Z"),
            "value": 199.29
        },
        {
            "date": new Date("2010-01-28T00:00:00.000Z"),
            "value": 192.06
        },
        {
            "date": new Date("2010-02-01T00:00:00.000Z"),
            "value": 194.73
        },
        {
            "date": new Date("2010-02-02T00:00:00.000Z"),
            "value": 195.86
        },
        {
            "date": new Date("2010-02-03T00:00:00.000Z"),
            "value": 199.23
        },
        {
            "date": new Date("2010-02-04T00:00:00.000Z"),
            "value": 192.05
        },
        {
            "date": new Date("2010-02-05T00:00:00.000Z"),
            "value": 195.46
        },
        {
            "date": new Date("2010-02-08T00:00:00.000Z"),
            "value": 194.12
        },
        {
            "date": new Date("2010-02-09T00:00:00.000Z"),
            "value": 196.19
        },
        {
            "date": new Date("2010-02-09T00:00:00.000Z"),
            "value": 195.12
        },
        {
            "date": new Date("2010-02-10T00:00:00.000Z"),
            "value": 198.67
        },
        {
            "date": new Date("2010-02-11T00:00:00.000Z"),
            "value": 200.38
        },
        {
            "date": new Date("2010-02-14T00:00:00.000Z"),
            "value": 200.38
        },
        {
            "date": new Date("2010-02-15T00:00:00.000Z"),
            "value": 203.4
        },
        {
            "date": new Date("2010-02-16T00:00:00.000Z"),
            "value": 202.55
        },
        {
            "date": new Date("2010-02-17T00:00:00.000Z"),
            "value": 202.93
        },
        {
            "date": new Date("2010-02-18T00:00:00.000Z"),
            "value": 201.67
        },
        {
            "date": new Date("2010-02-21T00:00:00.000Z"),
            "value": 200.42
        },
        {
            "date": new Date("2010-02-22T00:00:00.000Z"),
            "value": 197.06
        },
        {
            "date": new Date("2010-02-23T00:00:00.000Z"),
            "value": 200.66
        },
        {
            "date": new Date("2010-02-24T00:00:00.000Z"),
            "value": 202
        },
        {
            "date": new Date("2010-02-25T00:00:00.000Z"),
            "value": 204.62
        },
        {
            "date": new Date("2010-03-01T00:00:00.000Z"),
            "value": 208.99
        },
        {
            "date": new Date("2010-03-02T00:00:00.000Z"),
            "value": 208.85
        },
        {
            "date": new Date("2010-03-03T00:00:00.000Z"),
            "value": 209.33
        },
        {
            "date": new Date("2010-03-04T00:00:00.000Z"),
            "value": 210.71
        },
        {
            "date": new Date("2010-03-05T00:00:00.000Z"),
            "value": 218.95
        },
        {
            "date": new Date("2010-03-08T00:00:00.000Z"),
            "value": 219.08
        },
        {
            "date": new Date("2010-03-09T00:00:00.000Z"),
            "value": 223.02
        },
        {
            "date": new Date("2010-03-09T00:00:00.000Z"),
            "value": 224.84
        },
        {
            "date": new Date("2010-03-10T00:00:00.000Z"),
            "value": 225.5
        },
        {
            "date": new Date("2010-03-11T00:00:00.000Z"),
            "value": 226.6
        },
        {
            "date": new Date("2010-03-14T00:00:00.000Z"),
            "value": 223.84
        },
        {
            "date": new Date("2010-03-15T00:00:00.000Z"),
            "value": 224.45
        },
        {
            "date": new Date("2010-03-16T00:00:00.000Z"),
            "value": 224.12
        },
        {
            "date": new Date("2010-03-17T00:00:00.000Z"),
            "value": 224.65
        },
        {
            "date": new Date("2010-03-18T00:00:00.000Z"),
            "value": 222.25
        },
        {
            "date": new Date("2010-03-21T00:00:00.000Z"),
            "value": 224.75
        },
        {
            "date": new Date("2010-03-22T00:00:00.000Z"),
            "value": 228.36
        },
        {
            "date": new Date("2010-03-23T00:00:00.000Z"),
            "value": 229.37
        },
        {
            "date": new Date("2010-03-24T00:00:00.000Z"),
            "value": 226.65
        },
        {
            "date": new Date("2010-03-25T00:00:00.000Z"),
            "value": 230.9
        },
        {
            "date": new Date("2010-03-28T00:00:00.000Z"),
            "value": 232.39
        },
        {
            "date": new Date("2010-03-29T00:00:00.000Z"),
            "value": 235.84
        },
        {
            "date": new Date("2010-03-30T00:00:00.000Z"),
            "value": 235
        },
        {
            "date": new Date("2010-04-01T00:00:00.000Z"),
            "value": 235.97
        },
        {
            "date": new Date("2010-04-02T00:00:00.000Z"),
            "value": 235.97
        },
        {
            "date": new Date("2010-04-05T00:00:00.000Z"),
            "value": 238.49
        },
        {
            "date": new Date("2010-04-06T00:00:00.000Z"),
            "value": 239.54
        },
        {
            "date": new Date("2010-04-07T00:00:00.000Z"),
            "value": 240.6
        },
        {
            "date": new Date("2010-04-08T00:00:00.000Z"),
            "value": 239.95
        },
        {
            "date": new Date("2010-04-09T00:00:00.000Z"),
            "value": 241.79
        },
        {
            "date": new Date("2010-04-11T00:00:00.000Z"),
            "value": 242.29
        },
        {
            "date": new Date("2010-04-12T00:00:00.000Z"),
            "value": 242.43
        },
        {
            "date": new Date("2010-04-13T00:00:00.000Z"),
            "value": 245.69
        },
        {
            "date": new Date("2010-04-14T00:00:00.000Z"),
            "value": 248.92
        },
        {
            "date": new Date("2010-04-15T00:00:00.000Z"),
            "value": 247.4
        },
        {
            "date": new Date("2010-04-18T00:00:00.000Z"),
            "value": 247.07
        },
        {
            "date": new Date("2010-04-19T00:00:00.000Z"),
            "value": 244.59
        },
        {
            "date": new Date("2010-04-20T00:00:00.000Z"),
            "value": 259.22
        },
        {
            "date": new Date("2010-04-21T00:00:00.000Z"),
            "value": 266.47
        },
        {
            "date": new Date("2010-04-22T00:00:00.000Z"),
            "value": 270.83
        },
        {
            "date": new Date("2010-04-25T00:00:00.000Z"),
            "value": 269.5
        },
        {
            "date": new Date("2010-04-26T00:00:00.000Z"),
            "value": 262.04
        },
        {
            "date": new Date("2010-04-27T00:00:00.000Z"),
            "value": 261.6
        },
        {
            "date": new Date("2010-04-28T00:00:00.000Z"),
            "value": 268.64
        },
        {
            "date": new Date("2010-04-29T00:00:00.000Z"),
            "value": 261.09
        },
        {
            "date": new Date("2010-05-03T00:00:00.000Z"),
            "value": 266.35
        },
        {
            "date": new Date("2010-05-04T00:00:00.000Z"),
            "value": 258.68
        },
        {
            "date": new Date("2010-05-05T00:00:00.000Z"),
            "value": 255.98
        },
        {
            "date": new Date("2010-05-06T00:00:00.000Z"),
            "value": 246.25
        },
        {
            "date": new Date("2010-05-07T00:00:00.000Z"),
            "value": 235.86
        },
        {
            "date": new Date("2010-05-09T00:00:00.000Z"),
            "value": 253.99
        },
        {
            "date": new Date("2010-05-10T00:00:00.000Z"),
            "value": 256.52
        },
        {
            "date": new Date("2010-05-11T00:00:00.000Z"),
            "value": 262.09
        },
        {
            "date": new Date("2010-05-12T00:00:00.000Z"),
            "value": 258.36
        },
        {
            "date": new Date("2010-05-13T00:00:00.000Z"),
            "value": 253.82
        },
        {
            "date": new Date("2010-05-16T00:00:00.000Z"),
            "value": 254.22
        },
        {
            "date": new Date("2010-05-17T00:00:00.000Z"),
            "value": 252.36
        },
        {
            "date": new Date("2010-05-18T00:00:00.000Z"),
            "value": 248.34
        },
        {
            "date": new Date("2010-05-19T00:00:00.000Z"),
            "value": 237.76
        },
        {
            "date": new Date("2010-05-20T00:00:00.000Z"),
            "value": 242.32
        },
        {
            "date": new Date("2010-05-23T00:00:00.000Z"),
            "value": 246.76
        },
        {
            "date": new Date("2010-05-24T00:00:00.000Z"),
            "value": 245.22
        },
        {
            "date": new Date("2010-05-25T00:00:00.000Z"),
            "value": 244.11
        },
        {
            "date": new Date("2010-05-26T00:00:00.000Z"),
            "value": 253.35
        },
        {
            "date": new Date("2010-05-27T00:00:00.000Z"),
            "value": 256.88
        },
        {
            "date": new Date("2010-05-30T00:00:00.000Z"),
            "value": 256.88
        },
        {
            "date": new Date("2010-06-01T00:00:00.000Z"),
            "value": 260.83
        },
        {
            "date": new Date("2010-06-02T00:00:00.000Z"),
            "value": 263.95
        },
        {
            "date": new Date("2010-06-03T00:00:00.000Z"),
            "value": 263.12
        },
        {
            "date": new Date("2010-06-04T00:00:00.000Z"),
            "value": 255.96
        },
        {
            "date": new Date("2010-06-07T00:00:00.000Z"),
            "value": 250.94
        },
        {
            "date": new Date("2010-06-08T00:00:00.000Z"),
            "value": 249.33
        },
        {
            "date": new Date("2010-06-09T00:00:00.000Z"),
            "value": 243.2
        },
        {
            "date": new Date("2010-06-09T00:00:00.000Z"),
            "value": 250.51
        },
        {
            "date": new Date("2010-06-10T00:00:00.000Z"),
            "value": 253.51
        },
        {
            "date": new Date("2010-06-13T00:00:00.000Z"),
            "value": 254.28
        },
        {
            "date": new Date("2010-06-14T00:00:00.000Z"),
            "value": 259.69
        },
        {
            "date": new Date("2010-06-15T00:00:00.000Z"),
            "value": 267.25
        },
        {
            "date": new Date("2010-06-16T00:00:00.000Z"),
            "value": 271.87
        },
        {
            "date": new Date("2010-06-17T00:00:00.000Z"),
            "value": 274.07
        },
        {
            "date": new Date("2010-06-20T00:00:00.000Z"),
            "value": 270.17
        },
        {
            "date": new Date("2010-06-21T00:00:00.000Z"),
            "value": 273.85
        },
        {
            "date": new Date("2010-06-22T00:00:00.000Z"),
            "value": 270.97
        },
        {
            "date": new Date("2010-06-23T00:00:00.000Z"),
            "value": 269
        },
        {
            "date": new Date("2010-06-24T00:00:00.000Z"),
            "value": 266.7
        },
        {
            "date": new Date("2010-06-27T00:00:00.000Z"),
            "value": 268.3
        },
        {
            "date": new Date("2010-06-28T00:00:00.000Z"),
            "value": 256.17
        },
        {
            "date": new Date("2010-06-29T00:00:00.000Z"),
            "value": 251.53
        },
        {
            "date": new Date("2010-07-01T00:00:00.000Z"),
            "value": 248.48
        },
        {
            "date": new Date("2010-07-02T00:00:00.000Z"),
            "value": 246.94
        },
        {
            "date": new Date("2010-07-05T00:00:00.000Z"),
            "value": 246.94
        },
        {
            "date": new Date("2010-07-06T00:00:00.000Z"),
            "value": 248.63
        },
        {
            "date": new Date("2010-07-07T00:00:00.000Z"),
            "value": 258.66
        },
        {
            "date": new Date("2010-07-08T00:00:00.000Z"),
            "value": 258.09
        },
        {
            "date": new Date("2010-07-09T00:00:00.000Z"),
            "value": 259.62
        },
        {
            "date": new Date("2010-07-11T00:00:00.000Z"),
            "value": 257.28
        },
        {
            "date": new Date("2010-07-12T00:00:00.000Z"),
            "value": 251.8
        },
        {
            "date": new Date("2010-07-13T00:00:00.000Z"),
            "value": 252.73
        },
        {
            "date": new Date("2010-07-14T00:00:00.000Z"),
            "value": 251.45
        },
        {
            "date": new Date("2010-07-15T00:00:00.000Z"),
            "value": 249.9
        },
        {
            "date": new Date("2010-07-18T00:00:00.000Z"),
            "value": 245.58
        },
        {
            "date": new Date("2010-07-19T00:00:00.000Z"),
            "value": 251.89
        },
        {
            "date": new Date("2010-07-20T00:00:00.000Z"),
            "value": 254.24
        },
        {
            "date": new Date("2010-07-21T00:00:00.000Z"),
            "value": 259.02
        },
        {
            "date": new Date("2010-07-22T00:00:00.000Z"),
            "value": 259.94
        },
        {
            "date": new Date("2010-07-25T00:00:00.000Z"),
            "value": 259.28
        },
        {
            "date": new Date("2010-07-26T00:00:00.000Z"),
            "value": 264.08
        },
        {
            "date": new Date("2010-07-27T00:00:00.000Z"),
            "value": 260.96
        },
        {
            "date": new Date("2010-07-28T00:00:00.000Z"),
            "value": 258.11
        },
        {
            "date": new Date("2010-07-29T00:00:00.000Z"),
            "value": 257.25
        },
        {
            "date": new Date("2010-08-02T00:00:00.000Z"),
            "value": 261.85
        },
        {
            "date": new Date("2010-08-03T00:00:00.000Z"),
            "value": 261.93
        },
        {
            "date": new Date("2010-08-04T00:00:00.000Z"),
            "value": 262.98
        },
        {
            "date": new Date("2010-08-05T00:00:00.000Z"),
            "value": 261.7
        },
        {
            "date": new Date("2010-08-06T00:00:00.000Z"),
            "value": 260.09
        },
        {
            "date": new Date("2010-08-09T00:00:00.000Z"),
            "value": 261.75
        },
        {
            "date": new Date("2010-08-09T00:00:00.000Z"),
            "value": 259.41
        },
        {
            "date": new Date("2010-08-10T00:00:00.000Z"),
            "value": 250.19
        },
        {
            "date": new Date("2010-08-11T00:00:00.000Z"),
            "value": 251.79
        },
        {
            "date": new Date("2010-08-12T00:00:00.000Z"),
            "value": 249.1
        },
        {
            "date": new Date("2010-08-15T00:00:00.000Z"),
            "value": 247.64
        },
        {
            "date": new Date("2010-08-16T00:00:00.000Z"),
            "value": 251.97
        },
        {
            "date": new Date("2010-08-17T00:00:00.000Z"),
            "value": 253.07
        },
        {
            "date": new Date("2010-08-18T00:00:00.000Z"),
            "value": 249.88
        },
        {
            "date": new Date("2010-08-19T00:00:00.000Z"),
            "value": 249.64
        },
        {
            "date": new Date("2010-08-22T00:00:00.000Z"),
            "value": 245.8
        },
        {
            "date": new Date("2010-08-23T00:00:00.000Z"),
            "value": 239.93
        },
        {
            "date": new Date("2010-08-24T00:00:00.000Z"),
            "value": 242.89
        },
        {
            "date": new Date("2010-08-25T00:00:00.000Z"),
            "value": 240.28
        },
        {
            "date": new Date("2010-08-26T00:00:00.000Z"),
            "value": 241.62
        },
        {
            "date": new Date("2010-08-29T00:00:00.000Z"),
            "value": 242.5
        },
        {
            "date": new Date("2010-08-30T00:00:00.000Z"),
            "value": 243.1
        },
        {
            "date": new Date("2010-09-01T00:00:00.000Z"),
            "value": 250.33
        },
        {
            "date": new Date("2010-09-02T00:00:00.000Z"),
            "value": 252.17
        },
        {
            "date": new Date("2010-09-03T00:00:00.000Z"),
            "value": 258.77
        },
        {
            "date": new Date("2010-09-06T00:00:00.000Z"),
            "value": 258.77
        },
        {
            "date": new Date("2010-09-07T00:00:00.000Z"),
            "value": 257.81
        },
        {
            "date": new Date("2010-09-08T00:00:00.000Z"),
            "value": 262.92
        },
        {
            "date": new Date("2010-09-09T00:00:00.000Z"),
            "value": 263.07
        },
        {
            "date": new Date("2010-09-09T00:00:00.000Z"),
            "value": 263.41
        },
        {
            "date": new Date("2010-09-12T00:00:00.000Z"),
            "value": 267.04
        },
        {
            "date": new Date("2010-09-13T00:00:00.000Z"),
            "value": 268.06
        },
        {
            "date": new Date("2010-09-14T00:00:00.000Z"),
            "value": 270.22
        },
        {
            "date": new Date("2010-09-15T00:00:00.000Z"),
            "value": 276.57
        },
        {
            "date": new Date("2010-09-16T00:00:00.000Z"),
            "value": 275.37
        },
        {
            "date": new Date("2010-09-19T00:00:00.000Z"),
            "value": 283.23
        },
        {
            "date": new Date("2010-09-20T00:00:00.000Z"),
            "value": 283.77
        },
        {
            "date": new Date("2010-09-21T00:00:00.000Z"),
            "value": 287.75
        },
        {
            "date": new Date("2010-09-22T00:00:00.000Z"),
            "value": 288.92
        },
        {
            "date": new Date("2010-09-23T00:00:00.000Z"),
            "value": 292.32
        },
        {
            "date": new Date("2010-09-26T00:00:00.000Z"),
            "value": 291.16
        },
        {
            "date": new Date("2010-09-27T00:00:00.000Z"),
            "value": 286.86
        },
        {
            "date": new Date("2010-09-28T00:00:00.000Z"),
            "value": 287.37
        },
        {
            "date": new Date("2010-09-29T00:00:00.000Z"),
            "value": 283.75
        },
        {
            "date": new Date("2010-10-01T00:00:00.000Z"),
            "value": 282.52
        },
        {
            "date": new Date("2010-10-04T00:00:00.000Z"),
            "value": 278.64
        },
        {
            "date": new Date("2010-10-05T00:00:00.000Z"),
            "value": 288.94
        },
        {
            "date": new Date("2010-10-06T00:00:00.000Z"),
            "value": 289.19
        },
        {
            "date": new Date("2010-10-07T00:00:00.000Z"),
            "value": 289.22
        },
        {
            "date": new Date("2010-10-08T00:00:00.000Z"),
            "value": 294.07
        },
        {
            "date": new Date("2010-10-10T00:00:00.000Z"),
            "value": 295.36
        },
        {
            "date": new Date("2010-10-11T00:00:00.000Z"),
            "value": 298.54
        },
        {
            "date": new Date("2010-10-12T00:00:00.000Z"),
            "value": 300.14
        },
        {
            "date": new Date("2010-10-13T00:00:00.000Z"),
            "value": 302.31
        },
        {
            "date": new Date("2010-10-14T00:00:00.000Z"),
            "value": 314.74
        },
        {
            "date": new Date("2010-10-17T00:00:00.000Z"),
            "value": 318
        },
        {
            "date": new Date("2010-10-18T00:00:00.000Z"),
            "value": 309.49
        },
        {
            "date": new Date("2010-10-19T00:00:00.000Z"),
            "value": 310.53
        },
        {
            "date": new Date("2010-10-20T00:00:00.000Z"),
            "value": 309.52
        },
        {
            "date": new Date("2010-10-21T00:00:00.000Z"),
            "value": 307.47
        },
        {
            "date": new Date("2010-10-24T00:00:00.000Z"),
            "value": 308.84
        },
        {
            "date": new Date("2010-10-25T00:00:00.000Z"),
            "value": 308.05
        },
        {
            "date": new Date("2010-10-26T00:00:00.000Z"),
            "value": 307.83
        },
        {
            "date": new Date("2010-10-27T00:00:00.000Z"),
            "value": 305.24
        },
        {
            "date": new Date("2010-10-28T00:00:00.000Z"),
            "value": 300.98
        },
        {
            "date": new Date("2010-11-01T00:00:00.000Z"),
            "value": 304.18
        },
        {
            "date": new Date("2010-11-02T00:00:00.000Z"),
            "value": 309.36
        },
        {
            "date": new Date("2010-11-03T00:00:00.000Z"),
            "value": 312.8
        },
        {
            "date": new Date("2010-11-04T00:00:00.000Z"),
            "value": 318.27
        },
        {
            "date": new Date("2010-11-05T00:00:00.000Z"),
            "value": 317.13
        },
        {
            "date": new Date("2010-11-08T00:00:00.000Z"),
            "value": 318.62
        },
        {
            "date": new Date("2010-11-09T00:00:00.000Z"),
            "value": 316.08
        },
        {
            "date": new Date("2010-11-09T00:00:00.000Z"),
            "value": 318.03
        },
        {
            "date": new Date("2010-11-10T00:00:00.000Z"),
            "value": 316.66
        },
        {
            "date": new Date("2010-11-11T00:00:00.000Z"),
            "value": 308.03
        },
        {
            "date": new Date("2010-11-14T00:00:00.000Z"),
            "value": 307.04
        },
        {
            "date": new Date("2010-11-15T00:00:00.000Z"),
            "value": 301.59
        },
        {
            "date": new Date("2010-11-16T00:00:00.000Z"),
            "value": 300.5
        },
        {
            "date": new Date("2010-11-17T00:00:00.000Z"),
            "value": 308.43
        },
        {
            "date": new Date("2010-11-18T00:00:00.000Z"),
            "value": 306.73
        },
        {
            "date": new Date("2010-11-21T00:00:00.000Z"),
            "value": 313.36
        },
        {
            "date": new Date("2010-11-22T00:00:00.000Z"),
            "value": 308.73
        },
        {
            "date": new Date("2010-11-23T00:00:00.000Z"),
            "value": 314.8
        },
        {
            "date": new Date("2010-11-25T00:00:00.000Z"),
            "value": 315
        },
        {
            "date": new Date("2010-11-28T00:00:00.000Z"),
            "value": 316.87
        },
        {
            "date": new Date("2010-11-29T00:00:00.000Z"),
            "value": 311.15
        },
        {
            "date": new Date("2010-12-01T00:00:00.000Z"),
            "value": 316.4
        },
        {
            "date": new Date("2010-12-02T00:00:00.000Z"),
            "value": 318.15
        },
        {
            "date": new Date("2010-12-03T00:00:00.000Z"),
            "value": 317.44
        },
        {
            "date": new Date("2010-12-06T00:00:00.000Z"),
            "value": 320.15
        },
        {
            "date": new Date("2010-12-07T00:00:00.000Z"),
            "value": 318.21
        },
        {
            "date": new Date("2010-12-08T00:00:00.000Z"),
            "value": 321.01
        },
        {
            "date": new Date("2010-12-09T00:00:00.000Z"),
            "value": 319.76
        },
        {
            "date": new Date("2010-12-09T00:00:00.000Z"),
            "value": 320.56
        },
        {
            "date": new Date("2010-12-12T00:00:00.000Z"),
            "value": 321.67
        },
        {
            "date": new Date("2010-12-13T00:00:00.000Z"),
            "value": 320.29
        },
        {
            "date": new Date("2010-12-14T00:00:00.000Z"),
            "value": 320.36
        },
        {
            "date": new Date("2010-12-15T00:00:00.000Z"),
            "value": 321.25
        },
        {
            "date": new Date("2010-12-16T00:00:00.000Z"),
            "value": 320.61
        },
        {
            "date": new Date("2010-12-19T00:00:00.000Z"),
            "value": 322.21
        },
        {
            "date": new Date("2010-12-20T00:00:00.000Z"),
            "value": 324.2
        },
        {
            "date": new Date("2010-12-21T00:00:00.000Z"),
            "value": 325.16
        },
        {
            "date": new Date("2010-12-22T00:00:00.000Z"),
            "value": 323.6
        },
        {
            "date": new Date("2010-12-26T00:00:00.000Z"),
            "value": 324.68
        },
        {
            "date": new Date("2010-12-27T00:00:00.000Z"),
            "value": 325.47
        },
        {
            "date": new Date("2010-12-28T00:00:00.000Z"),
            "value": 325.29
        },
        {
            "date": new Date("2010-12-29T00:00:00.000Z"),
            "value": 323.66
        },
        {
            "date": new Date("2010-12-30T00:00:00.000Z"),
            "value": 322.56
        },
        {
            "date": new Date("2011-01-03T00:00:00.000Z"),
            "value": 329.57
        },
        {
            "date": new Date("2011-01-04T00:00:00.000Z"),
            "value": 331.29
        },
        {
            "date": new Date("2011-01-05T00:00:00.000Z"),
            "value": 334
        },
        {
            "date": new Date("2011-01-06T00:00:00.000Z"),
            "value": 333.73
        },
        {
            "date": new Date("2011-01-07T00:00:00.000Z"),
            "value": 336.12
        },
        {
            "date": new Date("2011-01-09T00:00:00.000Z"),
            "value": 342.46
        },
        {
            "date": new Date("2011-01-10T00:00:00.000Z"),
            "value": 341.64
        },
        {
            "date": new Date("2011-01-11T00:00:00.000Z"),
            "value": 344.42
        },
        {
            "date": new Date("2011-01-12T00:00:00.000Z"),
            "value": 345.68
        },
        {
            "date": new Date("2011-01-13T00:00:00.000Z"),
            "value": 348.48
        },
        {
            "date": new Date("2011-01-17T00:00:00.000Z"),
            "value": 340.65
        },
        {
            "date": new Date("2011-01-18T00:00:00.000Z"),
            "value": 338.84
        },
        {
            "date": new Date("2011-01-19T00:00:00.000Z"),
            "value": 332.68
        },
        {
            "date": new Date("2011-01-20T00:00:00.000Z"),
            "value": 326.72
        },
        {
            "date": new Date("2011-01-23T00:00:00.000Z"),
            "value": 337.45
        },
        {
            "date": new Date("2011-01-24T00:00:00.000Z"),
            "value": 341.4
        },
        {
            "date": new Date("2011-01-25T00:00:00.000Z"),
            "value": 343.85
        },
        {
            "date": new Date("2011-01-26T00:00:00.000Z"),
            "value": 343.21
        },
        {
            "date": new Date("2011-01-27T00:00:00.000Z"),
            "value": 336.1
        },
        {
            "date": new Date("2011-01-30T00:00:00.000Z"),
            "value": 339.32
        },
        {
            "date": new Date("2011-02-01T00:00:00.000Z"),
            "value": 345.03
        },
        {
            "date": new Date("2011-02-02T00:00:00.000Z"),
            "value": 344.32
        },
        {
            "date": new Date("2011-02-03T00:00:00.000Z"),
            "value": 343.44
        },
        {
            "date": new Date("2011-02-04T00:00:00.000Z"),
            "value": 346.5
        },
        {
            "date": new Date("2011-02-07T00:00:00.000Z"),
            "value": 351.88
        },
        {
            "date": new Date("2011-02-08T00:00:00.000Z"),
            "value": 355.2
        },
        {
            "date": new Date("2011-02-09T00:00:00.000Z"),
            "value": 358.16
        },
        {
            "date": new Date("2011-02-09T00:00:00.000Z"),
            "value": 354.54
        },
        {
            "date": new Date("2011-02-10T00:00:00.000Z"),
            "value": 356.85
        },
        {
            "date": new Date("2011-02-13T00:00:00.000Z"),
            "value": 359.18
        },
        {
            "date": new Date("2011-02-14T00:00:00.000Z"),
            "value": 359.9
        },
        {
            "date": new Date("2011-02-15T00:00:00.000Z"),
            "value": 363.13
        },
        {
            "date": new Date("2011-02-16T00:00:00.000Z"),
            "value": 358.3
        },
        {
            "date": new Date("2011-02-17T00:00:00.000Z"),
            "value": 350.56
        },
        {
            "date": new Date("2011-02-21T00:00:00.000Z"),
            "value": 338.61
        },
        {
            "date": new Date("2011-02-22T00:00:00.000Z"),
            "value": 342.62
        },
        {
            "date": new Date("2011-02-23T00:00:00.000Z"),
            "value": 342.88
        },
        {
            "date": new Date("2011-02-24T00:00:00.000Z"),
            "value": 348.16
        },
        {
            "date": new Date("2011-02-27T00:00:00.000Z"),
            "value": 353.21
        },
        {
            "date": new Date("2011-03-01T00:00:00.000Z"),
            "value": 349.31
        },
        {
            "date": new Date("2011-03-02T00:00:00.000Z"),
            "value": 352.12
        },
        {
            "date": new Date("2011-03-03T00:00:00.000Z"),
            "value": 359.56
        },
        {
            "date": new Date("2011-03-04T00:00:00.000Z"),
            "value": 360
        },
        {
            "date": new Date("2011-03-07T00:00:00.000Z"),
            "value": 355.36
        },
        {
            "date": new Date("2011-03-08T00:00:00.000Z"),
            "value": 355.76
        },
        {
            "date": new Date("2011-03-09T00:00:00.000Z"),
            "value": 352.47
        },
        {
            "date": new Date("2011-03-09T00:00:00.000Z"),
            "value": 346.67
        },
        {
            "date": new Date("2011-03-10T00:00:00.000Z"),
            "value": 351.99
        },
        {
            "date": new Date("2011-03-13T00:00:00.000Z"),
            "value": 353.56
        },
        {
            "date": new Date("2011-03-14T00:00:00.000Z"),
            "value": 345.43
        },
        {
            "date": new Date("2011-03-15T00:00:00.000Z"),
            "value": 330.01
        },
        {
            "date": new Date("2011-03-16T00:00:00.000Z"),
            "value": 334.64
        },
        {
            "date": new Date("2011-03-17T00:00:00.000Z"),
            "value": 330.67
        },
        {
            "date": new Date("2011-03-20T00:00:00.000Z"),
            "value": 339.3
        },
        {
            "date": new Date("2011-03-21T00:00:00.000Z"),
            "value": 341.2
        },
        {
            "date": new Date("2011-03-22T00:00:00.000Z"),
            "value": 339.19
        },
        {
            "date": new Date("2011-03-23T00:00:00.000Z"),
            "value": 344.97
        },
        {
            "date": new Date("2011-03-24T00:00:00.000Z"),
            "value": 351.54
        },
        {
            "date": new Date("2011-03-27T00:00:00.000Z"),
            "value": 350.44
        },
        {
            "date": new Date("2011-03-28T00:00:00.000Z"),
            "value": 350.96
        },
        {
            "date": new Date("2011-03-29T00:00:00.000Z"),
            "value": 348.63
        },
        {
            "date": new Date("2011-03-30T00:00:00.000Z"),
            "value": 348.51
        },
        {
            "date": new Date("2011-04-01T00:00:00.000Z"),
            "value": 344.56
        },
        {
            "date": new Date("2011-04-04T00:00:00.000Z"),
            "value": 341.19
        },
        {
            "date": new Date("2011-04-05T00:00:00.000Z"),
            "value": 338.89
        },
        {
            "date": new Date("2011-04-06T00:00:00.000Z"),
            "value": 338.04
        },
        {
            "date": new Date("2011-04-07T00:00:00.000Z"),
            "value": 338.08
        },
        {
            "date": new Date("2011-04-08T00:00:00.000Z"),
            "value": 335.06
        },
        {
            "date": new Date("2011-04-10T00:00:00.000Z"),
            "value": 330.8
        },
        {
            "date": new Date("2011-04-11T00:00:00.000Z"),
            "value": 332.4
        },
        {
            "date": new Date("2011-04-12T00:00:00.000Z"),
            "value": 336.13
        },
        {
            "date": new Date("2011-04-13T00:00:00.000Z"),
            "value": 332.42
        },
        {
            "date": new Date("2011-04-14T00:00:00.000Z"),
            "value": 327.46
        },
        {
            "date": new Date("2011-04-17T00:00:00.000Z"),
            "value": 331.85
        },
        {
            "date": new Date("2011-04-18T00:00:00.000Z"),
            "value": 337.86
        },
        {
            "date": new Date("2011-04-19T00:00:00.000Z"),
            "value": 342.41
        },
        {
            "date": new Date("2011-04-20T00:00:00.000Z"),
            "value": 350.7
        },
        {
            "date": new Date("2011-04-24T00:00:00.000Z"),
            "value": 353.01
        },
        {
            "date": new Date("2011-04-25T00:00:00.000Z"),
            "value": 350.42
        },
        {
            "date": new Date("2011-04-26T00:00:00.000Z"),
            "value": 350.15
        },
        {
            "date": new Date("2011-04-27T00:00:00.000Z"),
            "value": 346.75
        },
        {
            "date": new Date("2011-04-28T00:00:00.000Z"),
            "value": 350.13
        },
        {
            "date": new Date("2011-05-02T00:00:00.000Z"),
            "value": 346.28
        },
        {
            "date": new Date("2011-05-03T00:00:00.000Z"),
            "value": 348.2
        },
        {
            "date": new Date("2011-05-04T00:00:00.000Z"),
            "value": 349.57
        },
        {
            "date": new Date("2011-05-05T00:00:00.000Z"),
            "value": 346.75
        },
        {
            "date": new Date("2011-05-06T00:00:00.000Z"),
            "value": 346.66
        },
        {
            "date": new Date("2011-05-09T00:00:00.000Z"),
            "value": 347.6
        },
        {
            "date": new Date("2011-05-09T00:00:00.000Z"),
            "value": 349.45
        },
        {
            "date": new Date("2011-05-10T00:00:00.000Z"),
            "value": 347.23
        },
        {
            "date": new Date("2011-05-11T00:00:00.000Z"),
            "value": 346.57
        },
        {
            "date": new Date("2011-05-12T00:00:00.000Z"),
            "value": 340.5
        },
        {
            "date": new Date("2011-05-15T00:00:00.000Z"),
            "value": 333.3
        },
        {
            "date": new Date("2011-05-16T00:00:00.000Z"),
            "value": 336.14
        },
        {
            "date": new Date("2011-05-17T00:00:00.000Z"),
            "value": 339.87
        },
        {
            "date": new Date("2011-05-18T00:00:00.000Z"),
            "value": 340.53
        },
        {
            "date": new Date("2011-05-19T00:00:00.000Z"),
            "value": 335.22
        },
        {
            "date": new Date("2011-05-22T00:00:00.000Z"),
            "value": 334.4
        },
        {
            "date": new Date("2011-05-23T00:00:00.000Z"),
            "value": 332.19
        },
        {
            "date": new Date("2011-05-24T00:00:00.000Z"),
            "value": 336.78
        },
        {
            "date": new Date("2011-05-25T00:00:00.000Z"),
            "value": 335
        },
        {
            "date": new Date("2011-05-26T00:00:00.000Z"),
            "value": 337.41
        },
        {
            "date": new Date("2011-05-30T00:00:00.000Z"),
            "value": 347.83
        },
        {
            "date": new Date("2011-06-01T00:00:00.000Z"),
            "value": 345.51
        },
        {
            "date": new Date("2011-06-02T00:00:00.000Z"),
            "value": 346.1
        },
        {
            "date": new Date("2011-06-03T00:00:00.000Z"),
            "value": 343.44
        },
        {
            "date": new Date("2011-06-06T00:00:00.000Z"),
            "value": 338.04
        },
        {
            "date": new Date("2011-06-07T00:00:00.000Z"),
            "value": 332.04
        },
        {
            "date": new Date("2011-06-08T00:00:00.000Z"),
            "value": 332.24
        },
        {
            "date": new Date("2011-06-09T00:00:00.000Z"),
            "value": 331.49
        },
        {
            "date": new Date("2011-06-09T00:00:00.000Z"),
            "value": 325.9
        },
        {
            "date": new Date("2011-06-12T00:00:00.000Z"),
            "value": 326.6
        },
        {
            "date": new Date("2011-06-13T00:00:00.000Z"),
            "value": 332.44
        },
        {
            "date": new Date("2011-06-14T00:00:00.000Z"),
            "value": 326.75
        },
        {
            "date": new Date("2011-06-15T00:00:00.000Z"),
            "value": 325.16
        },
        {
            "date": new Date("2011-06-16T00:00:00.000Z"),
            "value": 320.26
        },
        {
            "date": new Date("2011-06-19T00:00:00.000Z"),
            "value": 315.32
        },
        {
            "date": new Date("2011-06-20T00:00:00.000Z"),
            "value": 325.3
        },
        {
            "date": new Date("2011-06-21T00:00:00.000Z"),
            "value": 322.61
        },
        {
            "date": new Date("2011-06-22T00:00:00.000Z"),
            "value": 331.23
        },
        {
            "date": new Date("2011-06-23T00:00:00.000Z"),
            "value": 326.35
        },
        {
            "date": new Date("2011-06-26T00:00:00.000Z"),
            "value": 332.04
        },
        {
            "date": new Date("2011-06-27T00:00:00.000Z"),
            "value": 335.26
        },
        {
            "date": new Date("2011-06-28T00:00:00.000Z"),
            "value": 334.04
        },
        {
            "date": new Date("2011-06-29T00:00:00.000Z"),
            "value": 335.67
        },
        {
            "date": new Date("2011-07-01T00:00:00.000Z"),
            "value": 343.26
        },
        {
            "date": new Date("2011-07-05T00:00:00.000Z"),
            "value": 349.43
        },
        {
            "date": new Date("2011-07-06T00:00:00.000Z"),
            "value": 351.76
        },
        {
            "date": new Date("2011-07-07T00:00:00.000Z"),
            "value": 357.2
        },
        {
            "date": new Date("2011-07-08T00:00:00.000Z"),
            "value": 359.71
        },
        {
            "date": new Date("2011-07-10T00:00:00.000Z"),
            "value": 354
        },
        {
            "date": new Date("2011-07-11T00:00:00.000Z"),
            "value": 353.75
        },
        {
            "date": new Date("2011-07-12T00:00:00.000Z"),
            "value": 358.02
        },
        {
            "date": new Date("2011-07-13T00:00:00.000Z"),
            "value": 357.77
        },
        {
            "date": new Date("2011-07-14T00:00:00.000Z"),
            "value": 364.92
        },
        {
            "date": new Date("2011-07-17T00:00:00.000Z"),
            "value": 373.8
        },
        {
            "date": new Date("2011-07-18T00:00:00.000Z"),
            "value": 376.85
        },
        {
            "date": new Date("2011-07-19T00:00:00.000Z"),
            "value": 386.9
        },
        {
            "date": new Date("2011-07-20T00:00:00.000Z"),
            "value": 387.29
        },
        {
            "date": new Date("2011-07-21T00:00:00.000Z"),
            "value": 393.3
        },
        {
            "date": new Date("2011-07-24T00:00:00.000Z"),
            "value": 398.5
        },
        {
            "date": new Date("2011-07-25T00:00:00.000Z"),
            "value": 403.41
        },
        {
            "date": new Date("2011-07-26T00:00:00.000Z"),
            "value": 392.59
        },
        {
            "date": new Date("2011-07-27T00:00:00.000Z"),
            "value": 391.82
        },
        {
            "date": new Date("2011-07-28T00:00:00.000Z"),
            "value": 390.48
        },
        {
            "date": new Date("2011-08-01T00:00:00.000Z"),
            "value": 396.75
        },
        {
            "date": new Date("2011-08-02T00:00:00.000Z"),
            "value": 388.91
        },
        {
            "date": new Date("2011-08-03T00:00:00.000Z"),
            "value": 392.57
        },
        {
            "date": new Date("2011-08-04T00:00:00.000Z"),
            "value": 377.37
        },
        {
            "date": new Date("2011-08-05T00:00:00.000Z"),
            "value": 373.62
        },
        {
            "date": new Date("2011-08-08T00:00:00.000Z"),
            "value": 353.21
        },
        {
            "date": new Date("2011-08-09T00:00:00.000Z"),
            "value": 374.01
        },
        {
            "date": new Date("2011-08-09T00:00:00.000Z"),
            "value": 363.69
        },
        {
            "date": new Date("2011-08-10T00:00:00.000Z"),
            "value": 373.7
        },
        {
            "date": new Date("2011-08-11T00:00:00.000Z"),
            "value": 376.99
        },
        {
            "date": new Date("2011-08-14T00:00:00.000Z"),
            "value": 383.41
        },
        {
            "date": new Date("2011-08-15T00:00:00.000Z"),
            "value": 380.48
        },
        {
            "date": new Date("2011-08-16T00:00:00.000Z"),
            "value": 380.44
        },
        {
            "date": new Date("2011-08-17T00:00:00.000Z"),
            "value": 366.05
        },
        {
            "date": new Date("2011-08-18T00:00:00.000Z"),
            "value": 356.03
        },
        {
            "date": new Date("2011-08-21T00:00:00.000Z"),
            "value": 356.44
        },
        {
            "date": new Date("2011-08-22T00:00:00.000Z"),
            "value": 373.6
        },
        {
            "date": new Date("2011-08-23T00:00:00.000Z"),
            "value": 376.18
        },
        {
            "date": new Date("2011-08-24T00:00:00.000Z"),
            "value": 373.72
        },
        {
            "date": new Date("2011-08-25T00:00:00.000Z"),
            "value": 383.58
        },
        {
            "date": new Date("2011-08-28T00:00:00.000Z"),
            "value": 389.97
        },
        {
            "date": new Date("2011-08-29T00:00:00.000Z"),
            "value": 389.99
        },
        {
            "date": new Date("2011-08-30T00:00:00.000Z"),
            "value": 384.83
        },
        {
            "date": new Date("2011-09-01T00:00:00.000Z"),
            "value": 381.03
        },
        {
            "date": new Date("2011-09-02T00:00:00.000Z"),
            "value": 374.05
        },
        {
            "date": new Date("2011-09-06T00:00:00.000Z"),
            "value": 379.74
        },
        {
            "date": new Date("2011-09-07T00:00:00.000Z"),
            "value": 383.93
        },
        {
            "date": new Date("2011-09-08T00:00:00.000Z"),
            "value": 384.14
        },
        {
            "date": new Date("2011-09-09T00:00:00.000Z"),
            "value": 377.48
        },
        {
            "date": new Date("2011-09-11T00:00:00.000Z"),
            "value": 379.94
        },
        {
            "date": new Date("2011-09-12T00:00:00.000Z"),
            "value": 384.62
        },
        {
            "date": new Date("2011-09-13T00:00:00.000Z"),
            "value": 389.3
        },
        {
            "date": new Date("2011-09-14T00:00:00.000Z"),
            "value": 392.96
        },
        {
            "date": new Date("2011-09-15T00:00:00.000Z"),
            "value": 400.5
        },
        {
            "date": new Date("2011-09-18T00:00:00.000Z"),
            "value": 411.63
        },
        {
            "date": new Date("2011-09-19T00:00:00.000Z"),
            "value": 413.45
        },
        {
            "date": new Date("2011-09-20T00:00:00.000Z"),
            "value": 412.14
        },
        {
            "date": new Date("2011-09-21T00:00:00.000Z"),
            "value": 401.82
        },
        {
            "date": new Date("2011-09-22T00:00:00.000Z"),
            "value": 404.3
        },
        {
            "date": new Date("2011-09-25T00:00:00.000Z"),
            "value": 403.17
        },
        {
            "date": new Date("2011-09-26T00:00:00.000Z"),
            "value": 399.26
        },
        {
            "date": new Date("2011-09-27T00:00:00.000Z"),
            "value": 397.01
        },
        {
            "date": new Date("2011-09-28T00:00:00.000Z"),
            "value": 390.57
        },
        {
            "date": new Date("2011-09-29T00:00:00.000Z"),
            "value": 381.32
        },
        {
            "date": new Date("2011-10-03T00:00:00.000Z"),
            "value": 374.6
        },
        {
            "date": new Date("2011-10-04T00:00:00.000Z"),
            "value": 372.5
        },
        {
            "date": new Date("2011-10-05T00:00:00.000Z"),
            "value": 378.25
        },
        {
            "date": new Date("2011-10-06T00:00:00.000Z"),
            "value": 377.37
        },
        {
            "date": new Date("2011-10-07T00:00:00.000Z"),
            "value": 369.8
        },
        {
            "date": new Date("2011-10-09T00:00:00.000Z"),
            "value": 388.81
        },
        {
            "date": new Date("2011-10-10T00:00:00.000Z"),
            "value": 400.29
        },
        {
            "date": new Date("2011-10-11T00:00:00.000Z"),
            "value": 402.19
        },
        {
            "date": new Date("2011-10-12T00:00:00.000Z"),
            "value": 408.43
        },
        {
            "date": new Date("2011-10-13T00:00:00.000Z"),
            "value": 422
        },
        {
            "date": new Date("2011-10-16T00:00:00.000Z"),
            "value": 419.99
        },
        {
            "date": new Date("2011-10-17T00:00:00.000Z"),
            "value": 422.24
        },
        {
            "date": new Date("2011-10-18T00:00:00.000Z"),
            "value": 398.62
        },
        {
            "date": new Date("2011-10-19T00:00:00.000Z"),
            "value": 395.31
        },
        {
            "date": new Date("2011-10-20T00:00:00.000Z"),
            "value": 392.87
        },
        {
            "date": new Date("2011-10-23T00:00:00.000Z"),
            "value": 405.77
        },
        {
            "date": new Date("2011-10-24T00:00:00.000Z"),
            "value": 397.77
        },
        {
            "date": new Date("2011-10-25T00:00:00.000Z"),
            "value": 400.6
        },
        {
            "date": new Date("2011-10-26T00:00:00.000Z"),
            "value": 404.69
        },
        {
            "date": new Date("2011-10-27T00:00:00.000Z"),
            "value": 404.95
        },
        {
            "date": new Date("2011-10-30T00:00:00.000Z"),
            "value": 404.78
        },
        {
            "date": new Date("2011-11-01T00:00:00.000Z"),
            "value": 396.51
        },
        {
            "date": new Date("2011-11-02T00:00:00.000Z"),
            "value": 397.41
        },
        {
            "date": new Date("2011-11-03T00:00:00.000Z"),
            "value": 403.07
        },
        {
            "date": new Date("2011-11-04T00:00:00.000Z"),
            "value": 400.24
        },
        {
            "date": new Date("2011-11-07T00:00:00.000Z"),
            "value": 399.73
        },
        {
            "date": new Date("2011-11-08T00:00:00.000Z"),
            "value": 406.23
        },
        {
            "date": new Date("2011-11-09T00:00:00.000Z"),
            "value": 395.28
        },
        {
            "date": new Date("2011-11-09T00:00:00.000Z"),
            "value": 385.22
        },
        {
            "date": new Date("2011-11-10T00:00:00.000Z"),
            "value": 384.62
        },
        {
            "date": new Date("2011-11-13T00:00:00.000Z"),
            "value": 379.26
        },
        {
            "date": new Date("2011-11-14T00:00:00.000Z"),
            "value": 388.83
        },
        {
            "date": new Date("2011-11-15T00:00:00.000Z"),
            "value": 384.77
        },
        {
            "date": new Date("2011-11-16T00:00:00.000Z"),
            "value": 377.41
        },
        {
            "date": new Date("2011-11-17T00:00:00.000Z"),
            "value": 374.94
        },
        {
            "date": new Date("2011-11-20T00:00:00.000Z"),
            "value": 369.01
        },
        {
            "date": new Date("2011-11-21T00:00:00.000Z"),
            "value": 376.51
        },
        {
            "date": new Date("2011-11-22T00:00:00.000Z"),
            "value": 366.99
        },
        {
            "date": new Date("2011-11-24T00:00:00.000Z"),
            "value": 363.57
        },
        {
            "date": new Date("2011-11-27T00:00:00.000Z"),
            "value": 376.12
        },
        {
            "date": new Date("2011-11-28T00:00:00.000Z"),
            "value": 373.2
        },
        {
            "date": new Date("2011-11-29T00:00:00.000Z"),
            "value": 382.2
        },
        {
            "date": new Date("2011-12-01T00:00:00.000Z"),
            "value": 387.93
        },
        {
            "date": new Date("2011-12-02T00:00:00.000Z"),
            "value": 389.7
        },
        {
            "date": new Date("2011-12-05T00:00:00.000Z"),
            "value": 393.01
        },
        {
            "date": new Date("2011-12-06T00:00:00.000Z"),
            "value": 390.95
        },
        {
            "date": new Date("2011-12-07T00:00:00.000Z"),
            "value": 389.09
        },
        {
            "date": new Date("2011-12-08T00:00:00.000Z"),
            "value": 390.66
        },
        {
            "date": new Date("2011-12-09T00:00:00.000Z"),
            "value": 393.62
        },
        {
            "date": new Date("2011-12-11T00:00:00.000Z"),
            "value": 391.84
        },
        {
            "date": new Date("2011-12-12T00:00:00.000Z"),
            "value": 388.81
        },
        {
            "date": new Date("2011-12-13T00:00:00.000Z"),
            "value": 380.19
        },
        {
            "date": new Date("2011-12-14T00:00:00.000Z"),
            "value": 378.94
        },
        {
            "date": new Date("2011-12-15T00:00:00.000Z"),
            "value": 381.02
        },
        {
            "date": new Date("2011-12-18T00:00:00.000Z"),
            "value": 382.21
        },
        {
            "date": new Date("2011-12-19T00:00:00.000Z"),
            "value": 395.95
        },
        {
            "date": new Date("2011-12-20T00:00:00.000Z"),
            "value": 396.44
        },
        {
            "date": new Date("2011-12-21T00:00:00.000Z"),
            "value": 398.55
        },
        {
            "date": new Date("2011-12-22T00:00:00.000Z"),
            "value": 403.43
        },
        {
            "date": new Date("2011-12-26T00:00:00.000Z"),
            "value": 406.53
        },
        {
            "date": new Date("2011-12-27T00:00:00.000Z"),
            "value": 402.64
        },
        {
            "date": new Date("2011-12-28T00:00:00.000Z"),
            "value": 405.12
        },
        {
            "date": new Date("2011-12-29T00:00:00.000Z"),
            "value": 405
        },
        {
            "date": new Date("2012-01-03T00:00:00.000Z"),
            "value": 411.23
        },
        {
            "date": new Date("2012-01-04T00:00:00.000Z"),
            "value": 413.44
        },
        {
            "date": new Date("2012-01-05T00:00:00.000Z"),
            "value": 418.03
        },
        {
            "date": new Date("2012-01-06T00:00:00.000Z"),
            "value": 422.4
        },
        {
            "date": new Date("2012-01-09T00:00:00.000Z"),
            "value": 421.73
        },
        {
            "date": new Date("2012-01-09T00:00:00.000Z"),
            "value": 423.24
        },
        {
            "date": new Date("2012-01-10T00:00:00.000Z"),
            "value": 422.55
        },
        {
            "date": new Date("2012-01-11T00:00:00.000Z"),
            "value": 421.39
        },
        {
            "date": new Date("2012-01-12T00:00:00.000Z"),
            "value": 419.81
        },
        {
            "date": new Date("2012-01-16T00:00:00.000Z"),
            "value": 424.7
        },
        {
            "date": new Date("2012-01-17T00:00:00.000Z"),
            "value": 429.11
        },
        {
            "date": new Date("2012-01-18T00:00:00.000Z"),
            "value": 427.75
        },
        {
            "date": new Date("2012-01-19T00:00:00.000Z"),
            "value": 420.3
        },
        {
            "date": new Date("2012-01-22T00:00:00.000Z"),
            "value": 427.41
        },
        {
            "date": new Date("2012-01-23T00:00:00.000Z"),
            "value": 420.41
        },
        {
            "date": new Date("2012-01-24T00:00:00.000Z"),
            "value": 446.66
        },
        {
            "date": new Date("2012-01-25T00:00:00.000Z"),
            "value": 444.63
        },
        {
            "date": new Date("2012-01-26T00:00:00.000Z"),
            "value": 447.28
        },
        {
            "date": new Date("2012-01-29T00:00:00.000Z"),
            "value": 453.01
        },
        {
            "date": new Date("2012-01-30T00:00:00.000Z"),
            "value": 456.48
        },
        {
            "date": new Date("2012-02-01T00:00:00.000Z"),
            "value": 456.19
        },
        {
            "date": new Date("2012-02-02T00:00:00.000Z"),
            "value": 455.12
        },
        {
            "date": new Date("2012-02-03T00:00:00.000Z"),
            "value": 459.68
        },
        {
            "date": new Date("2012-02-06T00:00:00.000Z"),
            "value": 463.97
        },
        {
            "date": new Date("2012-02-07T00:00:00.000Z"),
            "value": 468.83
        },
        {
            "date": new Date("2012-02-08T00:00:00.000Z"),
            "value": 476.68
        },
        {
            "date": new Date("2012-02-09T00:00:00.000Z"),
            "value": 493.17
        },
        {
            "date": new Date("2012-02-09T00:00:00.000Z"),
            "value": 493.42
        },
        {
            "date": new Date("2012-02-12T00:00:00.000Z"),
            "value": 502.6
        },
        {
            "date": new Date("2012-02-13T00:00:00.000Z"),
            "value": 509.46
        },
        {
            "date": new Date("2012-02-14T00:00:00.000Z"),
            "value": 497.67
        },
        {
            "date": new Date("2012-02-15T00:00:00.000Z"),
            "value": 502.21
        },
        {
            "date": new Date("2012-02-16T00:00:00.000Z"),
            "value": 502.12
        },
        {
            "date": new Date("2012-02-20T00:00:00.000Z"),
            "value": 514.85
        },
        {
            "date": new Date("2012-02-21T00:00:00.000Z"),
            "value": 513.04
        },
        {
            "date": new Date("2012-02-22T00:00:00.000Z"),
            "value": 516.39
        },
        {
            "date": new Date("2012-02-23T00:00:00.000Z"),
            "value": 522.41
        },
        {
            "date": new Date("2012-02-26T00:00:00.000Z"),
            "value": 525.76
        },
        {
            "date": new Date("2012-02-27T00:00:00.000Z"),
            "value": 535.41
        },
        {
            "date": new Date("2012-02-28T00:00:00.000Z"),
            "value": 542.44
        },
        {
            "date": new Date("2012-03-01T00:00:00.000Z"),
            "value": 544.47
        },
        {
            "date": new Date("2012-03-02T00:00:00.000Z"),
            "value": 545.18
        },
        {
            "date": new Date("2012-03-05T00:00:00.000Z"),
            "value": 533.16
        },
        {
            "date": new Date("2012-03-06T00:00:00.000Z"),
            "value": 530.26
        },
        {
            "date": new Date("2012-03-07T00:00:00.000Z"),
            "value": 530.69
        },
        {
            "date": new Date("2012-03-08T00:00:00.000Z"),
            "value": 541.99
        },
        {
            "date": new Date("2012-03-09T00:00:00.000Z"),
            "value": 545.17
        },
        {
            "date": new Date("2012-03-11T00:00:00.000Z"),
            "value": 552
        },
        {
            "date": new Date("2012-03-12T00:00:00.000Z"),
            "value": 568.1
        },
        {
            "date": new Date("2012-03-13T00:00:00.000Z"),
            "value": 589.58
        },
        {
            "date": new Date("2012-03-14T00:00:00.000Z"),
            "value": 585.56
        },
        {
            "date": new Date("2012-03-15T00:00:00.000Z"),
            "value": 585.57
        },
        {
            "date": new Date("2012-03-18T00:00:00.000Z"),
            "value": 601.1
        },
        {
            "date": new Date("2012-03-19T00:00:00.000Z"),
            "value": 605.96
        },
        {
            "date": new Date("2012-03-20T00:00:00.000Z"),
            "value": 602.5
        },
        {
            "date": new Date("2012-03-21T00:00:00.000Z"),
            "value": 599.34
        },
        {
            "date": new Date("2012-03-22T00:00:00.000Z"),
            "value": 596.05
        },
        {
            "date": new Date("2012-03-25T00:00:00.000Z"),
            "value": 606.98
        },
        {
            "date": new Date("2012-03-26T00:00:00.000Z"),
            "value": 614.48
        },
        {
            "date": new Date("2012-03-27T00:00:00.000Z"),
            "value": 617.62
        },
        {
            "date": new Date("2012-03-28T00:00:00.000Z"),
            "value": 609.86
        },
        {
            "date": new Date("2012-03-29T00:00:00.000Z"),
            "value": 599.55
        },
        {
            "date": new Date("2012-04-02T00:00:00.000Z"),
            "value": 618.63
        },
        {
            "date": new Date("2012-04-03T00:00:00.000Z"),
            "value": 629.32
        },
        {
            "date": new Date("2012-04-04T00:00:00.000Z"),
            "value": 624.31
        },
        {
            "date": new Date("2012-04-05T00:00:00.000Z"),
            "value": 633.68
        },
        {
            "date": new Date("2012-04-09T00:00:00.000Z"),
            "value": 636.23
        },
        {
            "date": new Date("2012-04-09T00:00:00.000Z"),
            "value": 628.44
        },
        {
            "date": new Date("2012-04-10T00:00:00.000Z"),
            "value": 626.2
        },
        {
            "date": new Date("2012-04-11T00:00:00.000Z"),
            "value": 622.77
        },
        {
            "date": new Date("2012-04-12T00:00:00.000Z"),
            "value": 605.23
        },
        {
            "date": new Date("2012-04-15T00:00:00.000Z"),
            "value": 580.13
        },
        {
            "date": new Date("2012-04-16T00:00:00.000Z"),
            "value": 609.7
        },
        {
            "date": new Date("2012-04-17T00:00:00.000Z"),
            "value": 608.34
        },
        {
            "date": new Date("2012-04-18T00:00:00.000Z"),
            "value": 587.44
        },
        {
            "date": new Date("2012-04-19T00:00:00.000Z"),
            "value": 572.98
        },
        {
            "date": new Date("2012-04-22T00:00:00.000Z"),
            "value": 571.7
        },
        {
            "date": new Date("2012-04-23T00:00:00.000Z"),
            "value": 560.28
        },
        {
            "date": new Date("2012-04-24T00:00:00.000Z"),
            "value": 610
        },
        {
            "date": new Date("2012-04-25T00:00:00.000Z"),
            "value": 607.7
        },
        {
            "date": new Date("2012-04-26T00:00:00.000Z"),
            "value": 603
        },
        {
            "date": new Date("2012-04-29T00:00:00.000Z"),
            "value": 583.98
        },
        {
            "date": new Date("2012-05-01T00:00:00.000Z"),
            "value": 582.13
        }
    ];
}