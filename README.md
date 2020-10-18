# d3-mini-projects

### D3 Basics

- create simple SVG shapes:
  - Rect, circles, lines, paths, text
- Seen how to add these to the DOM
- Changed attributes using by method chaining with the .attr() method
- Grouping elements together (axis, charts)

### Using Data with D3

- Updater Pattern

```javascript
const update = (data) => {
  // 1. update scales (domains) if they rely on our data
  y.domain([0, d3.max(data, (d) => d.orders)]);

  // 2. join updated data to elements
  const rects = graph.selectAll('rect').data(data);

  // 3. remove unwanted (if any) shapes using the exit selection
  rects.exit().remove();

  // 4. update the current shapes in the dom
  rects.attr(...etc);

  // 5. append the enter selection to the dom
  rects
    .enter()
    .append('rect')
    .attr(...etc);
};
```
