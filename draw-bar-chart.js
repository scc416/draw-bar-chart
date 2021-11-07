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
      class = "chart-title"
      style = "colour: ${colour};
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

  const titleFontSize = options.yAxisTitleFontSize;
  const title = options.yAxisTitle;

  yAxisTitle = (
    `<div
      class = "y-axis-title"
      style = "font-size: ${titleFontSize}">
      ${title}${yAxisTitle}
    `);

  const numOfDecimals = countDecimals(tickInterval);

  const formatTickValue = val => val.toFixed(numOfDecimals);
  const formatTickDiv = formatedVal => `<div style = "height: 0">${formatedVal}</div>`;

  for (let i = minTick; i <= maxTick; i += tickInterval) {
    const val = formatTickValue(i);
    const tickDiv = formatTickDiv(val);
    yAxisLabel += tickDiv;
  }

  yAxisLabel = (
    `<div
      class = "y-axis-label"
      style = "font-size: ${options.yAxisLabelFontSize}">
      ${yAxisLabel}
    </div>`);

  const yAxis = (
    `<div
      class = "y-axis"
      id = "y-axis-${options.Id}">
      ${yAxisTitle + yAxisLabel}
    </div>`);

  return yAxis;
};

const formatByOption = (isScientificNotation) => {
  if (isScientificNotation) {
    return (i) => {
      const exp = i.toExponential(2);
      const index = exp.indexOf("e");
      return `${exp.slice(0, index)}x10<sup><span class = "sup">${exp.slice(index + 1).replace("+", "")}</span></sup>`;
    };
  }
  return i => i;
};

const makeStackedBars = (data, options) => {
  const difference = options.maxTick - options.minTick;
  let posBars = "";
  let negBars = "";
  const dataNum = data.length;
  const positiveData = data.map(arr => arr.filter(x => x >= 0));
  const negativeData = data.map(arr => arr.filter(x => x < 0));
  const widthOfBar = 100 / dataNum + "%";

  const format = formatByOption(options.scientificNotation);

  const dataLabelColour = options.dataLabelColour;
  const barColour = options.barColour;
  const hoverEffectClass = options.hoverEffect;

  const dataLabelPosition = options.dataLabelPosition;
  const blankBar = (
    `<div class = "bar"
      style = "width: ${widthOfBar}">
    </div>`);

  for (let i = 0; i < dataNum; i++) {
    let posBar = "";
    let negBar = "";
    const positiveValues = positiveData[i];
    const numOfPositiveValue = positiveValues.length;
    const negativeValues = negativeData[i];
    const numOfNegativeValue = negativeValues.length;
    const maxVal = numOfPositiveValue > 0 ? positiveValues[numOfPositiveValue - 1] : 0;
    const minVal = numOfNegativeValue > 0 ? negativeValues[0] : 0;
    const thereArePositiveVal = numOfPositiveValue > 0;
    const thereAreNegativeVal = numOfNegativeValue > 0;
    if (thereArePositiveVal) {
      for (let i = numOfPositiveValue - 1; i >= 0; i--) {
        const height = i === 0 ? positiveValues[0] : positiveValues[i] - positiveValues[i - 1];
        posBar += `<div
          class="bar ${hoverEffectClass}"
          style="
            align-items: ${dataLabelPosition};
            height: ${height * 100 / maxVal}%;
            background-color: ${barColour[i + numOfNegativeValue]}; ">
              <span class="data">${format(positiveValues[i])}</span>
          </div>`;
      }
    }
    if (!thereArePositiveVal) posBar = blankBar;

    if (thereAreNegativeVal) {
      for (let i = numOfNegativeValue - 1; i >= 0; i--) {
        const height = i === numOfNegativeValue - 1 ? negativeValues[numOfNegativeValue - 1] : negativeValues[i] - negativeValues[i + 1];
        negBar +=
          (`<div
            class="bar ${options.hoverEffect}"
            style="
              align-items: ${dataLabelPosition};
              height: ${ height * 100 / minVal }%;
              background-color: ${barColour[i]}; ">
                <span class="data">${format(negativeValues[i])}</span>
            </div>`
          );
      }
    }
    if (!thereAreNegativeVal) negBar = blankBar;

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
  let posBars = "";
  let negBars = "";
  const difference = options.maxTick - options.minTick;

  const dataNum = data.length;
  const scientificNotation = options.scientificNotation;
  const format = formatByOption(scientificNotation);
  const hoverEffectClass = options.hoverEffect;
  const animationEffectClass = options.animationEffect;
  const dataLabelPosition = options.dataLabelPosition;
  const labelFontSize = options.dataLabelFontSize;
  const barColour = options.barColour;
  const labelColour = options.dataLabelColour;
  const widthOfBar = 100 / dataNum + "%";
  const horizontalMargin = options.barSpacing;

  const maxTick = options.maxTick;
  const heightOfBarForPositiveValue = val => 100 * val /  maxTick + "%";
  const minTick = options.minTick;
  const heightOfBarForNegativeValue = val => 100 * val /  minTick + "%";

  const blankBar = (
    `<div class="bar"
      style="
        width: ${widthOfBar};
        margin: 0 ${horizontalMargin}">
    </div>`
  );

  const makeBarDiv = (val, isPositive) => {
    const height =
      isPositive
        ? heightOfBarForPositiveValue(val)
        : heightOfBarForNegativeValue(val);
    const formatedVal = format(val);
    const div = (
      `<div class="bar ${hoverEffectClass} ${animationEffectClass}"
        style="
          align-items: ${dataLabelPosition};
          background-color: ${barColour};
          height: ${height};
          width: ${widthOfBar};
          margin: 0 ${horizontalMargin}">
        <span class="data">
          ${formatedVal}
        </span>
      </div>`
    );
    return div;
  };

  for (const val of data) {
    const valIsPostive = val > 0;

    if (valIsPostive) {
      const barDiv = makeBarDiv(val, true);
      posBars += barDiv;
      negBars += blankBar;
    }

    if (!valIsPostive) {
      const barDiv = makeBarDiv(val, false);
      negBars += barDiv;
      posBars += blankBar;
    }
  }

  const heightOfPosBars = 100 * maxTick / difference + "%";
  const heightofNegBars = -100 * minTick / difference + "%";
  const SpaceBetweenTicks = 100 / (difference / options.tickInterval) + "%";

  const barDiv = (
    `<div
      class="chart-content"
      style="
        color: ${labelColour};
        font-size: ${labelFontSize};
        background-image: repeating-linear-gradient(
          to top,
          grey 0px,
          grey 1px,
          transparent 1px,
          transparent ${SpaceBetweenTicks} );">
      <div
        class="bars pos-bars"
        style=" height: ${heightOfPosBars}">
        ${posBars}
      </div>
      <div
        class="bars"
        style="height: ${heightofNegBars}">
        ${negBars}
      </div>
    </div>`
  );
  return barDiv;
};

const makeBars = (data, options) => {
  const barIsStacked = options.stacked;
  if (barIsStacked) return makeStackedBars(data, options);
  return makeNonStackedBars(data, options);
};

const makeXAxis = (labelArr, options) => {
  let xAxis = "";
  const dataNum = labelArr.length;

  const horizontalMargin = options.barSpacing;
  const className = options.hoverEffect;
  const width = 100 / dataNum + "%";
  const makeLabelDiv = val => {
    return `<div
      class = "${className}"
      style = "width: ${width};
        margin: 0 ${horizontalMargin}">
        ${val}
      </div>`;
  };

  //label x-axis
  for (const val of labelArr) {
    const labelDiv = makeLabelDiv(val);
    xAxis += labelDiv;
  }

  const labelFontSize = options.xAxisLabelFontSize;
  const titleFontSize = options.xAxisTitleFontSize;
  const title = options.xAxisTitle;

  xAxis = (
    `<div class = "x-axis"
      style = "font-size: ${labelFontSize}">
        <div id = "left-corner-${options.Id}"></div>
          ${xAxis}
        </div>
    <div
      class = "x-axis-title"
      style = "font-size: ${titleFontSize}">
        ${title}
    </div>`);

  return xAxis;

};

const checkIfAllValuesAreNum = (arr) => {
  for (const val of arr) {
    const valIsNum = isNumber(val);
    if (!valIsNum) {
      console.log("ALERT: One of the value is not number.");
      return false;
    }
  }
  return true;
};

const makeAlertMessage = (alert) => `ALERT: ${alert}`;

//check if the data all the compulsory options are valid
const dataValidationCheck = (data, options) => {

  const dataIsArray = Array.isArray(data.num);
  const labelIsArray = Array.isArray(data.labels);
  const dataAndLabelHaveSameLength = data.num.length === data.labels.length;
  const noData = data.num.length === 0;
  if (noData) {
    const alert = "There is no data.";
    console.log(makeAlertMessage(alert));
    return false;
  }

  if (!dataIsArray) {
    const alert = "Data set is not an array.";
    console.log(makeAlertMessage(alert));
    return false;
  }
  if (!labelIsArray) {
    const alert = "Label set is not an array.";
    console.log(makeAlertMessage(alert));
    return false;
  }
  if (!dataAndLabelHaveSameLength) {
    const alert = "Number of data doesn't match with number of label";
    console.log(makeAlertMessage(alert));
    return false;
  }

  const dataValues = data.num;
  const firstValue = dataValues[0];
  const barChartIsStacked = Array.isArray(firstValue);
  options.stacked = barChartIsStacked;
  if (!barChartIsStacked) {
    const allValAreNumber = checkIfAllValuesAreNum(dataValues);
    if (!allValAreNumber) return false;
  }
  if (barChartIsStacked) {
    const numOfStacked = firstValue.length;
    for (const dataForAStackedBar of data.num) {
      const dataIsArray = Array.isArray(dataForAStackedBar);
      if (!dataIsArray) {
        const alert = "One of the value set is not an array.";
        console.log(makeAlertMessage(alert));
        return false;
      }
      const stackedNumIsValid = dataForAStackedBar.length === numOfStacked;
      if (!stackedNumIsValid) {
        const alert = "The value set have different number of data.";
        console.log(makeAlertMessage(alert));
        return false;
      }
      const allValAreNumber = checkIfAllValuesAreNum(dataForAStackedBar);
      if (!allValAreNumber) return false;

      for (let i = 0; i < numOfStacked - 1; i++) {
        if (dataForAStackedBar[i] > dataForAStackedBar[i + 1]) {
          const alert = "One of the value set is not in ascending order.";
          console.log(makeAlertMessage(alert));
          return false;
        }
      }
    }
  }

  const idIsDefined = "Id" in options;
  if (!idIsDefined) {
    const alert = "A bar chart doesn't have an Id, it may causes problem(s) in layout of the bar chart.";
    console.log(makeAlertMessage(alert));
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
      const numOfColourInOptions = barColourInOption.length;
      for (let i = 0; i < dataNum; i ++) {
        const indexOfColor = i % numOfColourInOptions;
        const colour = barColourInOption[indexOfColor];
        const colourIsValid = CSS.supports("background-color", colour);
        if (colourIsValid) barColour.push(colour);
        if (!colourIsValid) barColour.push("black");
      }
    }
    if (!barColourInOptionsIsArray) {
      const barColourIsValid = CSS.supports("background-colour", barColourInOption);
      const everyBarColour =
        barColourIsValid
          ? barColourInOption
          : "black";
      for (let i = 0; i < dataNum; i++) barColour.push(everyBarColour);
    }
    options.barColour = barColour;
  }

  if (!options.stacked) {
    checkIfOptionIsValid("barColour", "black", x => CSS.supports("color", x));
  }

  checkIfOptionIsValid("chartTitle", "Untitled", x => x !== undefined);
  checkIfOptionIsValid("titleFontSize", "36px", x => CSS.supports("font-size", x));
  checkIfOptionIsValid("titleColour", "black", x => CSS.supports("color", x));
  checkIfOptionIsValid("width", "90vw", x => CSS.supports("width", x));
  checkIfOptionIsValid("height", "90vh", x => CSS.supports("height", x));
  checkIfOptionIsValid("yAxisTitle", "", x => x !== undefined);
  checkIfOptionIsValid("yAxisTitleFontSize", "24px", x => CSS.supports("font-size", x));
  checkIfOptionIsValid("yAxisLabelFontSize", "16px", x => CSS.supports("font-size", x));
  checkIfOptionIsValid("xAxisTitle", "", x => x !== undefined);
  checkIfOptionIsValid("xAxisTitleFontSize", "24px", x => CSS.supports("font-size", x));
  checkIfOptionIsValid("xAxisLabelFontSize", "16px", x => CSS.supports("font-size", x));

  switch(options.dataLabelPosition) {
    case ("top"):
      options.dataLabelPosition = "flex-start";
      break;
    case ("centre"):
      options.dataLabelPosition = "center";
      break;
    case ("bottom"):
      options.dataLabelPosition = "flex-end";
      break;
    default:
      options.dataLabelPosition = "flex-start";
  }

  checkIfOptionIsValid("dataLabelColour", "white", x => CSS.supports("color", x));
  checkIfOptionIsValid("dataLabelFontSize", "16px", x => CSS.supports("font-size", x));

  const defineBarSpacing = (dataNum) => {
    const barSpacingIsValid = CSS.supports("margin", options.barSpacing);
    if (barSpacingIsValid) {
      const num = parseFloat(options.barSpacing.replace(/\D*/g, ""));
      const unit = options.barSpacing.replace(/\d*/g, "");
      const margin = num / 2 + unit;
      return options.barSpacing = margin;
    }
    const defaultMargin = 10 / (dataNum) + "%";
    return options.barSpacing = defaultMargin;
  };

  defineBarSpacing(dataNum);

  checkIfOptionIsValid("userSelect", "false", x => typeof x === "boolean");

  if (options.userSelect === true) {
    options.userSelect = "auto";
  } else {
    options.userSelect = "none";
  }

  checkIfOptionIsValid("scientificNotation", "false", x => typeof x === "boolean");
  checkIfOptionIsValid("animationEffect", "true", x => typeof x === "boolean");
  checkIfOptionIsValid("hoverEffect", "true", x => typeof x === "boolean");

  const makeClassForEffect = (property, styleClass) => {
    const effectIsOff = options[property] === false;
    if (effectIsOff) return options[property] = "";
    return options[property] = styleClass;
  };

  makeClassForEffect("hoverEffect", "info");
  makeClassForEffect("animationEffect", "bar-animation");


  const maxValue = Math.max(...data.flat());
  const minValue = Math.min(...data.flat());
  //find the tick interval and value of the maximum tick
  const { tickInterval, maxTick, minTick } = findTicks(options, maxValue, minValue);
  options.tickInterval = tickInterval;
  options.maxTick = maxTick;
  options.minTick = minTick;
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
