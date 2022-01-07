$(() => {
  drawBarChart(
    $("#demo-1-single-bar-chart"),
    {
      values: [3.6, 4.9, 3.8, 2.5, 6.5],
      labels: ["Australia", "Canada", "Germany", "Japan", "United States"],
    },
    {
      id: 1,
      chartTitle: "Mortality rate in 2019",
      yAxisTitle: "Mortality rate, under-5 (per 1,000 live births)",
      xAxisTitle: "Country",
      width: "90vw",
      height: "90vh",
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
      width: "90vw",
      height: "90vh",
    }
  );

  drawBarChart(
    $("#demo-3-neg-values"),
    {
      values: [-1.25, -6.21, -6.34, -11.2, -2.5],
      labels: ["Australia", "Belgium", "Canada", "Spain", "Poland"],
    },
    {
      id: 3,
      chartTitle: "GDP per capita growth in 2020",
      yAxisTitle: "GDP per capita growth (annual %)",
      xAxisTitle: "Country",
      tickInterval: 2,
      width: "90vw",
      height: "90vh",
    }
  );

  drawBarChart(
    $("#demo-4-pos-neg-values"),
    {
      values: [-1.25, -6.21, 4.04, 1.98, -2.5],
      labels: ["Australia", "Belgium", "Guinea", "Vietnam", "Poland"],
    },
    {
      id: 4,
      chartTitle: "GDP per capita growth in 2020",
      yAxisTitle: "GDP per capita growth (annual %)",
      xAxisTitle: "Country",
      tickInterval: 2,
      width: "90vw",
      height: "90vh",
    }
  );

  drawBarChart(
    $("#demo-5-stacked"),
    {
      values: [
        [1, 2, 3],
        [-1, 2, 3],
        [3.5, 1, -4],
        [1, 0.5, -3],
        [-2.5, 3, -1],
      ],
      labels: ["A", "B", "C", "D", "E"],
      stackLabels: ["label1", "label2", "label3"],
    },
    {
      id: 5,
      chartTitle: "Random Data",
      yAxisTitle: "y-axis",
      xAxisTitle: "Country",
      tickInterval: 2,
      dataLabelPosition: "centre",
      width: "90vw",
      height: "90vh",
    }
  );

  drawBarChart(
    $("#demo-6-with-no-preset-tick-interval"),
    {
      values: [3.6, 4.9, 3.8, 2.5, 6.5],
      labels: ["Australia", "Canada", "Germany", "Japan", "United States"],
    },
    {
      id: 6,
      chartTitle: "Mortality rate in 2019",
      yAxisTitle: "Mortality rate, under-5 (per 1,000 live births)",
      xAxisTitle: "Country",
      width: "90vw",
      height: "90vh",
    }
  );

  drawBarChart(
    $("#demo-7-with-preset-interval"),
    {
      values: [3.6, 4.9, 3.8, 2.5, 6.5],
      labels: ["Australia", "Canada", "Germany", "Japan", "United States"],
    },
    {
      id: 7,
      chartTitle: "Mortality rate in 2019",
      yAxisTitle: "Mortality rate, under-5 (per 1,000 live births)",
      xAxisTitle: "Country",
      tickInterval: 0.5,
      width: "90vw",
      height: "90vh",
    }
  );

  drawBarChart(
    $("#demo-8-scientific-notation"),
    {
      values: [10903384, 2775187, 875633, 9086766, 10179380],
      labels: ["Angola", "Czech Republic", "Jordan", "Spain", "Zambia"],
    },
    {
      id: 8,
      chartTitle: "Rural population in 2020",
      yAxisTitle: "Rural population",
      xAxisTitle: "Country",
      scientificNotation: true,
      tickInterval: 1000000,
      width: "90vw",
      height: "90vh",
    }
  );

  drawBarChart(
    $("#demo-9-error"),
    {},
    {
      id: 9,
      chartTitle: "error handling",
    }
  );
});
