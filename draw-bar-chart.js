//to-do list
//stacked
//more options
// extra flare with things like CSS transitions and animations
// what to do when there is no input from the options
//add comments
// for negative values
// for value < 1

//
let invalidOption = (id, option, key) => {
  console.log(`Bar chart (Id: ${id}) doesn't have a VALID ${option} (${key}) in options.`);
}

// check if input type is number
let isNumber = (num) => {
  if(typeof num === "number") return true;
  return false;
}

//function that use the options to create div for the chart title
let makeTitleDiv = (options) => {

  let titleDiv = "</div>";

  //Set the title text
  if(options.hasOwnProperty("chartTitle")) {
    titleDiv = `">` + options.chartTitle + titleDiv;
  } else {
    titleDiv = `">Untitled` + titleDiv;
  }

  //function that add style to titleDiv
  let addStyle = (property, optProp, displayStr, defaultVal) => {
    if(options.hasOwnProperty(optProp)) {
      if(CSS.supports(property, options[optProp])) {
        titleDiv = `${property}: ${options[optProp]}; ${titleDiv} `;
      } else {
        titleDiv = `${property}: ${defaultVal}; ${titleDiv}; `;
        invalidOption(options.Id, displayStr, optProp);
      }
    } else {
      titleDiv = `${property}: ${defaultVal}; ${titleDiv}; `;
    }
  }

  //Set the font size of the title
  addStyle("font-size", "titleFontSize", "title font size", "36px");

  //Set the color of the title
  addStyle("color", "titleColour", "title colour", "black");

  return `<div class="chart-title" style="${titleDiv}`;
};

// the function that find the value of tick and largest value of the tick
let findTicks = (options, maxVal) => {

  let tickInterval;

  let defaultInterval = () => {
    let pow;
    for(pow = 0; maxVal > Math.pow(10, pow); pow++) {
    }
    return Math.pow(10, pow - 1);
  }

  if(options.hasOwnProperty("minTickVal")) {
    if(isNumber(options.minTickVal)) {
      tickInterval = options.minTickVal;
    } else {
      tickInterval = defaultInterval();
      invalidOption(options.Id, "tick interval", "minTickVal");
    }
  } else {
    tickInterval = defaultInterval();
  }

  let maxTick = Math.ceil(maxVal/tickInterval) * tickInterval;

  return [tickInterval, maxTick];
}

let countDecimals = (val) => {
  if(Math.floor(val) === val) return 0;
  return val.toString().split(".")[1].length || 0;
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

  yTick = `<div class="y-tick" >${yTick}</div>`;
  yAxisLabel = `<div class="y-axis-label">${yAxisLabel}</div>`;

  return `<div class="y-axis" id="y-axis-${options.Id}">${yAxisLabel + yTick}</div>`;
}

let makeBars = (data, maxTick, options) => {
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

let checkId = (options) => {
  if(!options.hasOwnProperty("Id")) {
    console.log("A bar chart doesn't have an Id, it may causes problem(s) in layout of the bar chart.");
  };
};

// top-level function
let drawBarChart = (data, options, element) => {

  //check if the bar chart has an id
  checkId(options);

  //make title Div
  let chartTitleDiv = makeTitleDiv(options);

  //the maximum value in data
  let maxVal = Math.max(...data[0]);

  //find the tick interval and value of the maximum tick
  let [tickInterval, maxTick] = findTicks(options, maxVal);

  //make div for the ticks and labels on y-axis
  let yAxis = makeYAxis(tickInterval, maxTick, options);

  //plot the bar graph with value in parameter "data"
  let bars = makeBars(data[0], maxTick, options);

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
      $( `#left-corner-${options.Id}` ).css("min-width", `${$( `#y-axis-${options.Id}` ).width()}px`);
    });
  });
};
