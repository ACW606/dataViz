async function drawBars() {

  // 1. Access data
  const dataset = await d3.json("static/data/my_weather_data.json")

  const metricAccessor = d => d.humidity
  const yAccessor = d => d.length


  // 2. Create chart dimensions

  const width = 500
  const height = 500
  let dimensions = {
    width: window.innerWidth * 0.50,
    //width: width,
    height: width * 0.7,
    margin: {
      top: 30,
      right: 20,
      bottom: 50,
      left: 20,
      //top: height-(height*.1),
      //right: width-(width*.02),
      //bottom: height-(height*.05),
     },
  }
  dimensions.boundedWidth = dimensions.width 
    - dimensions.margin.left 
    - dimensions.margin.right
  dimensions.boundedHeight = dimensions.height 
    - dimensions.margin.top 
    - dimensions.margin.bottom
//console.log(dimensions.height)
//console.log(dimensions.width)
  // 3. Draw canvas

  const wrapper = d3.select("#nobel-bar")
    //.classed("svg-container", true)
    .append("svg")
    //.attr("preserveAspectRatio", "xMinYMin meet")
    //.attr("viewBox", "0 0 dimensions.height dimensions.width")
    //.attr("viewBox", "0 0 dimensions.boundedHeight dimensions.boundedWidth")
    //.attr("preserveAspectRatio", "xMinYMin meet")
   //.attr("viewBox", "")
   // .attr("viewBox", "0 0 500 600")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height)
    //console.log(dimensions.height)
    //console.log(dimensions.width)
    .call (response)
      .append("g")

  const bounds = wrapper.append("g")
      .style("transform", `translate(${
        dimensions.margin.left
      }px, ${
        dimensions.margin.top
      }px)`)


  // 4. Create scales

  const xScale = d3.scaleLinear()
    .domain(d3.extent(dataset, metricAccessor))
    .range([0, dimensions.boundedWidth])
    .nice()

  const binsGenerator = d3.histogram()
    .domain(xScale.domain())
    .value(metricAccessor)
    .thresholds(12)

  const bins = binsGenerator(dataset)
  //console.log(bins)

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(bins, yAccessor)])
    .range([dimensions.boundedHeight, 0])
    .nice()

  // 5. Draw data

  const binGroups = bounds.selectAll("g")
    .data(bins)
    .enter().append("g")

  const barPadding = 1
  const barRects = binGroups.append("rect")
      .attr("x", d => xScale(d.x0) + barPadding / 2)
      .attr("y", d => yScale(yAccessor(d)))
      .attr("width", d => d3.max([
        0,
        xScale(d.x1) - xScale(d.x0) - barPadding
      ]))
      .attr("height", d => dimensions.boundedHeight - yScale(yAccessor(d)))
      .attr("fill", "cornflowerblue")

  const barText = binGroups.filter(yAccessor)
    .append("text")
      .attr("x", d => xScale(d.x0) + (xScale(d.x1) - xScale(d.x0)) / 2)
      .attr("y", d => yScale(yAccessor(d)) - 5)
      .text(yAccessor)
      .style("text-anchor", "middle")
      .attr("fill", "darkgrey")
      .style("font-size", "12px")
      .style("font-family", "sans-serif")

  const mean = d3.mean(dataset, metricAccessor)
  const meanLine = bounds.append("line")
      .attr("x1", xScale(mean))
      .attr("x2", xScale(mean))
      .attr("y1", -15)
      .attr("y2", dimensions.boundedHeight)
      .attr("stroke", "maroon")
      .attr("stroke-dasharray", "2px 4px")

  const meanLabel = bounds.append("text")
      .attr("x", xScale(mean))
      .attr("y", -20)
      .text("mean")
      .attr("fill", "maroon")
      .style("font-size", "12px")
      .style("text-anchor", "middle")

  // 6. Draw peripherals

  const xAxisGenerator = d3.axisBottom()
    .scale(xScale)

  const xAxis = bounds.append("g")
    .call(xAxisGenerator)
      .style("transform", `translateY(${dimensions.boundedHeight}px)`)

  const xAxisLabel = xAxis.append("text")
      .attr("x", dimensions.boundedWidth / 2)
      .attr("y", dimensions.margin.bottom - 10)
      .attr("fill", "black")
      .style("font-size", "1.4em")
      .text("Humidity")
      .style("text-transform", "capitalize")
}
drawBars();
//window.addEventListener("resize", drawBars)
  
//https://www.geeksforgeeks.org/best-way-to-make-a-d3-js-visualization-layout-responsive/
function response(svg) { 
              
            // Container is the DOM element, svg is appended. 
            // Then we measure the container and find its 
            // aspect ratio. 
            const container = d3.select(svg.node().parentNode), 
                width = parseInt(svg.style('width'), 10), 
                height = parseInt(svg.style('height'), 10), 
                aspect = width / height; 
               // console.log(height)
               // console.log(width)
                  
            // Add viewBox attribute to set the value to initial size 
            // add preserveAspectRatio attribute to specify how to scale  
            // and call resize so that svg resizes on page load 
            svg.attr('viewBox', `0 0 ${width} ${height}`). 
            //attr('preserveAspectRatio', 'xMidYMid').
            attr('preserveAspectRatio',"none"). 
            call(resize); 
              
            d3.select(window).on('resize.' + container.attr('id'), resize); 
   
            function resize() { 
                const targetWidth = parseInt(container.style('width'));
                const targetHeight = parseInt(container.style('height')); 
                svg.attr('width', targetWidth); 
                //svg.attr('height', targetHeight);
                //svg.attr('height', height);
                //aspect2 = targetWidth/height;
                //svg.attr('height', Math.round(targetWidth / aspect)); 
                
                svg.attr('height', targetHeight);

               // console.log(height)
               // console.log(targetHeight)
               // console.log(Math.round(targetWidth / aspect))
               // console.log(aspect2)
               // console.log(width)
              //  console.log(targetWidth)
               // console.log(aspect)
            } 
        } 


/*
if(window.attachEvent) {
    window.attachEvent('onresize', drawBars());
}
else if(window.addEventListener) {
    window.addEventListener('resize', drawBars(), true);
}
else {
    //The browser does not support Javascript event binding
}
*/

//https://benclinkinbeard.com/d3tips/make-any-chart-responsive-with-one-function/?utm_content=buffer976d6&utm_medium=social&utm_source=twitter.com&utm_campaign=buffer