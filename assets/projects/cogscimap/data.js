var cogscimap = {};
var flag = true

d3.json("/assets/projects/cogscimap/data.json", function(data) {
    console.log(data);
    cogscimap = data;
    createGraph(cogscimap)
});

// while(flag) {

//     // console.log("fuck")
// }
// console.log(cogscimap);