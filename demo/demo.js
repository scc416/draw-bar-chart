$(() => {
  drawBarChart(
    $("#demo-1-single-bar-chart"),
    {
      values: [3.6, 4.9, 3.8, 2.5, 6.5],
      labels: [
        "Australia",
        "Canada",
        "Germany",
        "Japan",
        "United States",
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
    },
    {
      id: 2,
      chartTitle: "Deposit interest rate in 2020",
      yAxisTitle: "Deposit interest rate (%)",
      xAxisTitle: "Country",
    }
  );

  drawBarChart(
    $("#demo-3-neg-values"),
    {
      values: [-1.25, -6.21, -6.34, -11.2, -2.50],
      labels: ["Australia", "Belgium", "Canada", "Spain", "Poland"],
    },
    {
      id: 3,
      chartTitle: "GDP per capita growth in 2020",
      yAxisTitle: "GDP per capita growth (annual %)",
      xAxisTitle: "Country",
      tickInterval: 2
    }
  );

  drawBarChart(
    $("#demo-4-pos-neg-values"),
    {
      values: [-1.25, -6.21, 4.04, 1.98, -2.50],
      labels: ["Australia", "Belgium", "Guinea", "Vietnam", "Poland"],
    },
    {
      id: 4,
      chartTitle: "GDP per capita growth in 2020",
      yAxisTitle: "GDP per capita growth (annual %)",
      xAxisTitle: "Country",
      tickInterval: 2
    }
  );


  drawBarChart(
    $("#demo-5-stacked"),
    {
      values: [[-1.25], [-6.21], [4.04], [1.98], [-2.50]],
      labels: ["Australia", "Belgium", "Guinea", "Vietnam", "Poland"],
      stackLabels: ["hi"]
    },
    {
      id: 5,
      chartTitle: "GDP per capita growth in 2020",
      yAxisTitle: "GDP per capita growth (annual %)",
      xAxisTitle: "Country",
      tickInterval: 2
    }
  );
});
