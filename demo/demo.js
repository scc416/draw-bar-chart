$(() => {
  drawBarChart(
    $("#demo-1-single-bar-chart"),
    {
      values: [3.6, 3.4, 4.9, 3.8, 3.8, 2.5, 6.5, 4.3],
      labels: [
        "Australia",
        "Belgium",
        "Canada",
        "Germany",
        "Denmark",
        "Japan",
        "United States",
        "United Kingdom",
      ],
    },
    {
      id: 1,
      chartTitle:
        "Mortality rate, under-5 (per 1,000 live births) in 2019 by country",
      yAxisTitle: "Mortality rate, under-5 (per 1,000 live births)",
      xAxisTitle: "Country"
    }
  );

  drawBarChart(
    $("#demo-2-small-values"),
    {
      values: [
        [400, 200, 424],
        [-410, 100, -105],
        [-500, -200, 300],
        [-40, 150, 400],
      ],
      labels: [
        "very very very very very very very very very long value",
        "value1",
        "value2",
        "5",
      ],
      // stackLabels: [1, 2, 3],
    },
    { id: 2 }
  );
});
