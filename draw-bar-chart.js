//to-do list
//stacked
//more options
// extra flare with things like CSS transitions and animations
// what to do when there is no input from the options
// add comments
// for negative values
// check height & weight of option
// make notes

let powerOfTen = (num) => {
  let result = 1;
  if (num > 0) {
    while(num > 0) {
      result *= 10;
      num --;
    }
  } else {
    while(num < 0) {
      result /= 10;
      num ++;
    }
  }

  return result;
}

//display a sentence to log when invalid option is found
let invalidOption = (id, option, key) => {
  console.log(`The ${option} (${key}) of Bar chart (Id: ${id}) is not valid.`);
}

// check if input's type is number
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
    let pow = 0;
    if(maxVal >= 1) {
      for( ; maxVal > powerOfTen(pow); pow++) {
      }
      pow--;
    } else {
      for( ; maxVal <= powerOfTen(pow); pow--) {
      }
    }
    return powerOfTen(pow);
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
  let yTick = "";
  let yAxisLabel = "";
  let yAxisTitle = "</div>";

  if(options.hasOwnProperty("scientificNotation")) {
    if(options.scientificNotation === true) {
      let exp = tickInterval.toExponential(2);
      let index = exp.indexOf("e");
      let pow = parseInt(exp.slice(index+1));
      maxTick /= powerOfTen(pow);
      tickInterval = parseFloat(exp.slice(0, index));
      yAxisTitle = ` (10<sup>${pow}</sup>)${yAxisTitle}`;
    };
  }

  if(options.hasOwnProperty("yAxisTitle")) {
    yAxisTitle = `<div class="y-axis-title">${options.yAxisTitle +  yAxisTitle}`;
  } else {
    yAxisTitle = `<div class="y-axis-title">${yAxisTitle}`
  }

  let decimals = countDecimals(tickInterval);
  let max = maxTick / tickInterval;
  for(let i = 0; i <= max; i ++) {
    yTick += `<div style="border-bottom: 1px black solid"></div>`;
    yAxisLabel += `<div style="height: 0">${(i * tickInterval).toFixed(decimals)}</div>`;
  }

  yTick = `<div class="y-tick" >${yTick}</div>`;
  yAxisLabel = `<div class="y-axis-label">${yAxisLabel}</div>`;

  return `<div class="y-axis" id="y-axis-${options.Id}">${yAxisTitle + yAxisLabel + yTick}</div>`;
}

let makeBars = (data, maxTick, options, barSpacing) => {
  let bars = "";
  let dataNum = data.length;
  let format = options.hasOwnProperty("scientificNotation") ?
    (options.scientificNotation === true ?
      i => `${i.toExponential(2).slice(0, 4)}x10<sup><span class="sup">${i.toExponential(2).slice(5)}</span></sup>`:
      i => i ) :
    i => i ;

  let defineProp = (property, optProp, displayStr, defaultVal) => {
    if(options.hasOwnProperty(optProp)) {
      if(CSS.supports(property, options[optProp])) {
        return options[optProp];
      } else {
        invalidOption(options.Id, displayStr, optProp);
        return defaultVal;
      }
    } else {
      return defaultVal;
    }
  };

  let dataLabelColour = defineProp("color", "dataLabelColour", "data label colour", "white");
  let barColour = defineProp("background-color", "barColour", "bar colour", "black");
  let dataLabelPosition;

  if(options.hasOwnProperty("dataLabelPosition")) {
    switch(options.dataLabelPosition) {
      case "top":
        dataLabelPosition = "flex-start";
        break;
      case "centre":
        dataLabelPosition = "center";
        break;
      case "bottom":
        dataLabelPosition = "flex-end";
        break;
      default:
        dataLabelPosition = "flex-start";
        invalidOption(options.Id, "data label position", "dataLabelPosition");
    }
  } else {
    dataLabelPosition = "flex-start";
  }

  for(let val of data) {
    bars +=
      (
        `<div class="bar"
          style="
            align-items: ${dataLabelPosition};
            background-color: ${barColour};
            color: ${dataLabelColour};
            height: ${100 * val / maxTick}%;
            width: ${100/dataNum}%;
            margin: 0 ${barSpacing}">
          ${format(val)}
        </div>`
      );
  }
  return `<div class="bars">${bars}</div>`;
}

let defineBarSpacing = (options) => {
  if(options.hasOwnProperty("barSpacing")) {
    if(CSS.supports("margin", options.barSpacing)) {
      let num = parseFloat( options.barSpacing.replace(/\D*/g, "") );
      let unit = options.barSpacing.replace(/\d*/g, "");
      return num / 2 + unit;
    } else {
      invalidOption(options.Id, "bar spacing", "barSpacing");
      return 10/(dataNum) + "%" ;
    }
  } else {
    return 10/(dataNum) + "%" ;
  }
}

let makeXAxis = (labelArr, options, barSpacing) => {
  let xAxis = "";
  let dataNum = labelArr.length;

  //label x-axis
  for(let val of labelArr) {
    xAxis += (`<div style="width: ${100/dataNum}%; margin: 0 ${barSpacing}">${val}</div>`);
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

let setWidthHeight = (options, element) => {
  let setCSS = (dimension) => {
    if(options.hasOwnProperty(dimension)) {
      if(CSS.supports(dimension, options[dimension])) {
        element.css(dimension, options[dimension]);
      } else {
        invalidOption(options.Id, dimension, dimension);
      }
    }
  }
  setCSS("width");
  setCSS("height");
};

let setUserSelect = (options, element) => {
  if(options.hasOwnProperty("userSelect")) {
    if(!options.userSelect){
      element.css("user-select", "auto");
    }
  }
}

let dataChecker = (data) => {
  if(!Array.isArray(data)) {
    console.log("ALERT: Data input is not an array.");
    return false;
  }
  if(!Array.isArray(data[0])) {
    console.log("ALERT: Data set is not an array.");
    return false;
  }
  if(!Array.isArray(data[1])) {
    console.log("ALERT: Label set is not an array.");
    return false;
  }
  if(data[0].length !== data[1].length) {
    console.log("ALERT: Number of data doesn't match with number of label");
    return false;
  }
  if(typeof data[0][0] === "number") {
    for(let val of data[0]) {
      if(typeof val !== "number") {
        console.log("ALERT: One of the value is not number.");
        return false;
      }
    }
  } else if (Array.isArray(data[0][0])) {
    for(let arr of data[0]) {
      if(!Array.isArray(arr)) {
        console.log("ALERT: One of the value set is not an array.");
        return false;
      }
      for(let data of arr) {
        if(typeof data !== "number") {
          console.log("ALERT: One of the value is not number.");
          return false;
        }
      }
    }
  } else {
    console.log("ALERT: One of the value is not number.");
    return false;
  }
  return true;
}

// top-level function
let drawBarChart = (data, options, element) => {

  if(dataChecker(data)) {

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

    let barSpacing = defineBarSpacing(options);

    //plot the bar graph with value in parameter "data"
    let bars = makeBars(data[0], maxTick, options, barSpacing);

    //label the x axis
    let xAxis = makeXAxis(data[1], options, barSpacing);

    //html of the whole chard
    let chart = `${chartTitleDiv}<div class="middle">${yAxis}${bars}</div>${xAxis}`;

    $( document ).ready(function() {
      element.html(chart);
      setWidthHeight(options, element);
      setUserSelect(options, element);
      $( document ).ready(function() {
        $( `#left-corner-${options.Id}` ).css("min-width", `${$( `#y-axis-${options.Id}` ).width()}px`);
      });
    });
} else {
  $( document ).ready(function() {
    element.html("There is problem with the data. Please see web console.");
  });
}
};
