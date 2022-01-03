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
      chartTitle: "Mortality rate in 2019",
      yAxisTitle: "Mortality rate, under-5 (per 1,000 live births)",
      xAxisTitle: "Country",
    }
  );

  drawBarChart(
    $("#demo-2-values-below-1"),
    {
      values: [0.409, 0.15, 0.857, 0.0583, 0.183],
      labels: ["Albania", "Barbados", "Chile", "Hong Kong", "Singapore"],
      // stackLabels: [1, 2, 3],
    },
    {
      id: 2,
      chartTitle: "Deposit interest rate in 2020",
      yAxisTitle: "Deposit interest rate (%)",
      xAxisTitle: "Country",
    }
  );
});
