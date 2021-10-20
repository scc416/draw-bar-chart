function drawBarChart(data, options, element) {
  let chartContent = "";
  //for the label on x-axis
  let xAxis = "";

  //for the tick on y-axis
  let yTick = "";

  //for the label on y-axis
  let yLabel = "";



  //put the x-axis in a div
  xAxis = `<div id="x-axis">${xAxis}</div>`;

  //put the title in a div
  let title = `<div id="title">${options.title}</div>`;

  //the maximum value in data
  let maxVal = Math.max(...data[0]);

  //decide the position of ticks on y-axis
  let pow = 0;
  for(pow = 0; maxVal > Math.pow(10, pow); pow++) {

  }
  let tickInterval = Math.pow(10, pow-1);
  let maxTick = Math.ceil(maxVal/tickInterval) * tickInterval;
  for(let i = 0; i < maxVal; i += tickInterval) {
    // minus one from tick interval to leave space for the border
    yTick += `<div style="width: 10px; border-top: 1px black solid"></div>`;
    yLabel += `<div style="display: flex; align-items: flex-end; justify-content: flex-end;">${i}</div>`;
    // yTick += `<div style="width: 10px; height: ${tickInterval*heightPerUnit-1}px; border-top: 1px black solid"></div>`;
    // yLabel += `<div style="display: flex; align-items: flex-end; justify-content: flex-end; height: ${tickInterval*heightPerUnit}px">${i}</div>`;
  }
  yTick = `<div id="y-tick">${yTick}</div>`;
  yLabel += `<div style="text-align: right">${maxTick}</div>`;
  yLabal = `<div id="y-label">${yLabel}</div>`;

  element.html(yLabel + yTick);

  let barMaxWidth = options.width - 30;
  let widthPerBar = barMaxWidth/2/data[0].length;

  //plot the bar graph with value in parameter "data"
  for(let val of data[0]) {
    chartContent += (`<div style="background-color: black; color: white; text-align: center; width: ${80/(data[0].length)}%; margin: 0 ${10/(data[0].length)}%">${val}</div>`);
  };

  let barWidth = 0.9 * $("#chartContent").innerWidth()/data[0].length;
  let yAxisWidth = $("#y-label").innerWidth() + $("#y-tick").innerWidth();
  //label x-axis
  for(let val of data[1]) {
    xAxis += (`<div style="text-align: center; overflow-wrap: break-word; width: ${80/(data[0].length)}%; margin: 0 ${10/(data[0].length)}%">${val}</div>`);
  };

  xAxis = `<div class="left-container"><div id="x-axis">${xAxis}</div></div>`;

  // let chart = `<div id="chart">${title}<div id="middle"><div id="y-label">${yLabel}</div><div id="y-tick">${yTick}</div><div id="chartContent">${chartContent}</div></div>${xAxis}</div>`;
  let chart = `<div id="chart">${title}<div id="middle"><div id="y-label">${yLabel}</div><div id="y-tick">${yTick}</div><div id="chartContent">${chartContent}</div></div>${xAxis}</div>`;
  element.html(chart);
  element.css("border", "1px black solid");
  element.css("display", "flex");
  element.css("flex-direction", "column");
  element.css("height", options.height);
  element.css("width", options.width);
  element.css("padding", `min(${element.innerWidth() * 0.10}px, 15px)`);

  $( "#middle" ).css( "display", "flex");
  // $( "#middle" ).css( "height", "100%");
  $( "#title" ).css( "text-align", "center" );
  // $( "#title" ).css( "margin", "15px" );
  // $( "#middle" ).css("display", "flex");
  // $( "#middle" ).css("align-items", "flex-end");
  $( "#y-tick" ).css("border-right", "1px black solid");
  $( "#y-label" ).css("display", "flex");
  $( "#y-label" ).css("flex-direction", "column-reverse");
  // $( "#y-label" ).css("margin-right", "0px");
  // $( "#y-label" ).css("justify-content", "space-evenly");
  // $( "#y-tick" ).css("display", "flex");
  // $( "#y-tick" ).css("flex-direction", "column");
  // $( "#y-tick" ).css("justify-content", "flex-end");
  // $( "#chart" ).css("max-height", "100%");
  $( "#y-tick" ).css("border-bottom", "1px black solid");
  $( "#chartContent" ).css("border-bottom", "1px black solid");
  $( "#chartContent" ).css("display", "flex");
  $( "#chartContent" ).css("align-items", "flex-end");
  $( "#chartContent" ).css("width", "100%");
  $( "#x-axis" ).css("display", "flex");
  $( "#x-axis" ).css("justify-content", "flex-end");
  $( "#x-axis" ).css("width", `${$("#chartContent").innerWidth()}px`);
  $( ".left-container" ).css("width", "100%");
  $( ".left-container" ).css("display", "flex");
  $( ".left-container" ).css("justify-content", "flex-end");

  console.log($("#chartContent").innerWidth());

};
