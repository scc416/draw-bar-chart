// to-do list
// refractor
// add comments
// make notes
// edit readme.md
// make github pages

// this function is to reimplement the function Math.pow(10, num)
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

let makeClass = (property, styleClass) => {
  if (property === false) {
    return "";
  } else {
    return styleClass;
  }

}

let defineProp = (property, optProp, displayStr, defaultVal, options) => {
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

// check if input's type is number
let isNumber = (num) => {
  if(typeof num === "number") return true;
  return false;
}

//function that use the options to create div for the chart title
let makeTitleDiv = (options) => {

  return `<div class="chart-title"
    style="colour: ${options.titleColour};
      font-size: ${options.titleFontSize}">
      ${options.chartTitle}
    </div>`;
};

// the function that find the value of tick interval, max. and min. tick
let findTicks = (options, maxVal, minVal) => {

  let tickInterval;
  let difference = maxVal - minVal;

  let defaultInterval = () => {
    let pow = 0;
    if(difference >= 1) {
      for( ; difference > powerOfTen(pow); pow++) {
      }
      pow--;
    } else {
      for( ; difference <= powerOfTen(pow); pow--) {
      }
    }
    return powerOfTen(pow);
  }

  //decide on the tickInterval, either default or option given by the user
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
  let minTick = Math.floor(minVal/tickInterval) * tickInterval;

  //if all values are positive
  if(minVal >= 0) {
    return [tickInterval, maxTick, 0];

  //if all values are negative
  } else if (maxVal <= 0) {

    return [tickInterval, 0, minTick];

  // if there are both positive and negative number
  } else {

    return [tickInterval, maxTick, minTick];
  }

}

let countDecimals = (val) => {
  if(Math.floor(val) === val) return 0;
  return val.toString().split(".")[1].length || 0;
}

let makeYAxis = (options) => {
  let yAxisLabel = "";
  let yAxisTitle = "</div>";

  let maxTick = options.maxTick;
  let minTick = options.minTick;
  let tickInterval = options.tickInterval;

  if(options.scientificNotation === true) {
    let exp = options.tickInterval.toExponential(2);
    let index = exp.indexOf("e");
    let pow = parseInt(exp.slice(index+1));
    maxTick /= powerOfTen(pow);
    minTick /= powerOfTen(pow);
    tickInterval = parseFloat(exp.slice(0, index));
    if(pow !== 0) {
      yAxisTitle = ` (10<sup>${pow}</sup>)${yAxisTitle}`;
    }
  };

  yAxisTitle = `<div class="y-axis-title" style="font-size: ${options.yAxisTitleFontSize}">${options.yAxisTitle +  yAxisTitle}`;

  let decimals = countDecimals(tickInterval);
  let max = maxTick / tickInterval;
  let min = minTick / tickInterval;
  for(let i = min; i <= max; i ++) {
    yAxisLabel += `<div style="height: 0">${(i * tickInterval).toFixed(decimals)}</div>`;
  }

  yAxisLabel = `<div class="y-axis-label" style="font-size: ${options.yAxisLabelFontSize}">${yAxisLabel}</div>`;

  return `<div class="y-axis" id="y-axis-${options.Id}">${yAxisTitle + yAxisLabel}</div>`;
}

let formatByOption = (opt) => {
  if(opt === true) {
      return (i) => {
        let exp = i.toExponential(2);
        let index = exp.indexOf("e");
        return `${exp.slice(0, index)}x10<sup><span class="sup">${exp.slice(index + 1).replace("+", "")}</span></sup>`
    }
  } else {
      return i => i;
  }
}

let makeStackedBars = (data, options) => {
  let difference = options.maxTick - options.minTick;
  let posBars = "";
  let negBars = "";
  let dataNum = data.length;
  data = data.map(arr => [arr.filter(x => x < 0), arr.filter(x => x >= 0)]);

  let format = formatByOption(options.scientificNotation);

  let dataLabelColour = defineProp("color", "dataLabelColour", "data label colour", "white", options);
  let barColour = [];

    if(Array.isArray(options.barColour)) {
      for(let colour of options.barColour) {
        if(CSS.supports("background-color", colour)) {
          barColour.push(colour);
        } else {
          barColour.push("black");
          invalidOption(options.Id, "bar colour", "barColour");
        }
      }
    }

  let dataLabelPosition;

  for(let arr of data) {

    let posBar = "";
    let posLength = arr[1].length;
    let negBar = "";
    let negLength = arr[0].length;
    let maxVal = posLength > 0 ? arr[1][posLength - 1] : 0;
    let minVal = negLength > 0 ? arr[0][0] : 0;
    if(posLength > 0) {
      let posArr = arr[1];
      for(let i = posLength - 1; i >= 0; i--) {
        let val = i === 0 ? posArr[0] : posArr[i] - posArr[i-1];
        posBar +=`<div
          class="bar ${options.hoverEffect}"
          style="
            align-items: ${options.dataLabelPosition};
            height: ${val * 100 / maxVal}%;
            background-color: ${barColour[i + negLength]}; ">
              <span class="data">${format(posArr[i])}</span>
          </div>`
      }
    } else {
      posBar = `<div class="bar"
      style="
        width: ${100/dataNum}%">
    </div>`
    }

    if(negLength > 0) {
      let negArr = arr[0];
      for(let i = negLength - 1; i >= 0 ; i--) {
        let val = i === negLength - 1 ? negArr[negLength - 1] : negArr[i] - negArr[i+1];
        negBar +=
          (`<div
            class="bar ${options.hoverEffect}"
            style="
              align-items: ${dataLabelPosition};
              height: ${ val * 100 / minVal }%;
              background-color: ${barColour[i]}; ">
                <span class="data">${format(arr[0][i])}</span>
            </div>`
          );
      }
    } else {
      negBar = `<div class="bar"
      style="
        width: ${100/dataNum}%">
    </div>`
    }
      negBars += `<div
          class = "stacked-bar ${options.animationEffect}"
          style="
            color: ${dataLabelColour};
            height: ${100 * minVal / options.minTick}%;
            width: ${100/dataNum}%;
            margin: 0 ${options.barSpacing};
            ">
            ${negBar}
          </div>`
      posBars += `<div
          class = "bar stacked-bar ${options.animationEffect}"
          style="
            color: ${dataLabelColour};
            height: ${100 * maxVal / options.maxTick}%;
            width: ${100/dataNum}%;
            margin: 0 ${options.barSpacing};
            ">
            ${posBar}
          </div>`
  }
  return `<div class="chart-content" style="
  font-size: ${options.dataLabelFontSize};
  background-image: repeating-linear-gradient(
    to top,
    grey 0px,
    grey 1px,
    transparent 1px,
    transparent ${100/(difference/options.tickInterval)}%
    "><div class="bars pos-bars" style=" height: ${100 * options.maxTick/difference}%">${posBars}</div><div class="bars" style="height: ${-100 * options.minTick/difference}%">${negBars}</div></div>`;
}

let makeNonStackedBars = (data, options) => {
  let difference = options.maxTick - options.minTick;
  let posBars = "";
  let negBars = "";
  let dataNum = data.length;

  let format = formatByOption(options.scientificNotation);

  for(let val of data) {
    if(val > 0) {
      posBars +=
      (
        `<div class="bar ${options.hoverEffect} ${options.animationEffect}"
          style="
            align-items: ${options.dataLabelPosition};
            background-color: ${options.barColour};
            color: ${options.dataLabelColour};
            height: ${100 * val / options.maxTick}%;
            width: ${100/dataNum}%;
            margin: 0 ${options.barSpacing}">
          <span class="data">${format(val)}</span>
        </div>`
      )
      negBars +=
      (
        `<div class="bar"
          style="
            width: ${100/dataNum}%;
            margin: 0 ${options.barSpacing}">
        </div>`
      );
    } else {
      negBars +=
      (
        `<div class="bar ${options.hoverEffect} ${options.animationEffect}"
          style="
            align-items: ${options.dataLabelPosition};
            background-color: ${options.barColour};
            color: ${options.dataLabelColour};
            height: ${100 * val / options.minTick}%;
            width: ${100/dataNum}%;
            margin: 0 ${options.barSpacing}">
          ${format(val)}
        </div>`
      );
      posBars +=
      (
        `<div class="bar"
          style="
            width: ${100/dataNum}%;
            margin: 0 ${options.barSpacing}">
        </div>`
      );
    }

  }
  return `<div class="chart-content" style="
  font-size: ${options.dataLabelFontSize};
  background-image: repeating-linear-gradient(
    to top,
    grey 0px,
    grey 1px,
    transparent 1px,
    transparent ${100/(difference/options.tickInterval)}%
    ">
    <div class="bars pos-bars" style=" height: ${100 * options.maxTick/difference}%">${posBars}</div><div class="bars" style="height: ${-100 * options.minTick/difference}%">${negBars}</div></div>`;
}

let makeBars = (data, options) => {
  if(Array.isArray(data[0])) {
    return makeStackedBars(data, options);
  } else {
    return makeNonStackedBars(data, options);
  }
}

let makeXAxis = (labelArr, options) => {
  let xAxis = "";
  let dataNum = labelArr.length;

  //label x-axis
  for(let val of labelArr) {
    xAxis += `<div
      class="${options.hoverEffect}"
      style="width: ${100/dataNum}%; margin: 0 ${options.barSpacing}">
        ${val}
      </div>`;
  };

  return `<div class="x-axis"
    style="font-size: ${options.xAxisLabelFontSize}">
      <div id="left-corner-${options.Id}"></div>
        ${xAxis}
        </div>
        <div class="x-axis-title" style="font-size: ${options.xAxisTitleFontSize}">
          ${options.xAxisTitle}
        </div>`

}

let checkId = (options) => {
  if(!options.hasOwnProperty("Id")) {
    console.log("A bar chart doesn't have an Id, it may causes problem(s) in layout of the bar chart.");
  };
};

//check if the data all the compulsory options are valid
let dataChecker = (data, options) => {
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
    let length = data[0][0].length;
    if(options.hasOwnProperty("barColour")) {
      if(Array.isArray(options.barColour)) {
        if(options.barColour.length < length) {
          console.log("ALERT: Length of bar colour (barColour) is smaller than the number of data.");
          return false;
        }
      } else {
        console.log("ALERT: bar colour (barColour) has to be an array for stacked bar chart");
        return false;
      }
    } else {
      console.log("ALERT: Options do not have bar colour (barColour).");
      return false;
    }
    for(let arr of data[0]) {
      if(arr.length !== length) {
        console.log("ALERT: The value set have different number of data.");
        return false;
      }
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
      for(let i = 0; i < length - 1; i++) {
        if(arr[i] > arr[i+1]) {
          console.log("One of the value set is not in ascending order.");
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

let completeOptions = (options, data) => {

  let checkIfOptionIsValid = (prop, defaultVal, test) => {
    if(options.hasOwnProperty(prop)) {
      if(!test(options[prop])) {
        options[prop] = defaultVal;
      }
    } else {
      options[prop] = defaultVal;
    }
  }

  let length = data.length;

  if(typeof data[0] === "number") {
    options.stacked = false;
  } else {
    options.stacked = true;
  }

  checkIfOptionIsValid("chartTitle", "Untitled", () => true);
  checkIfOptionIsValid("titleFontSize", "36px", (x) => CSS.supports("font-size", x));
  checkIfOptionIsValid("titleColour", "black", (x) => CSS.supports("color", x));
  checkIfOptionIsValid("width", "100vw", (x) => CSS.supports("width", x));
  checkIfOptionIsValid("height", "100vh", (x) => CSS.supports("height", x));
  checkIfOptionIsValid("yAxisTitle", "", () => true);
  checkIfOptionIsValid("yAxisTitleFontSize", "24px", (x) => CSS.supports("font-size", x));
  checkIfOptionIsValid("yAxisLabelFontSize", "16px", (x) => CSS.supports("font-size", x));
  checkIfOptionIsValid("xAxisTitle", "", () => true);
  checkIfOptionIsValid("xAxisTitleFontSize", "24px", (x) => CSS.supports("font-size", x));
  checkIfOptionIsValid("xAxisLabelFontSize", "16px", (x) => CSS.supports("font-size", x));
  checkIfOptionIsValid("dataLabelPosition", "top", (x) => {
    switch(x) {
      case "top":
      case "centre":
      case "bottom":
        return true;
    }
    return false;
  })
  if(options.stacked === false) {
    checkIfOptionIsValid("barColour", "black", (x) => CSS.supports("color", x));
  }
  checkIfOptionIsValid("dataLabelColour", "white", (x) => CSS.supports("color", x));
  checkIfOptionIsValid("dataLabelFontSize", "16px", (x) => CSS.supports("font-size", x));

  let defineBarSpacing = (options, dataNum) => {
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

  options.barSpacing = defineBarSpacing(options, length);

  checkIfOptionIsValid("userSelect", "false", (x) => typeof x === "boolean");

  if(options.userSelect === true) {
    options.userSelect = "auto";
  } else {
    options.userSelect = "none";
  }

  checkIfOptionIsValid("scientificNotation", "false", (x) => typeof x === "boolean");
  checkIfOptionIsValid("animationEffect", "true", (x) => typeof x === "boolean");
  checkIfOptionIsValid("hoverEffect", "true", (x) => typeof x === "boolean");
  options.hoverEffect = makeClass(options.hoverEffect, "info");
  options.animationEffect = makeClass(options.animationEffect, "bar-animation");
  //find the tick interval and value of the maximum tick
  [options.tickInterval,
    options.maxTick,
    options.minTick ] = findTicks(options, Math.max(...data.flat()), Math.min(...data.flat()));

  return options;
}

// top-level function
let drawBarChart = (data, options, element) => {

  if(dataChecker(data, options)) {

    //check if the bar chart has an id
    checkId(options);

    //check if each option is valid and fill in the options that are not filled in
    options = completeOptions(options, data[0]);

    //make title Div
    let chartTitleDiv = makeTitleDiv(options);

    //make y-axis
    let yAxis = makeYAxis(options);

    //plot the bar graph with value in parameter "data"
    let bars = makeBars(data[0], options);

    //label the x axis
    let xAxis = makeXAxis(data[1], options);

    //html of the whole chard
    let chart = `${chartTitleDiv}<div class="middle">${yAxis}${bars}</div>${xAxis}`;

    $( document ).ready(function() {
      element.html(chart);
      element.css("width", options.width);
      element.css("height", options.height);
      element.css("user-select", options.userSelect);
      $( document ).ready(function() {
        $( `#left-corner-${options.Id}` ).css("min-width", `${$( `#y-axis-${options.Id}` ).outerWidth(true)}px`);
      });
    });
} else {
  $( document ).ready(function() {
    element.html("There is problem with the data. Please see web console.");
  });
}
};
