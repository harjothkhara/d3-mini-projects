// select the svg container first
const svg = d3.select('svg');

d3.json('menu.json').then((data) => {
  // linear scale
  const y = d3.scaleLinear().domain([0, 1000]).range([0, 500]);

  // console.log(y(400));
  // console.log(y(0));
  // console.log(y(900));

  // band scale
  const x = d3
    .scaleBand()
    .domain(data.map((item) => item.name))
    .range([0, 500])
    .paddingInner(0.2)
    .paddingOuter(0.2);

  //console.log(x('veg curry'));
  //console.log(x('veg pasta'));
  //console.log(x.bandwidth()); // returns the width of every bar

  // join the data to rects
  const rects = svg.selectAll('rect').data(data);
  // adding attrs to all the existing rects in the DOM
  rects
    .attr('width', x.bandwidth)
    .attr('height', (d) => y(d.orders))
    .attr('fill', 'orange')
    // for each consecutive rectangle we're moving the further from the left by 70 pixels each time.
    .attr('x', (d) => x(d.name));

  // append the enter selection (any DOM elements that need to be added when the joined array is longer than the selection)
  rects
    .enter()
    .append('rect')
    .attr('width', x.bandwidth) // scaleband gives us this
    .attr('height', (d) => y(d.orders))
    .attr('fill', 'orange')
    .attr('x', (d) => x(d.name));
});
