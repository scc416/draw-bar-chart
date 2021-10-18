function drawBarChart(data, options, element) {
  let chartContent = "";
  for(let val in data) {
    chartContent += (val + " ");
  };
  let chart = `<div id="chart"><div id="title">TITLE</div><div id="middle"><div id="y-axis">y-axis</div><div id="chartContent">${chartContent}<div id="x-axis">x-axis</div></div></div></div>`;
  element.html(chart);
  element.css("border", "1px black solid");
  $( "#middle" ).css( "display", "flex");
  $( "#title" ).css( "text-align", "center");

};
