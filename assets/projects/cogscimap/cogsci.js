// console.log(cogscimap);

function makeBirectional(graph, nextkey) {
    for (let [key, value] of Object.entries(graph)) {
        value[nextkey].forEach(next => {
            try {
                if(graph[next][nextkey].includes(key) == false) {
                    graph[next][nextkey].push(key);
                } 
            } catch(err) {
                console.log("ERROR with graph[" + next + "]\t" + err);
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
        data.nodes.push(value);
        data.nodes[data.nodes.length - 1].id = key;
        data.nodes[data.nodes.length - 1].name = key;

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
    makeBirectional(data, "next");
    return transform(data, "next");
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
    // return d3.select("circle#" + id);
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

function fadeLines(elements, duration=1500) {
    elements
        .transition()
        .duration(duration)
            .style("stroke", "red")
            .style("stroke-width", "3")
            .style("opacity", 0.1);
}

function fadeNodes(elements, duration=1500) {
    elements
        .transition()
        .duration(duration)
            .style("opacity", 0.1);
}

function growLines(elements, duration=1500) {
    elements
        .transition()
        .duration(duration)
            .style("stroke", "red")
            .style("stroke-width", "6")
            .style("opacity", 1.0);
}

function growNodes(elements, duration=1500) {
    elements
        .transition()
        .duration(duration)
            .attr("r", radius * 2)
            .style("opacity", 1.0);
}

function resetLines(elements, duration=1500) {
    elements
        .transition()
        .duration(duration)
            .style("stroke", "red")
            .style("stroke-width", "3")
            .style("opacity", 1.0);
}

function resetNodes(elements, duration=1500) {
    elements
        .transition()
        .duration(duration)
            .attr("r", radius)
            .style("opacity", 1.0);
}

function findCircle(id) {
    let s = "circle#" + id.replace(/\s/g, '');
    console.log(s);
    return d3.select(s)._groups[0][0].__data__;
}

function clickedNode(d) {
    if(info) {
        hideInfo();
    }

    var x, y, k;
    
    if (focus !== d) {
        x = d.x;
        y = d.y;
        k = 4;

        if(focus != null) {
            resetNodes(getCircle(focus.id));
            resetLines(connectingEdges(focus.id));
        }

        focus = d;
        console.log(focus);

        fadeLines(nonconnectingEdges(focus.id));
        growLines(connectingEdges(focus.id));
        growNodes(getCircle(focus.id), 1500);
        connectingEdges(focus.id).raise();

        d3.selectAll("circle").raise();
        putInfo(focus);
    } else {
        putInfo(focus);
        return;
    }

    g.transition()
        .duration(400)
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
        .style("stroke-width", 1.5 / k + "px");
}

function clickedLine(d) {
    if(info) {
        hideInfo();
    }

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

            resetNodes(getCircle(focus.id));
            resetLines(allEdges(focus.id));

            focus = null;

            g.transition()
                .duration(400)
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
                .style("stroke-width", 1.5 / k + "px");
        }
    }
}

function clickedBackground(d) {
    if(info) {
        hideInfo();
    } else {
        var x, y, k;

        x = width / 2;
        y = height / 2;
        k = 1;

        resetNodes(allNodes());
        resetLines(allEdges());
        
        focus = null;

        g.transition()
            .duration(400)
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
            .style("stroke-width", 1.5 / k + "px");
    }
}

function mouseoverNode(d) {
    putHover(d.id, d3.event.pageX, d3.event.pageY);

    if (focus == null) {
        fadeLines(nonconnectingEdges(d.id), 300);
    }
}

function mouseoutNode(d) {
    hideHover();

    // resetNodes(getCircle(d.id));
    if (focus == null) {
        resetLines(nonconnectingEdges(d.id), 300);
    }
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
    console.log(data);
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
    .attr("height", height + margin.top + margin.bottom - frame)
    .on("wheel", function(d){
        // console.log(d3.event.wheelDelta );
        // zoom out on scroll back
        if (d3.event.wheelDelta < 0 && focus != null) {
            clickedBackground();
        }
    });

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
    data = preprocess(graph);

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
        .attr("id", d => d.id.replace(/\s/g, ''))
        .style("stroke", "gold")
        .style("stroke-width", "3")
        .style("fill", function(d) {
            if(d.id == "Cognitive Science") {
                return "#555555";
            } else {
                return "black";
            }
        })
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

var infobox = d3.select(".infobox");
var hoverbox = d3.select(".hoverbox");
var info = false;

var intro = d3.select(".ondisplay");

// -- HOVER BOX ----------------------------

function hideHover() {
    hoverbox.transition()
        .duration(200)
        .style("opacity", 0.0);
}

function putHover(text, x, y) {
    hoverbox.style("z-index", 10);
    hoverbox.transition()
        .duration(50)
        .style("opacity", 1.0);
    hoverbox.html("<span>" + text + "</span>");
        
    hoverbox.style("left", (x) + "px")
        .style("top", (y - parseInt(hoverbox.style("height"))) + "px");
}

// -- INFO BOX ----------------------------

function hideInfo() {
    infobox.transition()
        .duration(500)
        .style("opacity", 0.0)
        .style("z-index", -1);

    
    info = false;
}

function parseNode(node) {
    let path = '/assets/projects/cogscimap/entries/' + node.id + '.html';

    var xhr= new XMLHttpRequest();
    xhr.open('GET', path, true);
    xhr.onreadystatechange = function() {
        if (this.readyState !== 4) {
            document.getElementById('infobox').innerHTML = this.readyState;
            return;
        }
        if (this.status !== 200) {
            document.getElementById('infobox').innerHTML = this.status;
            return;
        }
        document.getElementById('infobox').innerHTML = this.responseText;

    };
    xhr.send();
    // return '<iframe src="/assets/projects/cogscimap/entries/' + node.id + '.html">';    
}

function putInfo(node) {
    parseNode(node);
    // infobox.html(parseNode(node));
    infobox.style("z-index", 10);

    infobox.transition()
        .duration(500)
        .style("opacity", 1.0);
    info = true;
}

function fadeIntro() {
    intro
        .transition()
            .duration(500)
            .style("opacity", 0.0)
            .on("end", function() {
                intro.style("z-index", -1);
                // clickedNode(findCircle("Cognitive Science"));
            });
}   