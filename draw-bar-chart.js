function drawBarChart(data, options, element) {
  let chartContent = "";
  for(let val of data) {
    chartContent += (`<div style="text-align: center">${val}<div style="display:flex;background-color: black; width: 20px; height: ${val}px; margin: 0px 20px"></div></div>`);
  };
  let chart = `<div id="chart"><div id="title">TITLE</div><div id="middle"><div id="y-axis">y-axis</div><div id="right"><div id="chartContent">${chartContent}</div><div id="x-axis">x-axis</div></div></div></div>`;
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
};
