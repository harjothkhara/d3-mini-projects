const canvas = d3.select('.canvas');

// append svg container (return value) with width and height attribute
const svg = canvas.append('svg').attr('width', 600).attr('height', 600);

// method chaining to add attributes to svg container
svg
  .append('rect')
  .attr('width', 200)
  .attr('height', 100)
  .attr('fill', 'blue')
  .attr('x', 20)
  .attr('y', 20);

svg
  .append('circle')
  .attr('r', 50)
  .attr('cx', 300)
  .attr('cy', 70)
  .attr('fill', 'pink');

svg
  .append('line')
  .attr('x1', 370)
  .attr('x2', 400)
  .attr('y1', 20)
  .attr('y2', 120)
  .attr('stroke', 'red');

// adding svg text
svg
  .append('text')
  .attr('x', 20)
  .attr('y', 200)
  .attr('fill', 'grey')
  .text('hello, world!')
  .style('font-family', 'helvetica');
