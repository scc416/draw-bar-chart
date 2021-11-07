/* eslint-env jquery */
/* eslint-env browser */


// to-do list
// refractor
// add comments
// make notes
// edit readme.md
// make github pages

// this function is to reimplement the function Math.pow(10, num)
const powerOfTen = (num) => {
  let result = 1;
  while (num > 0) {
    result *= 10;
    num --;
  }
  while (num < 0) {
    result /= 10;
    num ++;
  }
  return result;
};

const makeClass = (property, styleClass) => {
  if (!property) return styleClass;
  return "";
};

// check if input's type is number
const isNumber = (num) => {
  const isNumber = typeof num === "number";
  if (isNumber) return true;
  return false;
};

//function that use the options to create div for the chart title
const makeTitleDiv = (options) => {
  const colour = options.titleColour;
  const fontSize = options.titleFontSize;
  const title = options.chartTitle;
  return (
    `<div
      class="chart-title"
      style="colour: ${colour};
        font-size: ${fontSize}">
      ${title}
    </div>`);
};

// the function that find the value of tick interval, max. and min. tick
const findTicks = (options, maxVal, minVal) => {

  const difference = maxVal - minVal;

  const defaultInterval = () => {

    if (difference >= 1) {
      const roundUpDifference = Math.ceil(difference);
      const numOfDigit = roundUpDifference.toString().length;
      const interval = powerOfTen(numOfDigit - 1);
      return interval;
    }

    let pow = 0;
    while (difference <= powerOfTen(pow)) pow --;
    const interval = powerOfTen(pow);
    return interval;
  };

  const tickIntervalInOptions = options.tickInterval;
  const tickIntervalIsNumber = isNumber(tickIntervalInOptions);

  const tickInterval =
    tickIntervalIsNumber
      ? tickIntervalInOptions
      : defaultInterval();

  const maxTick = Math.ceil(maxVal / tickInterval) * tickInterval;
  const minTick = Math.floor(minVal / tickInterval) * tickInterval;

  //if all values are positive (or zero)
  if (minVal >= 0) return { tickInterval, maxTick, minTick: 0 };

  //if all values are negative (or zero)
  if (maxVal <= 0) return { tickInterval, minTick, maxTick: 0 };

  // there are both positive and negative values
  return { tickInterval, maxTick, minTick };
};

const countDecimals = (val) => {
  if (Math.floor(val) === val) return 0;
  return val.toString().split(".")[1].length || 0;
};

const makeYAxis = (options) => {
  let yAxisLabel = "";
  let yAxisTitle = "</div>";

  let maxTick = options.maxTick;
  let minTick = options.minTick;
  let tickInterval = options.tickInterval;

  if (options.scientificNotation) {
    const exp = options.tickInterval.toExponential(2);
    const index = exp.indexOf("e");
    const pow = parseInt(exp.slice(index + 1));
    maxTick /= powerOfTen(pow);
    minTick /= powerOfTen(pow);
    tickInterval = parseFloat(exp.slice(0, index));
    if (pow !== 0) yAxisTitle = ` (10<sup>${pow}</sup>)${yAxisTitle}`;
  }

  yAxisTitle = (
    `<div
      class="y-axis-title"
      style="font-size: ${options.yAxisTitleFontSize}">
      ${options.yAxisTitle +  yAxisTitle}
    `);

  const decimals = countDecimals(tickInterval);
  const max = maxTick / tickInterval;
  const min = minTick / tickInterval;
  for (let i = min; i <= max; i ++) {
    yAxisLabel += `<div style="height: 0">${(i * tickInterval).toFixed(decimals)}</div>`;
  }

  yAxisLabel = `<div class="y-axis-label" style="font-size: ${options.yAxisLabelFontSize}">${yAxisLabel}</div>`;

  return `<div class="y-axis" id="y-axis-${options.Id}">${yAxisTitle + yAxisLabel}</div>`;
};

const formatByOption = (opt) => {
  if (opt) {
    return (i) => {
      const exp = i.toExponential(2);
      const index = exp.indexOf("e");
      return `${exp.slice(0, index)}x10<sup><span class="sup">${exp.slice(index + 1).replace("+", "")}</span></sup>`;
    };
  } else {
    return i => i;
  }
};

const makeStackedBars = (data, options) => {
  const difference = options.maxTick - options.minTick;
  let posBars = "";
  let negBars = "";
  const dataNum = data.length;
  data = data.map(arr => [arr.filter(x => x < 0), arr.filter(x => x >= 0)]);

  const format = formatByOption(options.scientificNotation);

  const dataLabelColour = options.dataLabelColour;
  const barColour = options.barColour;



  let dataLabelPosition;

  for (const arr of data) {
    let posBar = "";
    const posLength = arr[1].length;
    let negBar = "";
    const negLength = arr[0].length;
    const maxVal = posLength > 0 ? arr[1][posLength - 1] : 0;
    const minVal = negLength > 0 ? arr[0][0] : 0;
    if (posLength > 0) {
      const posArr = arr[1];
      for (let i = posLength - 1; i >= 0; i--) {
        const val = i === 0 ? posArr[0] : posArr[i] - posArr[i - 1];
        posBar += `<div
          class="bar ${options.hoverEffect}"
          style="
            align-items: ${options.dataLabelPosition};
            height: ${val * 100 / maxVal}%;
            background-color: ${barColour[i + negLength]}; ">
              <span class="data">${format(posArr[i])}</span>
          </div>`;
      }
    } else {
      posBar = `<div class="bar"
      style="
        width: ${100 / dataNum}%">
    </div>`;
    }

    if (negLength > 0) {
      const negArr = arr[0];
      for (let i = negLength - 1; i >= 0; i--) {
        const val = i === negLength - 1 ? negArr[negLength - 1] : negArr[i] - negArr[i + 1];
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
      negBar = (`<div class="bar"
      style="
        width: ${100 / dataNum}%">
    </div>`);
    }
    negBars += `<div
      class = "stacked-bar ${options.animationEffect}"
      style="
        color: ${dataLabelColour};
        height: ${100 * minVal / options.minTick}%;
        width: ${100 / dataNum}%;
        margin: 0 ${options.barSpacing};
        ">
        ${negBar}
      </div>`;
    posBars +=
      (`<div
        class = "bar stacked-bar ${options.animationEffect}"
        style = "
          color: ${dataLabelColour};
          height: ${100 * maxVal / options.maxTick}%;
          width: ${100 / dataNum}%;
          margin: 0 ${options.barSpacing};
          ">
          ${posBar}
      </div>`);
  }
  return `<div class="chart-content" style="
  font-size: ${options.dataLabelFontSize};
  background-image: repeating-linear-gradient(
    to top,
    grey 0px,
    grey 1px,
    transparent 1px,
    transparent ${100 / (difference / options.tickInterval)}%
    "><div class="bars pos-bars" style=" height: ${100 * options.maxTick / difference}%">${posBars}</div><div class="bars" style="height: ${-100 * options.minTick / difference}%">${negBars}</div></div>`;
};

const makeNonStackedBars = (data, options) => {
  const difference = options.maxTick - options.minTick;
  let posBars = "";
  let negBars = "";
  const dataNum = data.length;
  const format = formatByOption(options.scientificNotation);

  for (const val of data) {
    if (val > 0) {
      posBars +=
      (
        `<div class="bar ${options.hoverEffect} ${options.animationEffect}"
          style="
            align-items: ${options.dataLabelPosition};
            background-color: ${options.barColour};
            color: ${options.dataLabelColour};
            height: ${100 * val / options.maxTick}%;
            width: ${100 / dataNum}%;
            margin: 0 ${options.barSpacing}">
          <span class="data">${format(val)}</span>
        </div>`
      );
      negBars +=
      (
        `<div class="bar"
          style="
            width: ${100 / dataNum}%;
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
            width: ${100 / dataNum}%;
            margin: 0 ${options.barSpacing}">
          ${format(val)}
        </div>`
      );
      posBars +=
      (
        `<div class="bar"
          style="
            width: ${100 / dataNum}%;
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
    transparent ${100 / (difference / options.tickInterval)}%
    ">
    <div class="bars pos-bars" style=" height: ${100 * options.maxTick / difference}%">${posBars}</div><div class="bars" style="height: ${-100 * options.minTick / difference}%">${negBars}</div></div>`;
};

const makeBars = (data, options) => {
  const barIsStacked = Array.isArray(data[0]);
  if (barIsStacked) return makeStackedBars(data, options);
  return makeNonStackedBars(data, options);
};

const makeXAxis = (labelArr, options) => {
  let xAxis = "";
  const dataNum = labelArr.length;

  //label x-axis
  for (const val of labelArr) {
    xAxis += `<div
      class="${options.hoverEffect}"
      style="width: ${100 / dataNum}%; margin: 0 ${options.barSpacing}">
        ${val}
      </div>`;
  }

  return `<div class="x-axis"
    style="font-size: ${options.xAxisLabelFontSize}">
      <div id="left-corner-${options.Id}"></div>
        ${xAxis}
        </div>
        <div class="x-axis-title" style="font-size: ${options.xAxisTitleFontSize}">
          ${options.xAxisTitle}
        </div>`;

};

const checkIfEachValueAreNum = (arr) => {
  for (const val of arr) {
    const valIsNum = isNumber(val);
    if (!valIsNum) {
      console.log("ALERT: One of the value is not number.");
      return false;
    }
  }
  return true;
}

//check if the data all the compulsory options are valid
const dataValidationCheck = (data, options) => {
  // if (!(num in data)) {
  //   console.log("ALERT: Data input is not an array.");
  //   return false;
  // }
  const dataIsArray = Array.isArray(data.num);
  const labelIsArray = Array.isArray(data.labels);
  const dataAndLabelHaveSameLength = data.num.length === data.labels.length
  if (!dataIsArray) {
    console.log("ALERT: Data set is not an array.");
    return false;
  }
  if (!labelIsArray) {
    console.log("ALERT: Label set is not an array.");
    return false;
  }
  if (!dataAndLabelHaveSameLength) {
    console.log("ALERT: Number of data doesn't match with number of label");
    return false;
  }

  const dataValues = data.num;
  const firstValue = dataValues[0];
  const barChartIsStacked = Array.isArray(firstValue);
  options.stacked = barChartIsStacked;
  if (!barChartIsStacked) {
    const allValAreNumber = checkIfEachValueAreNum(dataValues);
    if (!allValAreNumber) return false;
  }
  if (barChartIsStacked) {
    const numOfStacked = firstValue.length;
    for (const dataForAStackedBar of data.num) {
      const dataIsArray = Array.isArray(dataForAStackedBar);
      if (!dataIsArray) {
        console.log("ALERT: One of the value set is not an array.");
        return false;
      }
      const stackedNumIsValid = dataForAStackedBar.length === numOfStacked;
      if (!stackedNumIsValid) {
        console.log("ALERT: The value set have different number of data.");
        return false;
      }
      const allValAreNumber = checkIfEachValueAreNum(dataForAStackedBar);
      if (!allValAreNumber) return false;

      for (let i = 0; i < numOfStacked - 1; i++) {
        if (arr[i] > arr[i + 1]) {
          console.log("One of the value set is not in ascending order.");
          return false;
        }
      }
    }
  }
  if (!("Id" in options)) {
    console.log("A bar chart doesn't have an Id, it may causes problem(s) in layout of the bar chart.");
  }
  return true;
};

const completeOptions = (options, data) => {

  const checkIfOptionIsValid = (prop, defaultVal, callback) => {
    const val = options[prop];
    const valIsValid = callback(val);
    if (valIsValid) return options[prop] = val;
    return options[prop] = defaultVal;
  };

  const dataNum = data.length;

  if (options.stacked) {
    const barColour = [];
    const barColourInOption = options.barColour;
    const barColourInOptionsIsArray = Array.isArray(barColourInOption);
    if (barColourInOptionsIsArray) {
      for (const colour of barColourInOption) {
        const colourIsValid = CSS.supports("background-color", colour);
        if (colourIsValid) barColour.push(colour);
        if (!colourIsValid) barColour.push("black");
      }
    }
    if (!barColourInOptionsIsArray) {
      for (let i = 0; i < dataNum; i++) barColour.push("black");
    }
    options.barColour = barColour;
  }
  if (!options.stacked) {
    checkIfOptionIsValid("barColour", "black", (x) => CSS.supports("color", x));
  }

  checkIfOptionIsValid("chartTitle", "Untitled", () => true);
  checkIfOptionIsValid("titleFontSize", "36px", (x) => CSS.supports("font-size", x));
  checkIfOptionIsValid("titleColour", "black", (x) => CSS.supports("color", x));
  checkIfOptionIsValid("width", "90vw", (x) => CSS.supports("width", x));
  checkIfOptionIsValid("height", "90vh", (x) => CSS.supports("height", x));
  checkIfOptionIsValid("yAxisTitle", "", () => true);
  checkIfOptionIsValid("yAxisTitleFontSize", "24px", (x) => CSS.supports("font-size", x));
  checkIfOptionIsValid("yAxisLabelFontSize", "16px", (x) => CSS.supports("font-size", x));
  checkIfOptionIsValid("xAxisTitle", "", () => true);
  checkIfOptionIsValid("xAxisTitleFontSize", "24px", (x) => CSS.supports("font-size", x));
  checkIfOptionIsValid("xAxisLabelFontSize", "16px", (x) => CSS.supports("font-size", x));

  const labelPosition = ["top", "centre", "bottom"];
  checkIfOptionIsValid("dataLabelPosition", "top", (x) => labelPosition.indexOf(x) > -1);

  checkIfOptionIsValid("dataLabelColour", "white", (x) => CSS.supports("color", x));
  checkIfOptionIsValid("dataLabelFontSize", "16px", (x) => CSS.supports("font-size", x));

  let defineBarSpacing = (options, dataNum) => {
    if ("barSpacing" in options) {
      if (CSS.supports("margin", options.barSpacing)) {
        let num = parseFloat(options.barSpacing.replace(/\D*/g, ""));
        let unit = options.barSpacing.replace(/\d*/g, "");
        return num / 2 + unit;
      }
    }
    return 10 / (dataNum) + "%";
  };

  options.barSpacing = defineBarSpacing(options, dataNum);

  checkIfOptionIsValid("userSelect", "false", (x) => typeof x === "boolean");

  if (options.userSelect) {
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
  const { tickInterval, maxTick, minTick } = findTicks(options, Math.max(...data.flat()), Math.min(...data.flat()));
  options.tickInterval = tickInterval;
  options.maxTick = maxTick;
  options.minTick = minTick;

  return options;
};


/* eslint-disable no-unused-vars */
// top-level function
const drawBarChart = (data, options, element) => {
/* eslint-enable no-unused-vars */
  const dataAreValid = dataValidationCheck(data, options);

  if (!dataAreValid) {
    $(document).ready(() => {
      element.html("There is problem with the data. Please see web console.");
    });
  }

  if (dataAreValid) {

    //check if each option is valid and fill in default value to the options that are not filled in / values are not valid
    completeOptions(options, data.num);

    //make title Div
    const chartTitleDiv = makeTitleDiv(options);

    //make y-axis
    const yAxis = makeYAxis(options);

    //plot the bar graph with value in parameter "data"
    const bars = makeBars(data.num, options);

    //label the x axis
    const xAxis = makeXAxis(data.labels, options);

    //html of the whole chard
    const chart = `${chartTitleDiv}<div class="middle">${yAxis}${bars}</div>${xAxis}`;

    $(document).ready(function() {
      element.html(chart);
      element.css("width", options.width);
      element.css("height", options.height);
      element.css("user-select", options.userSelect);
      $(document).ready(function() {
        $(`#left-corner-${options.Id}`).css("min-width", `${$(`#y-axis-${options.Id}`
        ).outerWidth(true)}px`);
      });
    });
  }


};
