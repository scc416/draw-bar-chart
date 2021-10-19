function drawBarChart(data, options, element) {
  let chartContent = "";
  let xAxis = "";
  let maxVal = data[0][0];

  //plot the bar graph with value in parameter "data"
  for(let val of data[0]) {
    if(val > maxVal) {
      maxVal = val;
    }
    chartContent += (`<div><div style="text-align: center">${val}</div><div style="background-color: black; width: 20px; height: ${val}px; margin: 0px 20px"></div></div>`);
  };

  //decide the position of ticks on y-axis
  let pow = 0;
  for(pow = 0; maxVal > Math.pow(10, pow); pow++) {

  }
  let tickInterval = Math.pow(10, pow-1);
  console.log(tickInterval);
  //for the tick on y-axis
  let yTick = "";

  //for the label on y-axis
  let yLabel = "";
  for(let i = 0; i < maxVal; i += tickInterval) {
    // minus one from tick interval to leave space for the border
    yTick += `<div style="width: 10px; height: ${tickInterval-1}px; border-top: 1px black solid"></div>`;
    yLabel += `<div style="height: 10px; text-align: right">${i}</div><div style="height: ${tickInterval-10}px"></div>`;
  }
  yLabel += `<div style="height: 10px; text-align: right">${(Math.ceil(maxVal)/tickInterval)*tickInterval}</div>`;

  //label of x-axis
  for(let val of data[1]) {
    xAxis += (`<div style="text-align: center; overflow-wrap: break-word; width: 60px">${val}</div>`);
  };
  let chart = `<div id="chart"><div id="title">${options.title}</div><div id="middle"><div id="y-label">${yLabel}</div><div id="y-tick">${yTick}</div><div id="chartContent">${chartContent}</div></div><div id="x-axis">${xAxis}</div></div>`;
  element.html(chart);
  element.css("border", "1px black solid");
  element.css("display", "inline-block");
  element.css("padding", "10px");
  $( "#middle" ).css( "display", "flex");
  $( "#title" ).css( "text-align", "center" );
  $( "#title" ).css( "margin", "15px" );
  $( "#chartContent" ).css("border-left", "1px black solid");
  $( "#y-label" ).css("display", "flex");
  $( "#y-label" ).css("flex-direction", "column-reverse");
  $( "#y-label" ).css("margin-right", "5px");
  // $( "#y-label" ).css("border-bottom", "1px grey solid");
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
