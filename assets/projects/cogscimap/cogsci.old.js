console.log(cogscimap);

function makeBirectional(graph, nextkey) {
    for (let [key, value] of Object.entries(graph)) {
        value[nextkey].forEach(next => {
            if(graph[next][nextkey].includes(key) == false) {
                graph[next][nextkey].push(key);
            } 
        });
    }
}

function transform(graph, nextkey) {
    var data = {
        nodes: [],
        links: []
    };

    for (let [key, value] of Object.entries(graph)) {false
        data.nodes.push(value)
        data.nodes[data.nodes.length - 1].id = key
        data.nodes[data.nodes.length - 1].name = key

        value[nextkey].forEach(next => {
            if(graph[next][nextkey].includes(key) == true && !data.links.some(link => link.source == next && link.target == key)) {
                data.links.push({
                    source: key,
                    target: next
                });
            } 
        });
    }

    return data
}

function preprocess(data) {
    makeBirectional(data, "next")
    return transform(data, "next")
}

let graphDiv = "graph";

let data = preprocess(cogscimap)

var margin = {
        top: document.getElementById("header").clientHeight + 100,
        right: 30,
        bottom: 30,
        left: 40
    },
    width = document.getElementById("header").clientWidth - margin.left - margin.right,
    height = (screen.height - (document.getElementById("footer").clientHeight + document.getElementById("header").clientHeight + 120)) - margin.top - margin.bottom;

let radius = 20;

var svg = d3.select("#" + graphDiv)
    .append("svg")
    // .attr("width", width + margin.left + margin.right)
    // .attr("height", height + margin.top + margin.bottom)
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom + document.getElementById("footer").clientHeight + document.getElementById("header").clientHeight + 120)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + (margin.top + document.getElementById("header").clientHeight + 120) + ")");

// Initialize the links
var link = svg
    .selectAll("line")
    .data(data.links)
    .enter()
    .append("line")
    .style("stroke", "red");

// Initialize the nodes
var node = svg
    .selectAll("circle")
    .data(data.nodes)
    .enter()
    .append("circle")
    .attr("r", radius)
    .style("stroke", "yellow")
    .style("fill", "black");

var simulation = d3.forceSimulation(data.nodes)
    .force('charge', d3.forceManyBody().strength(-5000))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('link', d3.forceLink().id(d => d.id).links(data.links))
    .force('collision', d3.forceCollide().radius(d => d.radius + 30))
    .on('tick', ticked);

function ticked() {
    link
        .attr("x1", function(d) { return d.source.x + (radius / 2); })
        .attr("y1", function(d) { return d.source.y - (radius / 2); })
        .attr("x2", function(d) { return d.target.x + (radius / 2); })
        .attr("y2", function(d) { return d.target.y - (radius / 2); });

    node
        .attr("cx", function (d) { return d.x + (radius / 2); })
        .attr("cy", function(d) { return d.y - (radius / 2); });
}

