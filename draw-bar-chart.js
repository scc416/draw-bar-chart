// to-do list
// refractor
// add comments
// make notes
// edit readme.md

const CSS_COLOR_NAMES = [
  "AliceBlue",
  "AntiqueWhite",
  "Aqua",
  "Aquamarine",
  "Azure",
  "Beige",
  "Bisque",
  "Black",
  "BlanchedAlmond",
  "Blue",
  "BlueViolet",
  "Brown",
  "BurlyWood",
  "CadetBlue",
  "Chartreuse",
  "Chocolate",
  "Coral",
  "CornflowerBlue",
  "Cornsilk",
  "Crimson",
  "Cyan",
  "DarkBlue",
  "DarkCyan",
  "DarkGoldenRod",
  "DarkGray",
  "DarkGrey",
  "DarkGreen",
  "DarkKhaki",
  "DarkMagenta",
  "DarkOliveGreen",
  "DarkOrange",
  "DarkOrchid",
  "DarkRed",
  "DarkSalmon",
  "DarkSeaGreen",
  "DarkSlateBlue",
  "DarkSlateGray",
  "DarkSlateGrey",
  "DarkTurquoise",
  "DarkViolet",
  "DeepPink",
  "DeepSkyBlue",
  "DimGray",
  "DimGrey",
  "DodgerBlue",
  "FireBrick",
  "FloralWhite",
  "ForestGreen",
  "Fuchsia",
  "Gainsboro",
  "GhostWhite",
  "Gold",
  "GoldenRod",
  "Gray",
  "Grey",
  "Green",
  "GreenYellow",
  "HoneyDew",
  "HotPink",
  "IndianRed",
  "Indigo",
  "Ivory",
  "Khaki",
  "Lavender",
  "LavenderBlush",
  "LawnGreen",
  "LemonChiffon",
  "LightBlue",
  "LightCoral",
  "LightCyan",
  "LightGoldenRodYellow",
  "LightGray",
  "LightGrey",
  "LightGreen",
  "LightPink",
  "LightSalmon",
  "LightSeaGreen",
  "LightSkyBlue",
  "LightSlateGray",
  "LightSlateGrey",
  "LightSteelBlue",
  "LightYellow",
  "Lime",
  "LimeGreen",
  "Linen",
  "Magenta",
  "Maroon",
  "MediumAquaMarine",
  "MediumBlue",
  "MediumOrchid",
  "MediumPurple",
  "MediumSeaGreen",
  "MediumSlateBlue",
  "MediumSpringGreen",
  "MediumTurquoise",
  "MediumVioletRed",
  "MidnightBlue",
  "MintCream",
  "MistyRose",
  "Moccasin",
  "NavajoWhite",
  "Navy",
  "OldLace",
  "Olive",
  "OliveDrab",
  "Orange",
  "OrangeRed",
  "Orchid",
  "PaleGoldenRod",
  "PaleGreen",
  "PaleTurquoise",
  "PaleVioletRed",
  "PapayaWhip",
  "PeachPuff",
  "Peru",
  "Pink",
  "Plum",
  "PowderBlue",
  "Purple",
  "RebeccaPurple",
  "Red",
  "RosyBrown",
  "RoyalBlue",
  "SaddleBrown",
  "Salmon",
  "SandyBrown",
  "SeaGreen",
  "SeaShell",
  "Sienna",
  "Silver",
  "SkyBlue",
  "SlateBlue",
  "SlateGray",
  "SlateGrey",
  "Snow",
  "SpringGreen",
  "SteelBlue",
  "Tan",
  "Teal",
  "Thistle",
  "Tomato",
  "Turquoise",
  "Violet",
  "Wheat",
  "White",
  "WhiteSmoke",
  "Yellow",
  "YellowGreen",
];

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

//function that use the options to create div for the chart title
const makeTitleDiv = (options) => {
  const { titleColour, titleFontSize, chartTitle } = options;

  return `<div
      class = "chart-title"
      style = "colour: ${titleColour};
        font-size: ${titleFontSize}">
      ${chartTitle}
    </div>`;
};

// the function that find the value of tick interval, max. and min. tick
const findTicks = (options, maxVal, minVal) => {
  const difference = maxVal - minVal;

  const defaultInterval = () => {
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

  const tickIntervalInOptions = options.tickInterval;
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
      class = "y-axis-title"
      style = "font-size: ${yAxisTitleFontSize}">
      ${yAxisTitleText}${yAxisTitle}
    `;

  const numOfDecimals = countDecimals(tickInterval);

  const formatTickValue = (val) => val.toFixed(numOfDecimals);
  const formatTickDiv = (formatedVal) =>
    `<div style = "height: 0">${formatedVal}</div>`;

  for (let i = minTick; i <= maxTick; i += tickInterval) {
    const val = formatTickValue(i);
    const tickDiv = formatTickDiv(val);
    yAxisLabel += tickDiv;
  }

  yAxisLabel = `<div
      class = "y-axis-label"
      style = "font-size: ${yAxisLabelFontSize}">
      ${yAxisLabel}
    </div>`;

  const yAxis = `<div
      class = "y-axis"
      id = "y-axis-${id}">
      ${yAxisTitle + yAxisLabel}
    </div>`;

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
    maxTick,
    minTick,
    dataLabelColour,
    barColour,
    dataLabelPosition,
    scientificNotation,
    barSpacing: horizontalMargin,
    hoverEffect: hoverEffectClass,
    animationEffect: animationEffectClass,
  } = options;
  const difference = maxTick - minTick;
  let posBars = "";
  let negBars = "";
  const dataNum = data.length;
  const positiveData = data.map((arr) => arr.filter((x) => x >= 0));
  const negativeData = data.map((arr) => arr.filter((x) => x < 0));
  const widthOfBar = 100 / dataNum + "%";

  const format = formatByOption(scientificNotation);

  const makeBarDiv = (bar, height) => {
    const barDiv = `<div
        class = "stacked-bar ${animationEffectClass}"
          style="
            color: ${dataLabelColour};
            height: ${height};
            width: ${widthOfBar};
            margin: 0 ${horizontalMargin};">
        ${bar}
      </div>`;
    return barDiv;
  };

  const makeAStack = (value, indexInBarColour, height) => {
    const formatVal = format(value);
    const stackColour = barColour[indexInBarColour];
    const stack = `<div
        class="bar ${hoverEffectClass}"
        style="
          align-items: ${dataLabelPosition};
          height: ${height};
          background-color: ${stackColour}; ">
            <span class="data">
              ${formatVal}
            </span>
      </div>`;
    return stack;
  };

  const blankBar = `<div class = "bar"
      style = "width: ${widthOfBar}">
    </div>`;

  for (let i = 0; i < dataNum; i++) {
    let posBar = "";
    let negBar = "";
    const positiveValues = positiveData[i];
    const numOfPositiveValue = positiveValues.length;
    const negativeValues = negativeData[i];
    const numOfNegativeValue = negativeValues.length;

    const maxVal =
      numOfPositiveValue > 0 ? positiveValues[numOfPositiveValue - 1] : 0;
    const minVal = numOfNegativeValue > 0 ? negativeValues[0] : 0;

    const thereArePositiveVal = numOfPositiveValue > 0;
    const thereAreNegativeVal = numOfNegativeValue > 0;

    if (thereArePositiveVal) {
      for (let i = numOfPositiveValue - 1; i >= 0; i--) {
        const height =
          i === 0
            ? positiveValues[0]
            : positiveValues[i] - positiveValues[i - 1];
        const heightInPercentage = (height * 100) / maxVal + "%";
        const val = positiveValues[i];
        const barColourIndex = i + numOfNegativeValue;
        const stack = makeAStack(val, barColourIndex, heightInPercentage);
        posBar += stack;
      }
    }
    if (!thereArePositiveVal) posBar = blankBar;

    if (thereAreNegativeVal) {
      for (let i = numOfNegativeValue - 1; i >= 0; i--) {
        const height =
          i === numOfNegativeValue - 1
            ? negativeValues[numOfNegativeValue - 1]
            : negativeValues[i] - negativeValues[i + 1];
        const heightInPercentage = (height * 100) / minVal + "%";
        const val = negativeValues[i];
        const stack = makeAStack(val, i, heightInPercentage);
        negBar += stack;
      }
    }
    if (!thereAreNegativeVal) negBar = blankBar;

    const negBarHeight = (100 * minVal) / minTick + "%";
    negBar = makeBarDiv(negBar, negBarHeight);
    negBars += negBar;

    const posBarHeight = (100 * maxVal) / maxTick + "%";
    posBar = makeBarDiv(posBar, posBarHeight);
    posBars += posBar;
  }

  const bars = `<div
      class = "chart-content"
      style = "
        font-size: ${options.dataLabelFontSize};
        background-image: repeating-linear-gradient(
          to top,
          grey 0px,
          grey 1px,
          transparent 1px,
          transparent ${100 / (difference / options.tickInterval)}%">
      <div
        class = "bars pos-bars"
        style = " height: ${(100 * maxTick) / difference}%">
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
    maxTick,
    minTick,
    scientificNotation,
    dataLabelPosition,
    barColour,
    tickInterval,
    dataLabelFontSize: labelFontSize,
    dataLabelColour: labelColour,
    hoverEffect: hoverEffectClass,
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

  const makeBarDiv = (val, isPositive) => {
    const height = isPositive
      ? heightOfBarForPositiveValue(val)
      : heightOfBarForNegativeValue(val);
    const formatedVal = format(val);
    const div = `<div class="bar ${hoverEffectClass} ${animationEffectClass}"
        style="
          align-items: ${dataLabelPosition};
          background-color: ${barColour};
          height: ${height};
          width: ${widthOfBar};
          margin: 0 ${horizontalMargin}">
        <span class="data">
          ${formatedVal}
        </span>
      </div>`;
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

  const heightOfPosBars = (100 * maxTick) / difference + "%";
  const heightofNegBars = (-100 * minTick) / difference + "%";
  const SpaceBetweenTicks = 100 / (difference / tickInterval) + "%";

  const barDiv = `<div
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
    hoverEffect: className,
    xAxisLabelFontSize: labelFontSize,
    xAxisTitleFontSize: titleFontSize,
    xAxisTitle: title,
  } = options;
  const width = 100 / dataNum + "%";
  const makeLabelDiv = (val) => {
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

  xAxis = `<div class = "x-axis"
      style = "font-size: ${labelFontSize}">
        <div id = "left-corner-${id}"></div>
          ${xAxis}
        </div>
    <div
      class = "x-axis-title"
      style = "font-size: ${titleFontSize}">
        ${title}
    </div>`;

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

//check if the data all the compulsory options are valid
const dataValidationCheck = (data, options) => {
  const dataIsArray = Array.isArray(data.num);
  const labelIsArray = Array.isArray(data.labels);
  const dataAndLabelHaveSameLength = data.num.length === data.labels.length;
  const noData = data.num.length === 0;
  if (noData) {
    const alert = "There is no data.";
    throw alert;
  }

  if (!dataIsArray) {
    const alert = "Data set is not an array.";
    throw alert;
  }
  if (!labelIsArray) {
    const alert = "Label set is not an array.";
    throw alert;
  }
  if (!dataAndLabelHaveSameLength) {
    const alert = "Number of data doesn't match with number of label";
    throw alert;
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
    const alert =
      "A bar chart doesn't have an Id, it may causes problem(s) in layout of the bar chart.";
    console.log(makeAlertMessage(alert));
  }

  return true;
};

const completeOptions = (options, data) => {
  const checkIfOptionIsValid = (prop, defaultVal, callback) => {
    const val = options[prop];
    const valIsValid = callback(val);
    if (valIsValid) return (options[prop] = val);
    return (options[prop] = defaultVal);
  };

  const dataNum = data.length;

  if (options.stacked) {
    const barColour = [];
    const barColourInOption = options.barColour;
    const barColourInOptionsIsArray = Array.isArray(barColourInOption);
    if (barColourInOptionsIsArray) {
      const numOfColourInOptions = barColourInOption.length;
      for (let i = 0; i < dataNum; i++) {
        const indexOfColor = i % numOfColourInOptions;
        const colour = barColourInOption[indexOfColor];
        const colourIsValid = CSS.supports("background-color", colour);
        if (colourIsValid) barColour.push(colour);
        if (!colourIsValid) barColour.push("black");
      }
    }
    if (!barColourInOptionsIsArray) {
      const barColourIsValid = CSS.supports(
        "background-colour",
        barColourInOption
      );
      const everyBarColour = barColourIsValid ? barColourInOption : "black";
      for (let i = 0; i < dataNum; i++) barColour.push(everyBarColour);
    }
    options.barColour = barColour;
  }

  if (!options.stacked) {
    checkIfOptionIsValid("barColour", "black", (x) => CSS.supports("color", x));
  }

  checkIfOptionIsValid("chartTitle", "Untitled", (x) => x !== undefined);
  checkIfOptionIsValid("titleFontSize", "36px", (x) =>
    CSS.supports("font-size", x)
  );
  checkIfOptionIsValid("titleColour", "black", (x) => CSS.supports("color", x));
  checkIfOptionIsValid("width", "90vw", (x) => CSS.supports("width", x));
  checkIfOptionIsValid("height", "90vh", (x) => CSS.supports("height", x));
  checkIfOptionIsValid("yAxisTitle", "", (x) => x !== undefined);
  checkIfOptionIsValid("yAxisTitleFontSize", "24px", (x) =>
    CSS.supports("font-size", x)
  );
  checkIfOptionIsValid("yAxisLabelFontSize", "16px", (x) =>
    CSS.supports("font-size", x)
  );
  checkIfOptionIsValid("xAxisTitle", "", (x) => x !== undefined);
  checkIfOptionIsValid("xAxisTitleFontSize", "24px", (x) =>
    CSS.supports("font-size", x)
  );
  checkIfOptionIsValid("xAxisLabelFontSize", "16px", (x) =>
    CSS.supports("font-size", x)
  );

  switch (options.dataLabelPosition) {
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
  checkIfOptionIsValid("dataLabelFontSize", "16px", (x) =>
    CSS.supports("font-size", x)
  );

  const defineBarSpacing = (dataNum) => {
    const barSpacingIsValid = CSS.supports("margin", options.barSpacing);
    if (barSpacingIsValid) {
      const num = parseFloat(options.barSpacing.replace(/\D*/g, ""));
      const unit = options.barSpacing.replace(/\d*/g, "");
      const margin = num / 2 + unit;
      return (options.barSpacing = margin);
    }
    const defaultMargin = 10 / dataNum + "%";
    return (options.barSpacing = defaultMargin);
  };

  defineBarSpacing(dataNum);

  checkIfOptionIsValid("userSelect", "false", (x) => typeof x === "boolean");

  if (options.userSelect === true) {
    options.userSelect = "auto";
  } else {
    options.userSelect = "none";
  }

  checkIfOptionIsValid(
    "scientificNotation",
    "false",
    (x) => typeof x === "boolean"
  );
  checkIfOptionIsValid(
    "animationEffect",
    "true",
    (x) => typeof x === "boolean"
  );
  checkIfOptionIsValid("hoverEffect", "true", (x) => typeof x === "boolean");

  const makeClassForEffect = (property, styleClass) => {
    const effectIsOff = options[property] === false;
    if (effectIsOff) return (options[property] = "");
    return (options[property] = styleClass);
  };

  makeClassForEffect("hoverEffect", "info");
  makeClassForEffect("animationEffect", "bar-animation");

  const maxValue = Math.max(...data.flat());
  const minValue = Math.min(...data.flat());
  //find the tick interval and value of the maximum tick
  const { tickInterval, maxTick, minTick } = findTicks(
    options,
    maxValue,
    minValue
  );
  options.tickInterval = tickInterval;
  options.maxTick = maxTick;
  options.minTick = minTick;
};

// top-level function
const drawBarChart = (data, options, element) => {
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

    $(document).ready(function () {
      element.html(chart);
      element.css("width", options.width);
      element.css("height", options.height);
      element.css("user-select", options.userSelect);
      $(document).ready(function () {
        $(`#left-corner-${options.Id}`).css(
          "min-width",
          `${$(`#y-axis-${options.Id}`).outerWidth(true)}px`
        );
      });
    });
  }
};
