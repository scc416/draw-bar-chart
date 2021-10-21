//to-do list
// mske smaller functions
//stacked
//more options
// extra flare with things like CSS transitions and animations
//what to do when there is no input from the options
//add comments
// for negative values
// for value < 1
// make css file

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

// top-level function
let drawBarChart = (data, options, element) => {

  //make title Div
  let chartTitleDiv = makeTitleDiv(options);

  //for the bars
  let bar = "";

  //for the x-axis
  let xAxis = "";

  //for the label on y-axis
  let yTick = "";
  let yLabel = "";

  //the number of data, i.e. bar
  let dataNum = data[0].length;

  //the maximum value in data
  let maxVal = Math.max(...data[0]);

  //find the tick interval and value of the maximum tick
  let [tickInterval, maxTick] = findTicks(options, maxVal);

  //make div for the ticks and labels on y-axis
  for(let i = 0; i <= maxTick; i += tickInterval) {
    // minus one from tick interval to leave space for the border
    yTick += `<div style="border-bottom: 1px black solid"></div>`;
    yLabel += `<div style="height: 0">${i}</div>`;
  }

  yTick = `<div class="y-tick" id="y-tick-${options.Id}">${yTick}</div>`;
  yLabel = `<div class="y-label" id="y-label-${options.Id}">${yLabel}</div>`;

  //plot the bar graph with value in parameter "data"
  for(let val of data[0]) {
    bar += (`<div style="background-color: black; color: white; height: ${100 * val / maxTick}%; width: ${80/dataNum}%; margin: 0 ${10/(dataNum)}%">${val}</div>`);
  };

  //label x-axis
  for(let val of data[1]) {
    xAxis += (`<div style="width: ${80/dataNum}%; margin: 0 ${10/dataNum}%">${val}</div>`);
  };

  xAxis = `<div class="x-axis"><div id="left-corner-${options.Id}"></div>${xAxis}</div>`;

  let chart = `${chartTitleDiv}<div class="middle">${yLabel}${yTick}<div class="bar">${bar}</div></div>${xAxis}`;

  $( document ).ready(function() {
  element.html(chart);
  element.css("height", options.height);
  element.css("width", options.width);
  element.css("padding", `min(${element.innerWidth() * 0.10}px, 15px)`);
  $( ".chart-title" ).css("padding", `min(${element.innerWidth() * 0.10}px, 15px)`);
  $( document ).ready(function() {
    $( `#left-corner-${options.Id}` ).css("min-width", `${$( `#y-label-${options.Id}` ).width() + $( `#y-tick-${options.Id}` ).width()}px`);
  })
  }
  )
    // $( `#left-corner-${options.Id}` ).css("min-width", `300px`);



};
