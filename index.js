// select the svg container first
const svg = d3
  .select('.canvas')
  .append('svg')
  .attr('width', 600)
  .attr('height', 600);

// create margins and dimension
const margin = { top: 20, right: 20, bottom: 100, left: 100 };
const graphWidth = 600 - margin.left - margin.right;
const graphHeight = 600 - margin.top - margin.bottom;

// inside svg container
const graph = svg
  .append('g')
  .attr('width', graphWidth)
  .attr('height', graphHeight)
  .attr('transform', `translate(${margin.left}, ${margin.top})`); // away from edge

const xAxisGroup = graph
  .append('g')
  .attr('transform', `translate(0,${graphHeight})`);

const yAxisGroup = graph.append('g');

// scales
// linear scale
const y = d3.scaleLinear().range([graphHeight, 0]);

// band scale
const x = d3.scaleBand().range([0, 500]).paddingInner(0.2).paddingOuter(0.2);

// create the axes
const xAxis = d3.axisBottom(x);
const yAxis = d3
  .axisLeft(y)
  .ticks(3)
  .tickFormat((d) => d + ' orders');

// update x axis text
xAxisGroup
  .selectAll('text')
  .attr('transform', 'rotate(-40)')
  .attr('text-anchor', 'end')
  .attr('fill', 'orange');

// update function
const update = (data) => {
  // updating scale domains
  y.domain([0, d3.max(data, (d) => d.orders)]);
  x.domain(data.map((item) => item.name));

  // join the data to rects
  const rects = graph.selectAll('rect').data(data);

  // remove exit selection
  rects.exit().remove();

  // update current shapes in dom - adding attrs to all the existing rects in the DOM
  rects
    .attr('width', x.bandwidth)
    .attr('height', (d) => graphHeight - y(d.orders))
    .attr('fill', 'orange')
    .attr('x', (d) => x(d.name))
    .attr('y', (d) => y(d.orders));

  // append the enter selection (any DOM elements that need to be added when the joined array is longer than the selection). allows us to get access to virtual elements inside the enter selection
  rects
    .enter()
    .append('rect')
    .attr('width', x.bandwidth) // scaleband gives us this
    .attr('height', (d) => graphHeight - y(d.orders))
    .attr('fill', 'orange')
    .attr('x', (d) => x(d.name))
    .attr('y', (d) => y(d.orders));

  // call axes
  xAxisGroup.call(xAxis);
  yAxisGroup.call(yAxis);
};

let data = [];
// get data from firestore
// setup real time event listener
db.collection('dishes').onSnapshot((res) => {
  res.docChanges().forEach((change) => {
    const doc = { ...change.doc.data(), id: change.doc.id };
    // console.log(doc);
    // console.log(change);

    switch (change.type) {
      case 'added':
        data.push(doc);
        break;

      case 'modified':
        const index = data.findIndex((item) => item.id === doc.id);
        data[index] = doc;
        break;

      case 'removed':
        data = data.filter((item) => item.id !== doc.id);
        break;
      default:
        break;
    }
  });
  update(data);
});

// starting conditions:
// Y = graphHeight
// Height = 0

// Ending conditions:
// Y = y(d.orders)
// Height = graphHeight - y(d.orders)
