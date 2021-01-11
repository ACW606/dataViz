async function drawScatter() {

  // 1. Access data
  //let dataset = await d3.json("./../../my_weather_data.json")
  const dataset = await d3.json("/static/data/my_weather_data.json")

  const xAccessor = d => d.dewPoint
  const yAccessor = d => d.humidity
  const colorAccessor = d => d.cloudCover

  // 2. Create chart dimensions

  //const width = d3.min([
  //  window.innerWidth * 0.4,
  //  window.innerHeight * 0.4,
  const width = 400
  //])
  let dimensions = {
    //width: width *1.5,
    width: window.innerWidth *0.5,
    //width: width * .5,
    height: width * .95,
    margin: {
      top: 10,
      right: 10,
      bottom: 60,
      left: 50,
    },
  }
  dimensions.boundedWidth = dimensions.width
    - dimensions.margin.left
    - dimensions.margin.right
  dimensions.boundedHeight = dimensions.height
    - dimensions.margin.top
    - dimensions.margin.bottom

  // 3. Draw canvas

  const wrapper = d3.select("#nobel-bio")
    .append("svg")
      .attr("width", dimensions.width)
      .attr("height", dimensions.height)
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
    .domain(d3.extent(dataset, xAccessor))
    .range([0, dimensions.boundedWidth])
    .nice()

  const yScale = d3.scaleLinear()
    .domain(d3.extent(dataset, yAccessor))
    .range([dimensions.boundedHeight, 0])
    .nice()

  const colorScale = d3.scaleLinear()
    .domain(d3.extent(dataset, colorAccessor))
    .range(["skyblue", "darkslategrey"])

  // 5. Draw data

  const dots = bounds.selectAll("circle")
    .data(dataset)
    .enter().append("circle")
      .attr("cx", d => xScale(xAccessor(d)))
      .attr("cy", d => yScale(yAccessor(d)))
      .attr("r", 4)
      .attr("fill", d => colorScale(colorAccessor(d)))
      .attr("tabindex", "0")

  // 6. Draw peripherals

  const xAxisGenerator = d3.axisBottom()
    .scale(xScale)

  const xAxis = bounds.append("g")
    .call(xAxisGenerator)
      .style("transform", `translateY(${dimensions.boundedHeight}px)`)

  const xAxisLabel = xAxis.append("text")
      .attr("x", dimensions.boundedWidth / 2)
      .attr("y", dimensions.margin.bottom - 15)
      .attr("fill", "black")
      .style("font-size", "1.4em")
      .html("Dew point (&deg;F)")

  const yAxisGenerator = d3.axisLeft()
    .scale(yScale)
    .ticks(4)

  const yAxis = bounds.append("g")
      .call(yAxisGenerator)

  const yAxisLabel = yAxis.append("text")
      .attr("x", -dimensions.boundedHeight / 2)
      .attr("y", -dimensions.margin.left + 10)
      .attr("fill", "black")
      .style("font-size", "1.4em")
      .text("Relative humidity")
      .style("transform", "rotate(-90deg)")
      .style("text-anchor", "middle")
}
drawScatter()

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