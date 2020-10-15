// select the svg container first
const svg = d3.select('svg');

d3.json('menu.json').then((data) => {
  const y = d3.scaleLinear().domain([0, 1000]).range([0, 500]);

  // console.log(y(400));
  // console.log(y(0));
  // console.log(y(900));

  // join the data to rects
  const rects = svg.selectAll('rect').data(data);
  // adding attrs to all the existing rects in the DOM
  rects
    .attr('width', 50)
    .attr('height', (d) => y(d.orders))
    .attr('fill', 'orange')
    // for each consecutive rectangle we're moving the further from the left by 70 pixels each time.
    .attr('x', (d, i) => i * 70);

  // append the enter selection (any DOM elements that need to be added when the joined array is longer than the selection)
  rects
    .enter()
    .append('rect')
    .attr('width', 50)
    .attr('height', (d) => y(d.orders))
    .attr('fill', 'orange')
    .attr('x', (d, i) => i * 70);
});
