document.getElementById('submit-btn').addEventListener('click', function() {
    const companyName = document.getElementById('company-name').value;
    const industry = document.getElementById('industry').value;
    const size = document.getElementById('size').value;
    const focus = document.getElementById('focus').value;

    const nodes = [
        { id: "Culture", group: 1 },
        { id: "Stratégie", group: 2 },
        { id: "Makers", group: 3 },
        { id: "Talents", group: 4 },
        { id: "Clients", group: 5 },
        { id: "Data & IA", group: 6 },
        { id: "Tech", group: 7 },
        { id: "Décisions", group: 8 },
        { id: "Vélocité", group: 9 },
    ];

    const links = generateLinksBasedOnFocus(focus);

    d3.select("svg").selectAll("*").remove();

    const svg = d3.select("svg"),
          width = +svg.attr("width"),
          height = +svg.attr("height");

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id).distance(150))
        .force("charge", d3.forceManyBody().strength(-50))
        .force("center", d3.forceCenter(width / 2, height / 2));

    const linkGroup = svg.append("g").attr("class", "links");
    const nodeGroup = svg.append("g").attr("class", "nodes");
    const labelGroup = svg.append("g").attr("class", "labels");

    const link = linkGroup.selectAll("line")
        .data(links)
        .enter()
        .append("line")
        .attr("class", "link")
        .style("stroke", "#999")
        .style("stroke-opacity", 0.6)
        .style("stroke-width", d => d.value);

    const node = nodeGroup.selectAll("circle")
        .data(nodes)
        .join("circle")
        .attr("class", "node")
        .attr("r", 20)
        .style("fill", d => color(d.group))
        .style("stroke", "#fff")
        .style("stroke-width", 1.5)
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    const label = labelGroup.selectAll("text")
        .data(nodes)
        .join("text")
        .attr("dy", -25)
        .attr("dx", -20)
        .text(d => d.id)
        .style("font-size", "12px")
        .style("fill", "#000");

    simulation.on("tick", () => {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);

        label
            .attr("x", d => d.x)
            .attr("y", d => d.y);
    });
});

function generateLinksBasedOnFocus(focus) {
    let links = [];
    const focusWeights = {
        innovation: [1, 2, 3, 6],
        growth: [2, 4, 5, 8],
        efficiency: [3, 7, 8, 9],
        customer: [1, 5, 6, 9],
    };

    const focusNodes = focusWeights[focus] || [];
    
    focusNodes.forEach((nodeIndex) => {
        links.push({
            source: nodes[nodeIndex - 1].id,
            target: nodes[(nodeIndex % nodes.length)].id,
            value: Math.floor(Math.random() * 9) + 1
        });
    });

    return links;
}

function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
}

function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}
