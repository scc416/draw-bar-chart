# Draw Bar Chart

A library that draw bar chart. The library has one function, this function can handle bar chart with single or stacked values, positive and/or negative values.  
Some optional options include `tickInterval`, `barColour`, `barSpacing`, `showLegend`, `scientificNotation` and `animationEffect`.

## Table of Content

- [Final Product](#final-product)
- [Dependencies](#dependencies)
- [Getting Started](#getting-started)
- [File Structure](#file-structure)

## Final Product

All the examples below are in demo（in the `./demo` folder).

### Single Bar Chart

### Single Bar Chart with all values below 1

### Bar Chart with negative Values

### Single Bar Chart with positive and negative values

### Stacked Bar Chart

### Calculated interval

### Scientific Notation

### Animation Effect

## Dependencies

- [jQuery](https://jquery.com/): library to select and manipulate elements

## Getting Started

Include jQuery in the html file.

`<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>`

Put `draw-bar-chart.js` and `draw-bar-chart.css` into your project folder. Include them in your `html` file.

`<script src="path_to_file/draw-bar-chart.js"></script>`  
`<link href="path_to_file/draw-bar-chart.css" rel="stylesheet" type="text/css" />`

"Draw Bar Chart" depends on jQuery, so jQuery has to come before `draw-bar-chart.js`.

You can also try the demo in `./demo` folder.

## Documentation

The library has only one function, `drawBarChart(selector, data, options)`.

### selector

- Type: [Selector](https://api.jquery.com/category/selectors/)  
  A string representing a selector expression to find an element for the bar chart to rendered in.

### data

- Type: [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

A set of key/value pairs that contains the values and labels of the bar chart

#### **values**

- Type:
  - For single bar chart: [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) of [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  - For stacked bar chart: [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) of [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) of [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

#### **labels**

- Type: [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) of [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

#### **stackLabels** (Only for stacked bar chart)

- Type: [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) of [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

Labels for legend of stacked bar chart. This doesn't need to be defined if `showLegend` is set to false (see `showLegend` in options).

### options

- Type: [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

A set of key/value pairs that configure the bar chart. Most of the options are optional.

#### **Id**

- Type: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

This is crucial, especially when there are multiple bar charts, so the function can get the width of y-axis (of the correct graph) to set the position of the x-axis.  
Id has to be unique.

#### **tickInterval** (optional)

- Type: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

- Default: based on the value of the maximum and minimun data values

#### **width** (optional)

- Type: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) (any values that is supported by CSS property: width)

- Dafault: `"90vw"`

#### **height** (optional)

- Type: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) (any values that is supported by CSS property: height)

- Dafault: `"90vh"`

#### **chartTitle** (optional)

- Type: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

- Default: `""`

#### **titleFontSize** (optional)

- Type: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) (any values that is supported by CSS property: font-size)

- Default: `"2em"`

#### **titleColour** (optional)

- Type: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) (any values that is supported by CSS property: color)

- Default: `"black"`

#### **yAxisTitle** (optional)

- Type: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

- Dafault: `""` (empty string)

#### **yAxisTitleFontSize** (optional)

- Type: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) (any values that is supported by CSS property: font-size)

- Default: "1.5em"

#### **yAxisLabelFontSize** (optional)

- Type: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) (any values that is supported by CSS property: font-size)

#### **xAxisTitle** (optional)

- Type: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

- Dafault: `""` (empty string)

#### **xAxisTitleFontSize** (optional)

- Type: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) (any values that is supported by CSS property: font-size)

- Default: "1.5em"

#### **xAxisLabelFontSize** (optional)

- Type: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) (any values that is supported by CSS property: font-size)

- Default: "1.2em"

#### **dataLabelPosition** (optional)

- Type: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) - "top", "centre" or "bottom"

- Default: "top"

This option indicates the position of the data (value) label on the bar.

#### **dataLabelColour** (optional)

- Type: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) (any values that is supported by CSS property: color)

- Default: "white"

#### **dataLabelFontSize**

- Type: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) (any values that is supported by CSS property: font-size)

- Default: "1em"

#### **barColour** (optional)

- Type:

  - For single bar chart: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) (any values that is supported by CSS property: font-size)
  - For stacked bar chart: [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) of [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) (all strings have to be supported by CSS property: color). If the number of colour is less than number of values, the colour array would be repeated. If one of the colour string is not supported by CSS, it will be replaced by one of the colour in `DEFAULT_CSS_COLOR` (defined in `draw-bar-chart.js`)

- Default:
  - For single bar chart: first value of `DEFAULT_CSS_COLOR` (defined in `draw-bar-chart.js`), which is currently `"SkyBlue"`
  - For Stack bar chart: strings in `DEFAULT_CSS_COLOR` (defined in `draw-bar-chart.js`). If there are more values than the number of colour string in `DEFAULT_CSS_COLOR`, then the colour will be repeated

#### **barSpacing** (optional)

- Type: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) (any values that is supported by CSS property: margin)

- Default: `"1em"`

#### **showLegend** (optional, only for stacked bar chart)

- Type: [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

- Default: `true`

#### **userSelect** (optional)

- Type: [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

- Default: `false`

If the text & value on the graph can be selected (i.e. highlighed) by users.

#### **scientificNotation** (optional)

- Type: [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

- Default: `false`

If the values are displayed as [scientific notation](https://en.wikipedia.org/wiki/Scientific_notation).

#### **animationEffect** (optional)

- Type: [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

- Default: `true`

See [Final Product](#final-product) for the animation effect.

### Credits

- All the statistics in the demo come from [World Bank](https://www.worldbank.org/en/home)