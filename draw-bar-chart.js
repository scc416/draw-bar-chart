function drawBarChart(data, options, element) {
  let chartContent = "";
  //for the label on x-axis
  let xAxis = "";

  //for the tick on y-axis
  let yTick = "";

  //for the label on y-axis
  let yLabel = "";

  //label the x-axis
  for(let val of data[1]) {
    xAxis += (`<div style="text-align: center; overflow-wrap: break-word; width: 60px">${val}</div>`);
  };

  //put the x-axis in a div
  xAxis = `<div id="x-axis">${xAxis}</div>`;

  //put the title in a div
  let title = `<div id="title">${options.title}</div>`;

  //to store the maximum value in data
  let maxVal = Math.max(...data[0]);

  element.html(title + xAxis);
  //calculate the height of the bar content
  // let barMaxHeight = options.height - $("#title").innerHeight() - $("#x-axis").innerHeight();
  let barMaxHeight = options.height - 100;
  //decide the position of ticks on y-axis
  let pow = 0;
  for(pow = 0; maxVal > Math.pow(10, pow); pow++) {

  }
  let tickInterval = Math.pow(10, pow-1);
  let maxTick = Math.ceil(maxVal/tickInterval) * tickInterval;
  let heightPerUnit = barMaxHeight/maxTick;
  for(let i = 0; i < maxVal; i += tickInterval) {
    // minus one from tick interval to leave space for the border
    yTick += `<div style="width: 10px; height: ${tickInterval*heightPerUnit-1}px; border-top: 1px black solid"></div>`;
    yLabel += `<div style="display: flex; align-items: flex-end; justify-content: flex-end; height: ${tickInterval*heightPerUnit}px">${i}</div>`;
  }
  yTick = `<div id="y-tick">${yTick}</div>`;
  yLabel += `<div style="text-align: right">${maxTick}</div>`;
  yLabal = `<div id="y-label">${yLabel}</div>`;

  element.html(yLabel + yTick);

  let barMaxWidth = options.width - 30;
  let widthPerBar = barMaxWidth/2/data[0].length;

  //plot the bar graph with value in parameter "data"
  for(let val of data[0]) {
    chartContent += (`<div><div style="text-align: center">${val}</div><div style="background-color: black; width: ${widthPerBar}px; height: ${val*heightPerUnit}px; margin: 0px ${widthPerBar/2}px"></div></div>`);
  };

  //re label the x-axis
  xAxis = "";

  for(let val of data[1]) {
    xAxis += (`<div style="text-align: center; overflow-wrap: break-word; width: ${widthPerBar*2}px">${val}</div>`);
  };

  xAxis = `<div id="x-axis">${xAxis}</div>`;

  let chart = `<div id="chart">${title}<div id="middle"><div id="y-label">${yLabel}</div><div id="y-tick">${yTick}</div><div id="chartContent">${chartContent}</div></div>${xAxis}</div>`;
  element.html(chart);
  element.css("border", "1px black solid");
  element.css("display", "inline-block");
  element.css("padding", "10px");
  element.css("height", options.height);
  element.css("width", options.width);
  $( "#middle" ).css( "display", "flex");
  $( "#title" ).css( "text-align", "center" );
  $( "#title" ).css( "margin", "15px" );
  $( "#middle" ).css("display", "flex");
  $( "#middle" ).css("align-items", "flex-end");
  $( "#y-tick" ).css("border-right", "1px black solid");
  $( "#y-label" ).css("display", "flex");
  $( "#y-label" ).css("flex-direction", "column-reverse");
  $( "#y-label" ).css("margin-right", "0px");
  $( "#y-label" ).css("justify-content", "space-evenly");
  $( "#y-tick" ).css("display", "flex");
  $( "#y-tick" ).css("flex-direction", "column");
  $( "#y-tick" ).css("justify-content", "flex-end");
  $( "#y-tick" ).css("border-bottom", "1px black solid");
  $( "#chartContent" ).css("border-bottom", "1px black solid");
  $( "#chartContent" ).css("display", "flex");
  $( "#chartContent" ).css("align-items", "flex-end");
  $( "#x-axis" ).css("display", "flex");
  $( "#x-axis" ).css("justify-content", "flex-end");


};
