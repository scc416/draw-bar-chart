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

function drawBarChart(data, options, element) {
  let bar = "";

  //for the label on x-axis
  let xAxis = "";

  //for the label on y-axis
  let yTick = "";
  let yLabel = "";

  //put the title in a div
  let title = `<div class="chart-title">${options.chartTitle}</div>`;

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
    xAxis += (`<div style="text-align: center; overflow-wrap: anywhere; width: ${80/dataNum}%; margin: 0 ${10/dataNum}%">${val}</div>`);
  };

  xAxis = `<div class="left-container"><div class="x-axis"><div id="left-corner-${options.Id}"></div>${xAxis}</div></div>`;

  let chart = `${title}<div class="middle"><div class="y-label" id="y-label-${options.Id}" style="text-align: right">${yLabel}</div>${yTick}<div class="bar">${bar}</div></div>${xAxis}`;
  element.html(chart);
  element.css("border", "1px black solid");
  element.css("display", "flex");
  element.css("flex-direction", "column");
  element.css("height", options.height);
  element.css("width", options.width);
  element.css("padding", `min(${element.innerWidth() * 0.10}px, 15px)`);
  $( ".chart-title" ).css("padding", `min(${element.innerWidth() * 0.10}px, 15px)`);
  $( `#left-corner-${options.Id}` ).css("min-width", `${$( `#y-label-${options.Id}` ).innerWidth() + $( `#y-tick-${options.Id}` ).innerWidth() + 1}px`);
};
