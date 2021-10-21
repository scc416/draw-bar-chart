function drawBarChart(data, options, element) {
  let chartContent = "";
  //for the label on x-axis
  let xAxis = "";

  //for the label on y-tick
  let yTick = "";
  let yLabel = "";

  //put the x-axis in a div
  xAxis = `<div id="x-axis">${xAxis}</div>`;

  //put the title in a div
  let title = `<div id="title">${options.chartTitle}</div>`;

  //the maximum value in data
  let maxVal = Math.max(...data[0]);

  let dataNum = data[0].length;

  //decide the position of ticks on y-tick
  let pow = 0;
  for(pow = 0; maxVal > Math.pow(10, pow); pow++) {

  }
  let tickInterval = Math.pow(10, pow-1);
  let maxTick = Math.ceil(maxVal/tickInterval) * tickInterval;
  for(let i = 0; i <= maxVal; i += tickInterval) {
    // minus one from tick interval to leave space for the border
    yTick += `<div style="border-bottom: 1px black solid; width: 10px;"></div>`;
    yLabel += `<div style="height: 0">${i}</div>`;
  }
  yTick = `<div id="y-tick">${yTick}</div>`;

  //plot the bar graph with value in parameter "data"
  for(let val of data[0]) {
    chartContent += (`<div style="background-color: black; color: white; text-align: center; height: ${100 * val / maxTick}%;width: ${80/dataNum}%; margin: 0 ${10/(dataNum)}%">${val}</div>`);
  };

  //label x-axis
  for(let val of data[1]) {
    xAxis += (`<div style="text-align: center; overflow-wrap: break-word; width: ${80/dataNum}%; margin: 0 ${10/dataNum}%">${val}</div>`);
  };

  // xAxis = `<div class="left-container"><div style="width: 10px;"></div><div style="height: 0">${maxTick}</div><div id="x-axis">${xAxis}</div></div>`;
  xAxis = `<div class="left-container"><div id="left-corner"></div><div id="x-axis">${xAxis}</div></div>`;

  let chart = `${title}<div id="middle"><div id="y-label" style="text-align: right">${yLabel}</div>${yTick}<div id="chartContent">${chartContent}</div></div>${xAxis}`;
  element.html(chart);
  element.css("border", "1px black solid");
  element.css("display", "flex");
  element.css("flex-direction", "column");
  element.css("height", options.height);
  element.css("width", options.width);
  element.css("padding", `min(${element.innerWidth() * 0.10}px, 15px)`);

  $( "#middle" ).css( "display", "flex");
  $( "#middle" ).css( "height", "100%");
  $( "#title" ).css( "text-align", "center" );
  $( "#title" ).css("padding", `min(${element.innerWidth() * 0.10}px, 15px)`);
  $( "#y-tick" ).css("border-right", "1px black solid");
  $( "#y-tick" ).css("display", "flex");
  $( "#y-tick" ).css("flex-direction", "column-reverse");
  $( "#y-tick" ).css("justify-content", "space-between");
  $( "#y-label" ).css("display", "flex");
  $( "#y-label" ).css("flex-direction", "column-reverse");
  $( "#y-label" ).css("justify-content", "space-between");
  $( "#chartContent" ).css("border-bottom", "1px black solid");
  $( "#chartContent" ).css("display", "flex");
  $( "#chartContent" ).css("align-items", "flex-end");
  $( "#chartContent" ).css("width", "100%");
  $( "#chartContent" ).css("height", "100%");
  $( "#x-axis" ).css("display", "flex");
  $( "#x-axis" ).css("width", "100%");
  $( ".left-container" ).css("width", "100%");
  $( ".left-container" ).css("display", "flex");
  $( "#left-corner" ).css("width", $( "#y-label" ).innerWidth() + $( "#y-tick" ).innerWidth() + 1);
  // $( ".left-container" ).css("justify-content", "flex-end");

};
