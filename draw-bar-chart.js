//to-do list
//stacked
//more options
// extra flare with things like CSS transitions and animations
// what to do when there is no input from the options
//add comments
// for negative values
// for value < 1

//function that use the options to create div for the chart title
let makeTitleDiv = (options) => {
  let titleDiv = options.hasOwnProperty("chartTitle") ? options.chartTitle : "Untitled";

  switch(options.hasOwnProperty("titleFontSize")) {
    case(true):
    titleDiv = `font-size: ${options.titleFontSize}">${titleDiv}</div>`
    break;
  case(false):
    titleDiv = `font-size: 24px">${titleDiv}</div>`
  }

  switch(options.hasOwnProperty("titleColour")) {
    case(true):
      titleDiv = `color: ${options.titleColour}; ${titleDiv}`
      break;
  }

  return `<div class="chart-title" style="text-align: center; ${titleDiv}`;
};

// the function that find the value of tick and largest value of the tick
let findTicks = (options, maxVal) => {

  let pow;
  for(pow = 0; maxVal > Math.pow(10, pow); pow++) {
  }

  let tickInterval = Math.pow(10, pow - 1);

  tickInterval = options.hasOwnProperty("minTickVal") ? options.minTickVal : tickInterval;

  let maxTick = Math.ceil(maxVal/tickInterval) * tickInterval;

  return [tickInterval, maxTick];
}

let countDecimals = (value) => {
  if(Math.floor(value) === value) return 0;
  return value.toString().split(".")[1].length || 0;
}

let makeYAxis = (tickInterval, maxTick, options) => {
  //calculate the number of decimals of the tick interval to format the labels later
  let decimals = countDecimals(tickInterval);
  let yTick = "";
  let yAxisLabel = "";

  for(let i = 0; i <= maxTick; i += tickInterval) {
    yTick += `<div style="border-bottom: 1px black solid"></div>`;
    yAxisLabel += `<div style="height: 0">${i.toFixed(decimals)}</div>`;
  }

  yTick = `<div class="y-tick" id="y-tick-${options.Id}">${yTick}</div>`;
  yAxisLabel = `<div class="y-axis-label" id="y-axis-label-${options.Id}">${yAxisLabel}</div>`;

  return yAxisLabel + yTick;
}

let makeBars = (data, maxTick) => {
  let bars = "";
  let dataNum = data.length;
  for(let val of data) {
    bars += (`<div style="background-color: black; color: white; height: ${100 * val / maxTick}%; width: ${80/dataNum}%; margin: 0 ${10/(dataNum)}%">${val}</div>`);
  }
  return `<div class="bar">${bars}</div>`;
}

let makeXAxis = (labelArr, options) => {
  let xAxis = "";
  let dataNum = labelArr.length;

  //label x-axis
  for(let val of labelArr) {
    xAxis += (`<div style="width: ${80/dataNum}%; margin: 0 ${10/dataNum}%">${val}</div>`);
  };

  xAxis = `<div class="x-axis"><div id="left-corner-${options.Id}"></div>${xAxis}</div>`

  if(options.hasOwnProperty("xAxisTitle")) {
    xAxis += `<div class="x-axis-title">${options.xAxisTitle}</div>`;
  }

  return xAxis;
}



// top-level function
let drawBarChart = (data, options, element) => {

  //make title Div
  let chartTitleDiv = makeTitleDiv(options);

  //the number of data, i.e. bar
  let dataNum = data[0].length;

  //the maximum value in data
  let maxVal = Math.max(...data[0]);

  //find the tick interval and value of the maximum tick
  let [tickInterval, maxTick] = findTicks(options, maxVal);

  //make div for the ticks and labels on y-axis
  let yAxis = makeYAxis(tickInterval, maxTick, options);

  //plot the bar graph with value in parameter "data"
  let bars = makeBars(data[0], maxTick);

  let xAxis = makeXAxis(data[1], options);

  //html of the whole chard
  let chart = `${chartTitleDiv}<div class="middle">${yAxis}${bars}</div>${xAxis}`;

  $( document ).ready(function() {
    element.html(chart);
    element.css("height", options.height);
    element.css("width", options.width);
    element.css("padding", `min(${element.innerWidth() * 0.10}px, 15px)`);
    $( ".chart-title" ).css("padding", `min(${element.innerWidth() * 0.10}px, 15px)`);
    $( document ).ready(function() {
      console.log($( `#y-axis-label-${options.Id}` ).width());
      console.log($( `#y-tick-${options.Id}` ).width());
      $( `#left-corner-${options.Id}` ).css("min-width", `${$( `#y-axis-label-${options.Id}` ).width() + $( `#y-tick-${options.Id}` ).width()}px`);
    });
  });
};
