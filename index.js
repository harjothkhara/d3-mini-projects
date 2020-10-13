const data = [{ width: 200, height: 400, fill: 'red' }];

const svg = d3.select('svg');

const rect = svg
  .select('rect')
  .data(data)
  .attr('width', function (d, i, n) {
    console.log(i); // 0 - index of current rect element inside of the array
    console.log(n); // current selection, i.e currently the 1 rect
    return d.width;
  })
  .attr('height', function (d) {
    console.log(d);
    return d.height;
  })
  .attr('fill', function (d) {
    return d.fill;
  });

console.log(rect);
