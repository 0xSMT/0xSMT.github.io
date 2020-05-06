// console.log(cogscimap);

function makeBirectional(graph, nextkey) {
    for (let [key, value] of Object.entries(graph)) {
        value[nextkey].forEach(next => {
            try {
                if(graph[next][nextkey].includes(key) == false) {
                    graph[next][nextkey].push(key);
                } 
            } catch(err) {
                console.log("ERROR with graph[" + next + "]\t" + err)
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

function connectingEdges(id) {
    return d3.selectAll("line")
        .filter(function(link) {
            return link.source.id == id || link.target.id == id;
        });
}

function nonconnectingEdges(id) {
    return d3.selectAll("line")
        .filter(function(link) {
            return link.source.id != id && link.target.id != id;
        });
}

function getCircle(id) {
    return d3.selectAll("circle")
        .filter(function(node) {
            return node.id == id;
        });
}

function notCircle(id) {
    return d3.selectAll("circle")
        .filter(function(node) {
            return node.id != id;
        });
}

function allEdges() {
    return d3.selectAll("line");
}

function allNodes() {
    return d3.selectAll("circle");
}

function fadeLines(elements) {
    elements
        .transition()
        .duration(1500)
            .style("stroke", "red")
            .style("stroke-width", "3")
            .style("opacity", 0.1);
}

function growLines(elements) {
    elements
        .transition()
        .duration(1500)
            .style("stroke", "red")
            .style("stroke-width", "6")
            .style("opacity", 1.0);
}

function growNodes(elements) {
    elements
        .transition()
        .duration(1500)
            .attr("r", radius * 2)
            .style("opacity", 1.0);
}

function resetLines(elements) {
    elements
        .transition()
        .duration(1500)
            .style("stroke", "red")
            .style("stroke-width", "3")
            .style("opacity", 1.0);
}

function resetNodes(elements) {
    elements
        .transition()
        .duration(1500)
            .attr("r", radius)
            .style("opacity", 1.0);
}

// function fadeNodes(elements) {
//     elements
//         .transition()
//         .duration(1500)
//             .attr("r", radius)
//             .style("opacity", );
// }


// let circle = null;
function clickedNode(d) {
    var x, y, k;
  
    if (focus !== d) {
        x = d.x
        y = d.y
        k = 4;

        if(focus != null) {
            // getCircle(focus.id)
            //     .transition()
            //         .duration(1500)
            //         .attr("r", radius);
            // connectingEdges(focus.id)
            //     .transition()
            //         .duration(1500)
            //         .style("stroke-width", "3")
            //         .style("stroke", "red");
            resetNodes(getCircle(focus.id));
            resetLines(connectingEdges(focus.id));
        }

        focus = d;
        // circle = this;

        // connectingEdges(focus.id)
        //     .raise()
        //     .transition()
        //         .duration(1500)
        //         .style("stroke-width", "6")
        //         .style("stroke", "blue");
        growLines(connectingEdges(focus.id));
        fadeLines(nonconnectingEdges(focus.id));
        growNodes(getCircle(focus.id));

        // getCircle(focus.id)
        //     .transition()
        //         .duration(1500)
        //         .attr("r", radius * 2);
        
        d3.selectAll("circle").raise();
    } else {
        popupModal(d);
        return;
    }
  
    // g.selectAll("circle")
        // .classed("active", focus && function(d) { return d === focus; });
  
    g.transition()
        .duration(750)
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
        .style("stroke-width", 1.5 / k + "px");
}

function clickedLine(d) {
    if(focus != null) {
        if(d.source.id == focus.id) {
            clickedNode(d.target);
        } else if(d.target.id == focus.id) {
            clickedNode(d.source);
        } else {
            var x, y, k;

            x = width / 2;
            y = height / 2;
            k = 1;

            // getCircle(focus.id)
            //     .transition()
            //         .duration(1500)
            //         .attr("r", radius);

            // connectingEdges(focus.id)
            //     .transition()
            //         .duration(1500)
            //         .style("stroke-width", "3")
            //         .style("stroke", "red");
            resetNodes(getCircle(focus.id));
            resetLines(connectingEdges(focus.id));

            
            // circle = null;
            focus = null;

            g.transition()
                .duration(750)
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
                .style("stroke-width", 1.5 / k + "px");
        }
    }
}

function clickedBackground(d) {
    var x, y, k;

    x = width / 2;
    y = height / 2;
    k = 1;

    // getCircle(focus.id)
    //     .transition()
    //         .duration(1500)
    //         .attr("r", radius);

    // connectingEdges(focus.id)
    //     .transition()
    //         .duration(1500)
    //         .style("stroke-width", "3")
    //         .style("stroke", "red");
    resetNodes(getCircle(focus.id));
    resetLines(allEdges());
    
    // circle = null;
    focus = null;

    g.transition()
        .duration(750)
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
        .style("stroke-width", 1.5 / k + "px");
}

function mouseoverNode(d) {
    putHover(d.id, d3.event.pageX, d3.event.pageY);
}

function mouseoutNode(d) {
    hideHover();
}

function mousemoveNode(d) {
    putHover(d.id, d3.event.pageX, d3.event.pageY);
}

function mouseoverLine(d) {
    if(focus != null) {
        if(d.source.id == focus.id) {
            putHover(d.target.id, d3.event.pageX, d3.event.pageY);

            
        } else if(d.target.id == focus.id) {
            putHover(d.source.id, d3.event.pageX, d3.event.pageY);
        }
    }
}

function mouseoutLine(d) {
    hideHover();
}

function mousemoveLine(d) {
    if(focus != null) {
        if(d.source.id == focus.id) {
            putHover(d.target.id, d3.event.pageX, d3.event.pageY);
        } else if(d.target.id == focus.id) {
            putHover(d.source.id, d3.event.pageX, d3.event.pageY);
        }
    }
}

function popupModal(node) {
    console.log(node);
    console.log(data)
}

let graphDiv = "graph";

let frame = 4;

var margin = {
        top: 50,
        right: 20,
        bottom: 20,
        left: 20
    },
    width = window.innerWidth - margin.left - margin.right - frame,
    height = (window.innerHeight - margin.top - margin.bottom) - frame;

let radius = 15;

var svg = d3.select("#" + graphDiv)
    .append("svg")
    .attr("width", width + margin.left + margin.right - frame)
    .attr("height", height + margin.top + margin.bottom - frame);

const g = svg
            .append("g")
            .attr(  "transform",
                    "translate(" + parseInt(margin.left) + "," + parseInt(margin.top) + ")");

g.append("rect")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("opacity", 0)
    // .attr(  "transform",
    //         "translate(" + margin.left + "," + margin.top + ")")
    .on("click", clickedBackground);

var focus = null;
let data = null;

function createGraph(graph) {
    data = preprocess(graph)

    // Initialize the links
    var link = g
        .selectAll("line")
        .data(data.links)
        .enter()
        .append("line")
        .style("stroke", "red")
        .style("stroke-width", "3")
        .on("click", clickedLine)
        .on("mouseover", mouseoverLine)
        .on("mouseout", mouseoutLine)
        .on("mousemove", mousemoveLine);

    // Initialize the nodes
    var node = g
        .selectAll("circle")
        .data(data.nodes)
        .enter()
        .append("circle")
        .attr("r", radius)
        .style("stroke", "gold")
        .style("stroke-width", "3")
        .style("fill", "black")
        .on("click", clickedNode)
        .on("mouseover", mouseoverNode)
        .on("mouseout", mouseoutNode)
        .on("mousemove", mousemoveNode);

    d3.forceSimulation(data.nodes)
        .force('charge', d3.forceManyBody().strength(-700).distanceMin(150).distanceMax(300))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('link', d3.forceLink().id(d => d.id).links(data.links))
        .force('collision', d3.forceCollide().radius(radius * 2))
        .on('tick', ticked);

    function ticked() {
        link
            .attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        node
            .attr("cx", function (d) {
                if(d.id == "Cognitive Science") {
                    return d.x = width / 2
                } else {
                    return d.x = Math.max(
                        radius + margin.left,
                        Math.min(
                            d.x,
                            width - (radius) - margin.right
                        )
                    ); 
                }
            })
            .attr("cy", function(d) { 
                if(d.id == "Cognitive Science") {
                    return d.y = height / 2
                } else {
                    return d.y = Math.max(
                        radius + margin.top,
                        Math.min(
                            d.y,
                            height - (radius) - margin.bottom
                        )
                    );
                }
            });
    }
}  

document.onkeydown = function(event) {
    event = event || window.event;

    if(event.keyCode == 27) {
        clickedBackground(null);
    }
}

var infobox = d3.select("body").append("div")	
    .attr("class", "infobox")
    // .style("opacity", 0)
    .style("opacity", 0.0)
    .style("left", 0)
    .style("top", 0);

var hoverbox = d3.select("body").append("div")	
    .attr("class", "hoverbox")
    // .style("opacity", 0);
    .style("opacity", 0.0)
    .style("left", 0)
    .style("top", 0);

// -- INFO BOX ----------------------------

function hideHover() {
    hoverbox.transition()
        .duration(200)
        .style("opacity", 0.0);
}

function putHover(text, x, y) {
    hoverbox.transition()
        .duration(50)
        .style("opacity", 1.0)
        .style("z-index", 10);
    hoverbox.html("<span>" + text + "</span>");
        
    hoverbox.style("left", (x) + "px")
        .style("top", (y - parseInt(hoverbox.style("height"))) + "px");
}

// -- INFO BOX ----------------------------

function hideInfo() {
    infobox.transition()
        .duration(200)
        .style("opacity", 0.0);
}

function parseNode(node) {
    let html = "";
    
    return html;
}

function putInfo(node, x, y) {
    infobox.transition()
        .duration(50)
        .style("opacity", 1.0)
        .style("z-index", 10);
    infobox.html(parseNode(node));
        
    infobox.style("left", (x) + "px")
        .style("top", (y - parseInt(infobox.style("height"))) + "px");
}