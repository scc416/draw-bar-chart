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

let drawBarChart = (data, options, element) => {

  let bar = "";

  //for the x-axis
  let xAxis = "";

  //for the label on y-axis
  let yTick = "";
  let yLabel = "";

  //make title Div
  let chartTitleDiv = makeTitleDiv(options);

  //the maximum value in data
  let maxVal = Math.max(...data[0]);

  //find the number of data
  let dataNum = data[0].length;

  //decide the position of ticks on y-tick
  let pow;
  for(pow = 0; maxVal > Math.pow(10, pow); pow++) {

  }
  let tickInterval = Math.pow(10, pow-1);
  let maxTick = Math.ceil(maxVal/tickInterval) * tickInterval;
  for(let i = 0; i <= maxVal; i += tickInterval) {
    // minus one from tick interval to leave space for the border
    yTick += `<div style="border-bottom: 1px black solid; width: 10px;"></div>`;
    yLabel += `<div style="height: 0">${i}</div>`;
  }
  yTick = `<div class="y-tick" id="y-tick-${options.Id}">${yTick}</div>`;

  //plot the bar graph with value in parameter "data"
  for(let val of data[0]) {
    bar += (`<div style="background-color: black; color: white; text-align: center; height: ${100 * val / maxTick}%;width: ${80/dataNum}%; margin: 0 ${10/(dataNum)}%">${val}</div>`);
  };

  //label x-axis
  for(let val of data[1]) {
    xAxis += (`<div style="width: ${80/dataNum}%; margin: 0 ${10/dataNum}%">${val}</div>`);
  };

  xAxis = `<div class="left-container"><div class="x-axis" style="text-align: center; overflow-wrap: anywhere"><div id="left-corner-${options.Id}"></div>${xAxis}</div></div>`;

  let chart = `${chartTitleDiv}<div class="middle"><div class="y-label" id="y-label-${options.Id}" style="text-align: right">${yLabel}</div>${yTick}<div class="bar">${bar}</div></div>${xAxis}`;
  element.html(chart);
  element.css("height", options.height);
  element.css("width", options.width);
  element.css("padding", `min(${element.innerWidth() * 0.10}px, 15px)`);
  $( ".chart-title" ).css("padding", `min(${element.innerWidth() * 0.10}px, 15px)`);
  $( `#left-corner-${options.Id}` ).css("min-width", `${$( `#y-label-${options.Id}` ).innerWidth() + $( `#y-tick-${options.Id}` ).innerWidth()}px`);
  console.log($( `#y-tick-${options.Id}` ).innerWidth());
  console.log($( `#y-label-${options.Id}` ).innerWidth());
};
