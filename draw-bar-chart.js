function drawBarChart(data, options, element) {
  let chartContent = "";
  let xAxis = "";
  for(let val of data[0]) {
    chartContent += (`<div style="text-align: center">${val}<div style="background-color: black; width: 20px; height: ${val}px; margin: 0px 20px"></div></div>`);
  };
  for(let val of data[1]) {
    xAxis += (`<div style="text-align: center; overflow-wrap: break-word; width: 60px">${val}</div>`);
  };
  let chart = `<div id="chart"><div id="title">TITLE</div><div id="middle"><div id="y-axis">y-axis</div><div id="right"><div id="chartContent">${chartContent}</div><div id="x-axis">${xAxis}</div></div></div></div>`;
  element.html(chart);
  element.css("border", "1px black solid");
  element.css("display", "inline-block");
  element.css("padding", "10px");
  $( "#middle" ).css( "display", "flex");
  $( "#title" ).css( "text-align", "center" );
  $( "#chartContent" ).css("border-left", "1px black solid");
  $( "#chartContent" ).css("border-bottom", "1px black solid");
  $( "#chartContent" ).css("display", "flex");
  $( "#chartContent" ).css("align-items", "flex-end");
  $( "#x-axis" ).css("display", "flex");
};
