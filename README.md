# Draw Bar Chart

A library that draw bar chart. The library has one function, this function can handle bar chart with single or stacked values, positive and/or negative values.

## Table of Content

- [Final Product](#final-product)
- [Dependencies](#dependencies)
- [Getting Started](#getting-started)
- [File Structure](#file-structure)

## Final Product

### Stacked bar graph

### Animation

### Hover

## Dependencies

- [jQuery](https://jquery.com/): library to select and manipulate elements

## Getting Started

Include jQuery in the html file.

`<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>`

Include the css and javascript file of "Draw Bar Chart".

`<script src="path_to_file/draw-bar-chart.js"></script>`  
`<link href="path_to_file/draw-bar-chart.css" rel="stylesheet" type="text/css" />`

"Draw Bar Chart" depends on jQuery, so jQuery has to come before the javascript file of Fraw Bar Chart.

You can try the demo in `./demo` folder. It consists of a stacked bar chart and a clustered bar chart.

## Documentation

The library has only one function, `drawBarChart(selector, data, options)`.

### selector

Type: [Selector](https://api.jquery.com/category/selectors/)  
A string representing a selector expression to find an element for the bar chart to rendered in.

### data

Type: [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

A set of key/value pairs that contains the values and labels of the bar chart

#### **values**

Type: [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) of [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) (for single bar chart) or;
[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) of [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) of [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) (for stacked bar chart)

#### **labels**

Type: [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) of [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

### options

Type: [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

A set of key/value pairs that configure the bar chart. Most of the options are optional.

####

// Id is crucial especially when there are multiple bar chart (so the function render to the correct bar chart)
// it has to be unique
id: 1,
chartTitle: "this is the title", //optional (default: "Untitled")
// titleFontSize: "36px", //optional  (default: "2em")
titleColour: "red", //optional  (default: "black")
// width: "90vw", //optional
// height: "90vh", //optional
yAxisTitle: "title of y-axis", //optional
// yAxisTitleFontSize: "24px", //optional (default: "1.5em")
// yAxisLabelFontSize: "16px", //optional (default: "1.2em")
xAxisTitle: "title of x-axis", //optional
// xAxisTitleFontSize: "24px", //optional (default: "1.5em")
// xAxisLabelFontSize: "16px", //optional (default: "1.2em")
// dataLabelPosition: "bottom", // option: "top", "centre", "bottom" (of the bar) (default: "top")
// dataLabelColour: "white", //optional (default: "white")
// dataLabelFontSize: "16px", //optional (default: "1em")
// optional for bar chart that is not stacked (exptect type: string)(default: "black")
// compulsory for stacked bar (expected type: array of string)
barColour: "green",
barSpacing: "20px", // optional (default value is calculated based on the number of data)
userSelect: true, // optiontal, if the text & valu on the graph can be selected (i.e. highlighed) (default: false)
// tickInterval: 0.005, //optional (default value is calculated based on the value of the max. and min. data)
scientificNotation: true, // optional, to show the label in scientific notation
animationEffect: false, // optional (default: true)
hoverEffect: false, // optional (default: true)
}

id: 2,
chartTitle: "this is the title", //optional (default: "Untitled")
titleFontSize: "36px", //optional  (default: "36px")
titleColour: "black", //optional  (default: "black")
// width: "50vw", //optional
// height: "90vh", //optional
yAxisTitle: "title of y-axis", //optional
yAxisTitleFontSize: "24px", //optional  (default: "24px")
yAxisLabelFontSize: "16px", //optional  (default: "16px")
xAxisTitle: "title of x-axis", //optional
xAxisTitleFontSize: "24px", //optional  (default: "24px")
xAxisLabelFontSize: "16px", //optional  (default: "16px")
dataLabelPosition: "centre", // option: "top", "centre", "bottom" (of the bar) (default: "top")
dataLabelColour: "green", //optional  (default: "white")
dataLabelFontSize: "16px", //optional  (default: "16px")
// optional for bar chart that is not stacked (exptect type: string)(default: "black")
// compulsory for stacked bar (expected type: array of string)
// barColour: ["blue", "black"],
barSpacing: "10px", // optional (default value is calculated based on the number of data)
userSelect: "", // optiontal, if the text & valu on the graph can be selected (i.e. highlighed) (default: false)
tickInterval: 50, //optional (default value is calculated based on the value of the max. and min. data)
scientificNotation: false, // optional, to show the label in scientific notation