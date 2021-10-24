// to-do list
// refractor
// extra flare with things like CSS transitions and animations
// add comments
// make notes

//this function is to reaplce function Math.pow, which can be inaccurate, this func
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

let makeClass = (options, property, styleClass, key) => {
  if (options.hasOwnProperty(property)) {
    if (options[property] === false) {
      return "";
    } else if (typeof options[property] !== "boolean") {
      invalidOption(options.Id, property, key);
    }
  }
  return styleClass;
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

  if(minVal >= 0) {

    let maxTick = Math.ceil(maxVal/tickInterval) * tickInterval;

    return [tickInterval, maxTick, 0];

  } else if (maxVal <= 0) {

    let minTick = Math.floor(minVal/tickInterval) * tickInterval;

    return [tickInterval, 0, minTick];
  } else {

    let maxTick = Math.ceil(maxVal/tickInterval) * tickInterval;
    let minTick = Math.floor(minVal/tickInterval) * tickInterval;

    return [tickInterval, maxTick, minTick];
  }

}

let countDecimals = (val) => {
  if(Math.floor(val) === val) return 0;
  return val.toString().split(".")[1].length || 0;
}


let makeYAxis = (tickInterval, maxTick, minTick, options, dataNum) => {
  let yAxisLabel = "";
  let yAxisTitle = "</div>";
  let yAxisTitleFontSize = defineProp("font-size", "yAxisTitleFontSize", "y-axis title font size", "24px", options);
  let yAxisLabelFontSize = defineProp("font-size", "yAxisLabelFontSize", "y-axis label font size", "16px", options);

  if(options.hasOwnProperty("scientificNotation")) {
    if(options.scientificNotation === true) {
      let exp = tickInterval.toExponential(2);
      let index = exp.indexOf("e");
      let pow = parseInt(exp.slice(index+1));
      maxTick /= powerOfTen(pow);
      tickInterval = parseFloat(exp.slice(0, index));
      if(pow !== 0) {
        yAxisTitle = ` (10<sup>${pow}</sup>)${yAxisTitle}`;
      }
    };
  }

  if(options.hasOwnProperty("yAxisTitle")) {
    yAxisTitle = `<div class="y-axis-title" style="font-size: ${yAxisTitleFontSize}">${options.yAxisTitle +  yAxisTitle}`;
  } else {
    yAxisTitle = `<div class="y-axis-title style="font-size: ${yAxisTitleFontSize}">${yAxisTitle}`
  }
2
  let decimals = countDecimals(tickInterval);
  let max = maxTick / tickInterval;
  let min = minTick / tickInterval;
  for(let i = min; i <= max; i ++) {
    yAxisLabel += `<div style="height: 0">${(i * tickInterval).toFixed(decimals)}</div>`;
  }

  yAxisLabel = `<div class="y-axis-label" style="font-size: ${yAxisLabelFontSize}">${yAxisLabel}</div>`;

  return `<div class="y-axis" id="y-axis-${options.Id}">${yAxisTitle + yAxisLabel}</div>`;
}

let formatByOption = (options) => {
  if(options.hasOwnProperty("scientificNotation")) {
    if(options.scientificNotation === true) {
      return (i) => {
        let exp = i.toExponential(2);
        let index = exp.indexOf("e");
        return `${exp.slice(0, index)}x10<sup><span class="sup">${exp.slice(index + 1).replace("+", "")}</span></sup>`
    }
    } else if (options.scientificNotation === false) {
      return i => i;
    } else {
      invalidOption(options.Id, "option for scientific notation", "scientificNotation");
      return i => i;
    }
  } else {
    return i => i;
  }

}

let makeStackedBars = (data, maxTick, minTick, options, barSpacing, tickInterval) => {
  let difference = maxTick - minTick;
  let posBars = "";
  let negBars = "";
  let dataNum = data.length;
  let stackedNum = data[0].length;
  data = data.map(arr => [arr.filter(x => x < 0), arr.filter(x => x >= 0)]);

  let format = formatByOption(options);

  let dataLabelColour = defineProp("color", "dataLabelColour", "data label colour", "white", options);
  let dataLabelFontSize = defineProp("font-size", "dataLabelFontSize", "data label font size", "16px", options);
  let barColour = [];
  if(options.hasOwnProperty("barColour")) {
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
  } else {
    invalidOption(options.Id, "bar colour", "barColour");
    for(let i = 0; i < stackedNum; i++) {
      barColour.push("black");
    }
  }
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

  let barClass = makeClass(options, "hoverEffect", "info", "hover effect");

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
          class="bar ${barClass}"
          style="
            align-items: ${dataLabelPosition};
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

    let barAnimationClass = makeClass(options, "animationEffect", "bar-animation", "animation effect");

    if(negLength > 0) {
      let negArr = arr[0];
      for(let i = negLength - 1; i >= 0 ; i--) {
        let val = i === negLength - 1 ? negArr[negLength - 1] : negArr[i] - negArr[i+1];
        negBar +=
          (`<div
            class="bar ${barClass}"
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
          class = "stacked-bar ${barAnimationClass}"
          style="
            color: ${dataLabelColour};
            height: ${100 * minVal / minTick}%;
            width: ${100/dataNum}%;
            margin: 0 ${barSpacing};
            ">
            ${negBar}
          </div>`
      posBars += `<div
          class = "bar stacked-bar ${barAnimationClass}"
          style="
            color: ${dataLabelColour};
            height: ${100 * maxVal / maxTick}%;
            width: ${100/dataNum}%;
            margin: 0 ${barSpacing};
            ">
            ${posBar}
          </div>`
  }
  return `<div class="chart-content" style="
  font-size: ${dataLabelFontSize};
  background-image: repeating-linear-gradient(
    to top,
    grey 0px,
    grey 1px,
    transparent 1px,
    transparent ${100/(difference/tickInterval)}%
    "><div class="bars pos-bars" style=" height: ${100 * maxTick/difference}%">${posBars}</div><div class="bars" style="height: ${-100 * minTick/difference}%">${negBars}</div></div>`;
}

let makeNonStackedBars = (data, maxTick, minTick, options, barSpacing, tickInterval) => {
  let difference = maxTick - minTick;
  let posBars = "";
  let negBars = "";
  let dataNum = data.length;

  let format = formatByOption(options);

  let dataLabelColour = defineProp("color", "dataLabelColour", "data label colour", "white", options);
  let dataLabelFontSize = defineProp("font-size", "dataLabelFontSize", "data label font size", "16px", options);
  let barColour = defineProp("background-color", "barColour", "bar colour", "black", options);
  let dataLabelPosition;
  let barClass = makeClass(options, "hoverEffect", "info", "hover effect");
  let barAnimationClass = makeClass(options, "animationEffect", "bar-animation", "animation effect");

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
    if(val > 0) {
      posBars +=
      (
        `<div class="bar ${barClass} ${barAnimationClass}"
          style="
            align-items: ${dataLabelPosition};
            background-color: ${barColour};
            color: ${dataLabelColour};
            height: ${100 * val / maxTick}%;
            width: ${100/dataNum}%;
            margin: 0 ${barSpacing}">
          <span class="data">${format(val)}</span>
        </div>`
      )
      negBars +=
      (
        `<div class="bar"
          style="
            width: ${100/dataNum}%;
            margin: 0 ${barSpacing}">
        </div>`
      );
    } else {
      negBars +=
      (
        `<div class="bar ${barClass} ${barAnimationClass}"
          style="
            align-items: ${dataLabelPosition};
            background-color: ${barColour};
            color: ${dataLabelColour};
            height: ${100 * val / minTick}%;
            width: ${100/dataNum}%;
            margin: 0 ${barSpacing}">
          ${format(val)}
        </div>`
      );
      posBars +=
      (
        `<div class="bar"
          style="
            width: ${100/dataNum}%;
            margin: 0 ${barSpacing}">
        </div>`
      );
    }

  }
  return `<div class="chart-content" style="
  font-size: ${dataLabelFontSize};
  background-image: repeating-linear-gradient(
    to top,
    grey 0px,
    grey 1px,
    transparent 1px,
    transparent ${100/(difference/tickInterval)}%
    "><div class="bars pos-bars" style=" height: ${100 * maxTick/difference}%">${posBars}</div><div class="bars" style="height: ${-100 * minTick/difference}%">${negBars}</div></div>`;
}

let makeBars = (data, maxTick, minTick, options, barSpacing, tickInterval) => {
  if(Array.isArray(data[0])) {
    return makeStackedBars(data, maxTick, minTick, options, barSpacing, tickInterval);
  } else {
    return makeNonStackedBars(data, maxTick, minTick, options, barSpacing, tickInterval);
  }
}

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

let makeXAxis = (labelArr, options, barSpacing) => {
  let xAxis = "";
  let dataNum = labelArr.length;
  let xAxisTitleFontSize = defineProp("font-size", "xAxisTitleFontSize", "x-axis title font size", "24px", options);
  let xAxisLabelFontSize = defineProp("font-size", "xAxisLabelFontSize", "x-axis label font size", "16px", options);
  let barClass = makeClass(options, "hoverEffect", "info", "hover effect");
  //label x-axis
  for(let val of labelArr) {
    xAxis += (`<div class="${barClass}" style="width: ${100/dataNum}%; margin: 0 ${barSpacing}">${val}</div>`);
  };

  xAxis = `<div class="x-axis" style="font-size: ${xAxisLabelFontSize}"><div id="left-corner-${options.Id}"></div>${xAxis}</div>`

  if(options.hasOwnProperty("xAxisTitle")) {
    xAxis += `<div class="x-axis-title" style="font-size: ${xAxisTitleFontSize}">${options.xAxisTitle}</div>`;
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
    if(options.userSelect){
      element.css("user-select", "auto");
    }
  }
}

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
        if(options.barColour.length !== length) {
          console.log("ALERT: Length of bar colour (barColour) doesn't match with the number of data.");
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

// top-level function
let drawBarChart = (data, options, element) => {

  if(dataChecker(data, options)) {

    //check if the bar chart has an id
    checkId(options);

    //make title Div
    let chartTitleDiv = makeTitleDiv(options);

    //the maximum value in data
    let maxVal = Math.max(...data[0].flat());

    //the minimum value in data
    let minVal = Math.min(...data[0].flat());

    //find the tick interval and value of the maximum tick
    let [tickInterval, maxTick, minTick] = findTicks(options, maxVal, minVal);

    //make div for the ticks and labels on y-axis
    let yAxis = makeYAxis(tickInterval, maxTick, minTick, options, (maxTick - minTick)/tickInterval);

    let barSpacing = defineBarSpacing(options, data[1].length);

    //plot the bar graph with value in parameter "data"
    let bars = makeBars(data[0], maxTick, minTick, options, barSpacing, tickInterval);

    //label the x axis
    let xAxis = makeXAxis(data[1], options, barSpacing);

    //html of the whole chard
    let chart = `${chartTitleDiv}<div class="middle">${yAxis}${bars}</div>${xAxis}`;

    $( document ).ready(function() {
      element.html(chart);
      setWidthHeight(options, element);
      setUserSelect(options, element);
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
