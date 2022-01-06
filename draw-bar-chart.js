// default colour for bar chart
const DEFAULT_CSS_COLOR = ["SkyBlue", "Orchid", "LightGreen", "Coral"];

// string for error messages
const noValueErrorMsg = "No Value.";
const valIsNotNumberErrorMsg = "One of the value is not number.";
const noDataErrorMsg = "There is no data.";
const dataIsNotArrayErrorMsg = "Data set is not an array.";
const labelIsNotArrayErrorMsg = "Label set is not an array.";
const dataNumAreNotMatchErrorMsg =
  "Number of data doesn't match with number of label";
const stackedDataIsNotArrayErrorMsg = "One of the value set is not an array.";
const stackedValueSetNumErrorMsg =
  "The value set have different number of data.";
const noIdErrorMsg =
  "A bar chart doesn't have an Id, it may causes problem(s) in layout of the bar chart.";
const stackLabelNumErrorMsg =
  "Number of stack doesn't match with number of stack label";

// escape function to avoid XSS
const escape = function (str) {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// check if input's type is number
const isNumber = (num) => {
  const isNumber = typeof num === "number";
  if (isNumber) return true;
  return false;
};

const multiplyCSSValue = (value, multipleNum) => {
  const num = parseFloat(value.replace(/\D*$/, ""));
  const unit = value.replace(/\d*/g, "").replace(".", "");
  const result = num * multipleNum + unit;
  return result;
};

//function that use the options to create div for the chart title
const makeTitleDiv = (options) => {
  const { titleColour, titleFontSize, chartTitle } = options;

  return `<div
      class = "chart-title"
      style = "color: ${titleColour};
        font-size: ${titleFontSize}">
      ${chartTitle}
    </div>`;
};

// the function that find the value of tick interval, max. and min. tick
const findTicks = (tickIntervalInOptions, maxVal, minVal) => {
  const defaultInterval = () => {
    const difference = maxVal > -minVal ? maxVal : -minVal;
    if (difference >= 1) {
      const roundUpDifference = Math.ceil(difference);
      const numOfDigit = roundUpDifference.toString().length;
      const interval = Math.pow(10, numOfDigit - 1);
      return interval;
    }

    let pow = 0;
    while (difference <= 1 / Math.pow(10, pow)) pow++;
    const interval = 1 / Math.pow(10, pow);
    return interval;
  };

  const tickIntervalIsNumber = isNumber(tickIntervalInOptions);

  const tickInterval = tickIntervalIsNumber
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
  const noDecimalPlace = Math.floor(val) === val;
  if (noDecimalPlace) return 0;
  const strAfterDecimal = val.toString().split(".")[1];
  const numOfDecimal = strAfterDecimal.length;
  return numOfDecimal || 0;
};

const makeYAxis = (options) => {
  let yAxisLabel = "";
  let yAxisTitle = "</div>";

  let {
    maxTick,
    minTick,
    tickInterval,
    scientificNotation,
    yAxisTitleFontSize,
    yAxisTitle: yAxisTitleText,
    yAxisLabelFontSize,
    id,
  } = options;

  if (scientificNotation) {
    const exp = options.maxTick.toExponential(2);
    const power = parseInt(exp.split("e")[1]);
    maxTick /= Math.pow(10, power);
    minTick /= Math.pow(10, power);
    tickInterval /= Math.pow(10, power);
    yAxisTitle = ` (10<sup>${power}</sup>)${yAxisTitle}`;
  }

  yAxisTitle = `<div
      id = "y-axis-title-${id}"
      class = "y-axis-title"
      style = "font-size: ${yAxisTitleFontSize}">
      ${yAxisTitleText}${yAxisTitle}
    `;

  const numOfDecimals = countDecimals(tickInterval);

  const formatTickValue = (val) => val.toFixed(numOfDecimals);
  const formatTickDiv = (formatedVal) => `<div>${formatedVal}</div>`;

  for (let i = minTick; i <= maxTick; i += tickInterval) {
    const val = formatTickValue(i);
    const tickDiv = formatTickDiv(val);
    yAxisLabel += tickDiv;
  }

  yAxisLabel = `<div
      class = "y-axis-label"
      id = "y-axis-label-${id}"
      style = "font-size: ${yAxisLabelFontSize}">
      ${yAxisLabel}
    </div>`;

  const yAxis = yAxisTitle + yAxisLabel;

  return yAxis;
};

const formatByOption = (isScientificNotation) => {
  if (isScientificNotation) {
    const format = (num) => {
      const numInScientificNotation = num.toExponential(2);
      const [wholeNum, power] = numInScientificNotation.split("e");
      const formatedNum = `${wholeNum}x10
          <sup>
            <span class = "sup">
              ${power.replace("+", "")}
            </span>
          </sup>`;
      return formatedNum;
    };
    return format;
  }
  return (i) => i;
};

const makeStackedBars = (data, options) => {
  const {
    id,
    maxTick,
    minTick,
    dataLabelColour,
    barColour,
    dataLabelPosition,
    scientificNotation,
    dataLabelFontSize,
    stackLabelFontSize,
    stackLabelColour,
    barSpacing: horizontalMargin,
    animationEffect: animationEffectClass,
  } = options;
  const difference = maxTick - minTick;
  let posBars = "";
  let negBars = "";
  const dataNum = data.length;
  const widthOfBar = 100 / dataNum + "%";

  const format = formatByOption(scientificNotation);

  const makeBarDiv = (bar, height, value) => {
    const postion = multiplyCSSValue(stackLabelFontSize, -1.1);
    const dataLabelAndBar = !value
      ? bar
      : `<span class="stacked-label" 
          style="top: ${postion};
            font-size: ${stackLabelFontSize};
            color: ${stackLabelColour};">${value}</span>${bar}`;

    const barDiv = `<div
        class = "stacked-bar ${animationEffectClass}"
          style="
            color: ${dataLabelColour};
            height: ${height};
            width: ${widthOfBar};
            margin: 0 ${horizontalMargin};">
            ${dataLabelAndBar}
      </div>`;
    return barDiv;
  };

  const makeAStack = (value, indexInBarColour, height) => {
    const formatVal = format(value);
    const stackColour = barColour[indexInBarColour];
    const stack = `<div
        class="bar"
        style="
          align-items: ${dataLabelPosition};
          height: ${height};
          background-color: ${stackColour}; ">
            <span>
              ${formatVal}
            </span>
      </div>`;
    return stack;
  };

  const blankBar = `<div class = "bar"
      style = "width: ${widthOfBar}">
    </div>`;

  const stackNum = data[0].length;

  for (let i = 0; i < dataNum; i++) {
    let posBar = "";
    let negBar = "";

    const values = data[i];
    const maxVal = values.reduce((sum, val) => (val > 0 ? sum + val : sum), 0);
    const minVal = values.reduce((sum, val) => (val < 0 ? sum + val : sum), 0);

    for (let j = 0; j < stackNum; j++) {
      const val = values[j];
      const valIsPositive = val > 0;

      if (valIsPositive) {
        const height = (val * 100) / maxVal + "%";
        const stack = makeAStack(val, j, height);
        posBar += stack;
      }

      if (!valIsPositive) {
        const height = (val * 100) / minVal + "%";
        const stack = makeAStack(val, j, height);
        negBar += stack;
      }
    }

    if (!negBar) negBar = blankBar;
    if (!posBar) posBar = blankBar;

    const posBarHeight = (100 * maxVal) / maxTick + "%";
    posBar = makeBarDiv(posBar, posBarHeight, maxVal + minVal);
    posBars += posBar;

    const negBarHeight = (100 * minVal) / minTick + "%";
    negBar = makeBarDiv(negBar, negBarHeight);
    negBars += negBar;
  }

  const bars = `<div
      class = "chart-content"
      id = "bars-${id}"
      style = "
        font-size: ${dataLabelFontSize};
        background-image: repeating-linear-gradient(
          to top,
          grey 0px,
          grey 1px,
          transparent 1px,
          transparent ${100 / (difference / options.tickInterval)}%">
      <div
        class = "bars pos-bars"
        style = "height: ${(100 * maxTick) / difference}%">
        ${posBars}
      </div>
      <div
        class = "bars"
        style="height: ${(-100 * minTick) / difference}%">
        ${negBars}
      </div>
    </div>`;

  return bars;
};

const makeNonStackedBars = (data, options) => {
  let posBars = "";
  let negBars = "";
  const {
    id,
    maxTick,
    minTick,
    scientificNotation,
    dataLabelPosition,
    barColour,
    tickInterval,
    dataLabelFontSize: labelFontSize,
    dataLabelColour: labelColour,
    animationEffect: animationEffectClass,
    barSpacing: horizontalMargin,
  } = options;
  const difference = maxTick - minTick;

  const dataNum = data.length;
  const format = formatByOption(scientificNotation);

  const widthOfBar = 100 / dataNum + "%";

  const heightOfBarForPositiveValue = (val) => (100 * val) / maxTick + "%";
  const heightOfBarForNegativeValue = (val) => (100 * val) / minTick + "%";

  const blankBar = `<div class="bar"
      style="
        width: ${widthOfBar};
        margin: 0 ${horizontalMargin}">
    </div>`;

  const makeBarDiv = (val) => {
    const height =
      val > 0
        ? heightOfBarForPositiveValue(val)
        : heightOfBarForNegativeValue(val);
    const formatedVal = format(val);
    const div = `<div class="bar ${animationEffectClass}"
        style="
          align-items: ${dataLabelPosition};
          background-color: ${barColour};
          height: ${height};
          width: ${widthOfBar};
          margin: 0 ${horizontalMargin}">
        <span>
          ${formatedVal}
        </span>
      </div>`;
    return div;
  };

  for (const val of data) {
    const valIsPostive = val > 0;

    if (valIsPostive) {
      const barDiv = makeBarDiv(val);
      posBars += barDiv;
      negBars += blankBar;
    }

    if (!valIsPostive) {
      const barDiv = makeBarDiv(val);
      negBars += barDiv;
      posBars += blankBar;
    }
  }

  const heightOfPosBars = (100 * maxTick) / difference + "%";
  const heightofNegBars = (-100 * minTick) / difference + "%";
  const SpaceBetweenTicks = 100 / (difference / tickInterval) + "%";

  const barDiv = `<div
      class="chart-content"
      id = "bars-${id}"
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
    </div>`;
  return barDiv;
};

const makeBars = (data, options) => {
  const { stacked: barIsStacked } = options;
  if (barIsStacked) return makeStackedBars(data, options);
  return makeNonStackedBars(data, options);
};

const makeXAxis = (labelArr, options) => {
  let xAxis = "";
  const dataNum = labelArr.length;

  const {
    id,
    barSpacin: horizontalMargin,
    xAxisLabelFontSize: labelFontSize,
    xAxisTitleFontSize: titleFontSize,
    xAxisTitle: title,
  } = options;
  const width = 100 / dataNum + "%";
  const makeLabelDiv = (val) => {
    return `<div
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

  xAxis = `<div class = "x-axis"
      style = "font-size: ${labelFontSize}">
        <div id = "left-corner-${id}"></div>
          ${xAxis}
          <div id = "right-corner-${id}"></div>
        </div>
    <div
      class = "x-axis-title"
      style = "font-size: ${titleFontSize}">
        ${title}
    </div>`;

  return xAxis;
};

const makeLegend = (barColour, label, id, legendFontSize, legendColour) => {
  let labelDiv = "";
  if (!label) return labelDiv;
  for (let i = 0; i < barColour.length; i++) {
    const elm = `
      <div>
        <div style="background-color: ${barColour[i]}"></div>
        <span>${label[i]}</span>
      </div>
    `;
    labelDiv += elm;
  }
  return `
    <div class="legend" 
      id="legend-${id}" 
      style="font-size: ${legendFontSize};
        color: ${legendColour}">
      ${labelDiv}
    </div>`;
};

const makeContent = (options, stackLabels, yAxis, bars) => {
  const {
    stackedFontSize,
    stacked,
    barColour,
    showLegend,
    id,
    legendFontSize,
    legendColour,
  } = options;

  const legend =
    stacked && showLegend
      ? makeLegend(barColour, stackLabels, id, legendFontSize, legendColour)
      : ``;

  //html of the whole chart
  const content = `
      <div class="middle"
        style="${stackedFontSize ? `padding-top: ${stackedFontSize}` : ""}">
        ${yAxis}
        ${bars}
        ${legend}
      </div>`;
  return content;
};

const checkIfAllValuesAreNum = (arr) => {
  for (const val of arr) {
    const valIsNum = isNumber(val);
    if (!valIsNum) throw valIsNotNumberErrorMsg;
  }
  return true;
};

//check if the data all the compulsory options are valid
const dataValidationCheck = (data, options) => {
  const { values, labels } = data;
  if (!values) return { error: noValueErrorMsg };

  const noData = values.length === 0;
  if (noData) return { error: noDataErrorMsg };

  const dataIsArray = Array.isArray(values);
  if (!dataIsArray) return { error: dataIsNotArrayErrorMsg };

  const labelIsArray = Array.isArray(labels);
  const dataAndLabelHaveSameLength = values.length === data.labels.length;

  if (!labelIsArray) throw labelIsNotArrayErrorMsg;
  if (!dataAndLabelHaveSameLength) throw dataNumAreNotMatchErrorMsg;

  const firstValue = values[0];
  const barChartIsStacked = Array.isArray(firstValue);
  options.stacked = barChartIsStacked;
  if (!barChartIsStacked) {
    const allValAreNumber = checkIfAllValuesAreNum(values);
    if (!allValAreNumber) return false;
  }
  if (barChartIsStacked) {
    const numOfStacked = firstValue.length;
    for (const dataForAStackedBar of values) {
      const dataIsArray = Array.isArray(dataForAStackedBar);
      if (!dataIsArray) throw stackedDataIsNotArrayErrorMsg;

      const stackedNumIsValid = dataForAStackedBar.length === numOfStacked;
      if (!stackedNumIsValid) throw stackedValueSetNumErrorMsg;

      const allValAreNumber = checkIfAllValuesAreNum(dataForAStackedBar);
      if (!allValAreNumber) return false;
    }

    const stackLabelNumIsValid =
      !data.stackLabels || data.stackLabels.length === numOfStacked;
    if (options.showLegend && !stackLabelNumIsValid)
      throw stackLabelNumErrorMsg;
  }

  const idIsDefined = "id" in options;
  if (!idIsDefined) throw noIdErrorMsg;

  return { valid: true };
};

const completeOptions = (options, data) => {
  const checkIfOptionIsValid = (prop, defaultVal, callback) => {
    const val = options[prop];
    const valIsValid = callback(val);
    if (valIsValid) return (options[prop] = val);
    return (options[prop] = defaultVal);
  };

  const {
    stacked,
    dataLabelPosition,
    barSpacing,
    userSelect,
    tickInterval: tickIntervalInOptions,
    barColour: barColourInOption,
  } = options;
  const dataNum = data.length;

  if (stacked) {
    let barColour = [];
    const barColourInOptionsIsArray = Array.isArray(barColourInOption);
    const numOfColour = DEFAULT_CSS_COLOR.length;
    if (barColourInOptionsIsArray) {
      const numOfColourInOptions = barColourInOption.length;
      let j = 0;
      for (let i = 0; i < dataNum; i++) {
        const indexOfColor = i % numOfColourInOptions;
        const colour = barColourInOption[indexOfColor];
        const colourIsValid = CSS.supports("background-color", colour);
        if (colourIsValid) barColour.push(colour);
        if (!colourIsValid) {
          if (j >= numOfColour) j = 0;
          barColour.push(DEFAULT_CSS_COLOR[j]);
          j++;
        }
      }
    }
    if (!barColourInOptionsIsArray) {
      const stackNum = data[0].length;
      const stackArrNum = Math.ceil(stackNum / numOfColour);
      for (let i = 0; i < stackArrNum; i++) {
        barColour = barColour.concat(DEFAULT_CSS_COLOR);
      }
      barColour = barColour.slice(0, stackNum);
    }
    options.barColour = barColour;

    checkIfOptionIsValid("stackLabelFontSize", "1.1em", (x) =>
      CSS.supports("font-size", x)
    );
    checkIfOptionIsValid("stackLabelColour", "black", (x) =>
      CSS.supports("color", x)
    );
    checkIfOptionIsValid("legendFontSize", "1.2em", (x) =>
      CSS.supports("font-size", x)
    );
    checkIfOptionIsValid("legendColour", "black", (x) =>
      CSS.supports("color", x)
    );
  }

  if (!stacked) {
    checkIfOptionIsValid("barColour", DEFAULT_CSS_COLOR[0], (x) =>
      CSS.supports("color", x)
    );
  }

  checkIfOptionIsValid("chartTitle", "", (x) => x !== undefined);
  checkIfOptionIsValid("titleFontSize", "2em", (x) =>
    CSS.supports("font-size", x)
  );
  checkIfOptionIsValid("titleColour", "black", (x) => CSS.supports("color", x));
  checkIfOptionIsValid("width", "100%", (x) => CSS.supports("width", x));
  checkIfOptionIsValid("height", "100%", (x) => CSS.supports("height", x));
  checkIfOptionIsValid("yAxisTitle", "", (x) => x !== undefined);
  checkIfOptionIsValid("yAxisTitleFontSize", "1.5em", (x) =>
    CSS.supports("font-size", x)
  );
  checkIfOptionIsValid("yAxisLabelFontSize", "1.2em", (x) =>
    CSS.supports("font-size", x)
  );
  checkIfOptionIsValid("xAxisTitle", "", (x) => x !== undefined);
  checkIfOptionIsValid("xAxisTitleFontSize", "1.5em", (x) =>
    CSS.supports("font-size", x)
  );
  checkIfOptionIsValid("xAxisLabelFontSize", "1.2em", (x) =>
    CSS.supports("font-size", x)
  );

  switch (dataLabelPosition) {
    case "top":
      options.dataLabelPosition = "flex-start";
      break;
    case "centre":
      options.dataLabelPosition = "center";
      break;
    case "bottom":
      options.dataLabelPosition = "flex-end";
      break;
    default:
      options.dataLabelPosition = "flex-start";
  }

  checkIfOptionIsValid("dataLabelColour", "white", (x) =>
    CSS.supports("color", x)
  );
  checkIfOptionIsValid("dataLabelFontSize", "1em", (x) =>
    CSS.supports("font-size", x)
  );

  const defineBarSpacing = () => {
    const barSpacingIsValid = CSS.supports("margin", barSpacing);
    if (barSpacingIsValid) {
      const margin = multiplyCSSValue(barSpacing, 0.5);
      return (options.barSpacing = margin);
    }
    const defaultMargin = "0.5em";
    return (options.barSpacing = defaultMargin);
  };

  defineBarSpacing();

  checkIfOptionIsValid("userSelect", false, (x) => typeof x === "boolean");
  checkIfOptionIsValid("showLegend", true, (x) => typeof x === "boolean");

  if (userSelect) {
    options.userSelect = "auto";
  } else {
    options.userSelect = "none";
  }

  checkIfOptionIsValid(
    "scientificNotation",
    false,
    (x) => typeof x === "boolean"
  );
  checkIfOptionIsValid("animationEffect", true, (x) => typeof x === "boolean");

  const makeClassForEffect = (property, styleClass) => {
    const effectIsOff = options[property] === false;
    if (effectIsOff) return (options[property] = "");
    return (options[property] = styleClass);
  };

  makeClassForEffect("animationEffect", "bar-animation");

  const getMaxValue = (arr) =>
    arr.reduce((max, values) => {
      const sum = values.reduce((sum, val) => (val > 0 ? sum + val : sum), 0);
      if (sum > max) return sum;
      return max;
    }, 0);

  const getMinValue = (arr) =>
    arr.reduce((min, values) => {
      const sum = values.reduce((sum, val) => (val < 0 ? sum + val : sum), 0);
      if (sum < min) return sum;
      return min;
    }, 0);

  const maxValue = stacked ? getMaxValue(data) : Math.max(...data.flat());
  const minValue = stacked ? getMinValue(data) : Math.min(...data.flat());

  //find the tick interval and value of the maximum tick
  const { tickInterval, maxTick, minTick } = findTicks(
    tickIntervalInOptions,
    maxValue,
    minValue
  );
  options.tickInterval = tickInterval;
  options.maxTick = maxTick;
  options.minTick = minTick;
};

const setElmSizeFunctionGenerator = (id, yAxisLabelFontSize) => {
  const $leftCorner = $(`#left-corner-${id}`);
  const $rightCorner = $(`#right-corner-${id}`);
  const $yAxisLabel = $(`#y-axis-label-${id}`);
  const $legend = $(`#legend-${id}`);
  const $yAxisTitle = $(`#y-axis-title-${id}`);
  const $bars = $(`#bars-${id}`);

  const getLeftCornerWidth = () =>
    `${$yAxisLabel.outerWidth(true) + $yAxisTitle.outerWidth(true)}px`;

  const getRightCornerWidth = () => `${$legend.outerWidth(true)}px`;

  const getYAxisLabelHeight = () =>
    `calc(${$bars.outerHeight(true)}px + ${yAxisLabelFontSize})`;

  return () => {
    $leftCorner.css("min-width", getLeftCornerWidth());
    $rightCorner.css("min-width", getRightCornerWidth());
    $yAxisLabel.css("min-height", getYAxisLabelHeight());
  };
};

// top-level function
const drawBarChart = ($element, data, options) => {
  const { valid, error } = dataValidationCheck(data, options);

  if (valid) {
    //check if each option is valid and fill in default value to the options that are not filled in / values are not valid
    completeOptions(options, data.values);

    //make title Div
    const chartTitleDiv = makeTitleDiv(options);

    //make y-axis
    const yAxis = makeYAxis(options);

    //plot the bar graph with value in parameter "data"
    const bars = makeBars(data.values, options);

    //label the x axis
    const xAxis = makeXAxis(data.labels, options);

    const content = makeContent(options, data.stackLabels, yAxis, bars);

    //html of the whole chard
    const chart = `
      <div class="bar-chart">
        ${chartTitleDiv}
        ${content}
        ${xAxis}
      </div>`;

    $(document).ready(function () {
      $element.html(chart);
      $element.css("width", options.width);
      $element.css("height", options.height);
      $element.css("user-select", options.userSelect);

      $(document).ready(() => {
        const setElmSize = setElmSizeFunctionGenerator(
          options.id,
          options.yAxisLabelFontSize
        );

        // set the size of elements initially
        setElmSize();

        // set the size of elements when the window is resized
        $(window).resize(setElmSize);
      });
    });
  }

  if (!valid) {
    const chartInfo = 
      options.id && options.chartTitle 
      ? `<div>(Chart id: ${options.id}, Chart title: ${options.chartTitle})</div>`
      : options.id
      ? `<div>(Chart id: ${options.id})</div>`
      : options.chartTitle 
      ? `<div>(Chart id: ${options.id}, Chart title: ${options.chartTitle})</div>`
      : ""

    const errorElm = `
      <div class="bar-chart bar-chart-error">
        <div>${error}</div>
        <div>${chartInfo}</div>
      </div>`;
    $(document).ready(function () {
      $element.html(errorElm);
      $element.css("width", options.width);
      $element.css("height", options.height);
      $element.css("user-select", options.userSelect);
    });
  }
};
